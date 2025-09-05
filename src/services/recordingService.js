// Recording service for audio/video capture and IPFS storage
import { pinataService } from './pinataService.js'
import { IncidentRecord } from '../data/models.js'
import { RECORDING_STATES } from '../config/constants.js'

class RecordingService {
  constructor() {
    this.mediaRecorder = null
    this.recordedChunks = []
    this.stream = null
    this.recordingState = RECORDING_STATES.IDLE
    this.startTime = null
    this.recordingType = 'audio' // 'audio' or 'video'
    this.onStateChange = null
    this.onDataAvailable = null
  }

  /**
   * Check if recording is supported in the browser
   * @returns {boolean} Recording support status
   */
  isSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder)
  }

  /**
   * Request media permissions
   * @param {Object} options - Recording options
   * @returns {Promise<boolean>} Permission granted status
   */
  async requestPermissions(options = {}) {
    if (!this.isSupported()) {
      throw new Error('Recording not supported in this browser')
    }

    try {
      const constraints = {
        audio: true,
        video: options.video || false
      }

      this.stream = await navigator.mediaDevices.getUserMedia(constraints)
      this.recordingType = options.video ? 'video' : 'audio'
      return true
    } catch (error) {
      console.error('Error requesting media permissions:', error)
      throw new Error('Media permissions denied. Please allow microphone access.')
    }
  }

  /**
   * Start recording
   * @param {Object} options - Recording options
   * @returns {Promise<void>}
   */
  async startRecording(options = {}) {
    if (this.recordingState !== RECORDING_STATES.IDLE) {
      throw new Error('Recording already in progress')
    }

    try {
      if (!this.stream) {
        await this.requestPermissions(options)
      }

      this.recordedChunks = []
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: this.getSupportedMimeType()
      })

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data)
          if (this.onDataAvailable) {
            this.onDataAvailable(event.data)
          }
        }
      }

      this.mediaRecorder.onstop = () => {
        this.setState(RECORDING_STATES.COMPLETED)
      }

      this.mediaRecorder.onerror = (error) => {
        console.error('MediaRecorder error:', error)
        this.setState(RECORDING_STATES.ERROR)
      }

      this.startTime = Date.now()
      this.mediaRecorder.start(1000) // Collect data every second
      this.setState(RECORDING_STATES.RECORDING)
    } catch (error) {
      console.error('Error starting recording:', error)
      this.setState(RECORDING_STATES.ERROR)
      throw new Error('Failed to start recording. Please try again.')
    }
  }

  /**
   * Stop recording
   * @returns {Promise<Blob>} Recorded media blob
   */
  async stopRecording() {
    if (this.recordingState !== RECORDING_STATES.RECORDING) {
      throw new Error('No recording in progress')
    }

    return new Promise((resolve, reject) => {
      this.mediaRecorder.onstop = () => {
        try {
          const blob = new Blob(this.recordedChunks, {
            type: this.getSupportedMimeType()
          })
          this.setState(RECORDING_STATES.COMPLETED)
          resolve(blob)
        } catch (error) {
          this.setState(RECORDING_STATES.ERROR)
          reject(error)
        }
      }

      this.mediaRecorder.stop()
    })
  }

  /**
   * Pause recording
   */
  pauseRecording() {
    if (this.mediaRecorder && this.recordingState === RECORDING_STATES.RECORDING) {
      this.mediaRecorder.pause()
    }
  }

  /**
   * Resume recording
   */
  resumeRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume()
    }
  }

  /**
   * Get recording duration in seconds
   * @returns {number} Duration in seconds
   */
  getDuration() {
    if (!this.startTime) return 0
    return Math.floor((Date.now() - this.startTime) / 1000)
  }

  /**
   * Save recording to IPFS and create incident record
   * @param {Blob} recordingBlob - The recorded media blob
   * @param {Object} metadata - Additional metadata
   * @returns {Promise<IncidentRecord>} Created incident record
   */
  async saveRecording(recordingBlob, metadata = {}) {
    this.setState(RECORDING_STATES.PROCESSING)

    try {
      // Create file name with timestamp
      const timestamp = new Date().toISOString()
      const extension = this.recordingType === 'video' ? 'webm' : 'webm'
      const fileName = `incident-${Date.now()}.${extension}`

      // Upload to IPFS via Pinata
      let ipfsResult = null
      if (pinataService.isAvailable()) {
        try {
          const file = new File([recordingBlob], fileName, {
            type: recordingBlob.type
          })

          ipfsResult = await pinataService.uploadFile(file, {
            name: fileName,
            type: 'incident-recording',
            timestamp: timestamp,
            userId: metadata.userId,
            customData: {
              recordingType: this.recordingType,
              duration: this.getDuration(),
              location: metadata.location
            }
          })
        } catch (error) {
          console.warn('IPFS upload failed, storing locally:', error)
        }
      }

      // Create local URL for immediate access
      const localUrl = URL.createObjectURL(recordingBlob)

      // Create incident record
      const incidentRecord = new IncidentRecord({
        userId: metadata.userId || 'anonymous',
        timestamp: timestamp,
        eventType: metadata.eventType || 'general',
        mediaUrl: localUrl,
        ipfsHash: ipfsResult?.ipfsHash || null,
        notes: metadata.notes || '',
        location: metadata.location || null,
        duration: this.getDuration(),
        metadata: {
          recordingType: this.recordingType,
          fileSize: recordingBlob.size,
          mimeType: recordingBlob.type,
          ipfsGatewayUrl: ipfsResult?.gatewayUrl || null
        }
      })

      this.setState(RECORDING_STATES.COMPLETED)
      return incidentRecord
    } catch (error) {
      console.error('Error saving recording:', error)
      this.setState(RECORDING_STATES.ERROR)
      throw new Error('Failed to save recording. Please try again.')
    }
  }

  /**
   * Get current location if available
   * @returns {Promise<Object|null>} Location coordinates
   */
  async getCurrentLocation() {
    if (!navigator.geolocation) {
      return null
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          })
        },
        (error) => {
          console.warn('Location access denied:', error)
          resolve(null)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      )
    })
  }

  /**
   * Stop all media streams
   */
  cleanup() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop())
      this.stream = null
    }

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop()
    }

    this.mediaRecorder = null
    this.recordedChunks = []
    this.setState(RECORDING_STATES.IDLE)
  }

  /**
   * Get supported MIME type for recording
   * @returns {string} MIME type
   */
  getSupportedMimeType() {
    const types = [
      'video/webm;codecs=vp9',
      'video/webm;codecs=vp8',
      'video/webm',
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/mpeg'
    ]

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type
      }
    }

    return 'audio/webm' // Fallback
  }

  /**
   * Set recording state and notify listeners
   * @param {string} state - New state
   */
  setState(state) {
    this.recordingState = state
    if (this.onStateChange) {
      this.onStateChange(state)
    }
  }

  /**
   * Get current recording state
   * @returns {string} Current state
   */
  getState() {
    return this.recordingState
  }

  /**
   * Set state change callback
   * @param {Function} callback - State change callback
   */
  setStateChangeCallback(callback) {
    this.onStateChange = callback
  }

  /**
   * Set data available callback
   * @param {Function} callback - Data available callback
   */
  setDataAvailableCallback(callback) {
    this.onDataAvailable = callback
  }

  /**
   * Check if currently recording
   * @returns {boolean} Recording status
   */
  isRecording() {
    return this.recordingState === RECORDING_STATES.RECORDING
  }

  /**
   * Get recording statistics
   * @returns {Object} Recording stats
   */
  getStats() {
    return {
      state: this.recordingState,
      duration: this.getDuration(),
      type: this.recordingType,
      chunksCount: this.recordedChunks.length,
      hasStream: !!this.stream
    }
  }
}

// Export singleton instance
export const recordingService = new RecordingService()
export default recordingService
