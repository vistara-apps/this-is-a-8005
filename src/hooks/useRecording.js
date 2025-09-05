// Custom hook for recording functionality
import { useState, useEffect, useCallback } from 'react'
import { recordingService } from '../services/recordingService.js'
import { RECORDING_STATES } from '../config/constants.js'

export function useRecording() {
  const [recordingState, setRecordingState] = useState(RECORDING_STATES.IDLE)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState(null)
  const [isSupported, setIsSupported] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)

  // Update duration every second while recording
  useEffect(() => {
    let interval = null
    
    if (recordingState === RECORDING_STATES.RECORDING) {
      interval = setInterval(() => {
        setDuration(recordingService.getDuration())
      }, 1000)
    } else {
      setDuration(recordingService.getDuration())
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [recordingState])

  // Set up recording service callbacks
  useEffect(() => {
    recordingService.setStateChangeCallback((state) => {
      setRecordingState(state)
      if (state === RECORDING_STATES.ERROR) {
        setError('Recording error occurred')
      } else {
        setError(null)
      }
    })

    // Check if recording is supported
    setIsSupported(recordingService.isSupported())

    return () => {
      recordingService.setStateChangeCallback(null)
    }
  }, [])

  /**
   * Request recording permissions
   */
  const requestPermissions = useCallback(async (options = {}) => {
    try {
      setError(null)
      const granted = await recordingService.requestPermissions(options)
      setHasPermission(granted)
      return granted
    } catch (error) {
      setError(error.message)
      setHasPermission(false)
      return false
    }
  }, [])

  /**
   * Start recording
   */
  const startRecording = useCallback(async (options = {}) => {
    try {
      setError(null)
      await recordingService.startRecording(options)
    } catch (error) {
      setError(error.message)
      throw error
    }
  }, [])

  /**
   * Stop recording and return the blob
   */
  const stopRecording = useCallback(async () => {
    try {
      setError(null)
      const blob = await recordingService.stopRecording()
      return blob
    } catch (error) {
      setError(error.message)
      throw error
    }
  }, [])

  /**
   * Save recording with metadata
   */
  const saveRecording = useCallback(async (blob, metadata = {}) => {
    try {
      setError(null)
      const incidentRecord = await recordingService.saveRecording(blob, metadata)
      return incidentRecord
    } catch (error) {
      setError(error.message)
      throw error
    }
  }, [])

  /**
   * Get current location
   */
  const getCurrentLocation = useCallback(async () => {
    try {
      const location = await recordingService.getCurrentLocation()
      return location
    } catch (error) {
      console.warn('Failed to get location:', error)
      return null
    }
  }, [])

  /**
   * Cleanup recording resources
   */
  const cleanup = useCallback(() => {
    recordingService.cleanup()
    setRecordingState(RECORDING_STATES.IDLE)
    setDuration(0)
    setError(null)
    setHasPermission(false)
  }, [])

  /**
   * Toggle recording (start/stop)
   */
  const toggleRecording = useCallback(async (options = {}) => {
    if (recordingState === RECORDING_STATES.RECORDING) {
      return await stopRecording()
    } else {
      await startRecording(options)
      return null
    }
  }, [recordingState, startRecording, stopRecording])

  /**
   * Format duration as MM:SS
   */
  const formatDuration = useCallback((seconds = duration) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [duration])

  return {
    // State
    recordingState,
    duration,
    error,
    isSupported,
    hasPermission,
    
    // Computed
    isRecording: recordingState === RECORDING_STATES.RECORDING,
    isProcessing: recordingState === RECORDING_STATES.PROCESSING,
    isCompleted: recordingState === RECORDING_STATES.COMPLETED,
    isIdle: recordingState === RECORDING_STATES.IDLE,
    formattedDuration: formatDuration(),
    
    // Actions
    requestPermissions,
    startRecording,
    stopRecording,
    saveRecording,
    toggleRecording,
    getCurrentLocation,
    cleanup,
    formatDuration
  }
}
