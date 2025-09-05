// Pinata service for IPFS storage of incident recordings
import axios from 'axios'
import { API_KEYS } from '../config/constants.js'

class PinataService {
  constructor() {
    this.apiKey = API_KEYS.pinata.apiKey
    this.secretKey = API_KEYS.pinata.secretKey
    this.baseURL = 'https://api.pinata.cloud'
    
    if (!this.apiKey || !this.secretKey) {
      console.warn('Pinata API keys not found. IPFS storage will be disabled.')
      this.isConfigured = false
      return
    }

    this.isConfigured = true
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'pinata_api_key': this.apiKey,
        'pinata_secret_api_key': this.secretKey
      }
    })
  }

  /**
   * Upload a file to IPFS via Pinata
   * @param {File|Blob} file - The file to upload
   * @param {Object} metadata - Additional metadata for the file
   * @returns {Promise<Object>} Upload result with IPFS hash
   */
  async uploadFile(file, metadata = {}) {
    if (!this.isConfigured) {
      throw new Error('Pinata service not configured. Please check API keys.')
    }

    try {
      const formData = new FormData()
      formData.append('file', file)

      // Add metadata
      const pinataMetadata = {
        name: metadata.name || `incident-${Date.now()}`,
        keyvalues: {
          type: metadata.type || 'incident-recording',
          timestamp: metadata.timestamp || new Date().toISOString(),
          userId: metadata.userId || 'anonymous',
          ...metadata.customData
        }
      }

      formData.append('pinataMetadata', JSON.stringify(pinataMetadata))

      // Add options
      const pinataOptions = {
        cidVersion: 1,
        wrapWithDirectory: false
      }

      formData.append('pinataOptions', JSON.stringify(pinataOptions))

      const response = await this.client.post('/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 60000 // 60 second timeout for large files
      })

      return {
        success: true,
        ipfsHash: response.data.IpfsHash,
        pinSize: response.data.PinSize,
        timestamp: response.data.Timestamp,
        gatewayUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
      }
    } catch (error) {
      console.error('Error uploading to IPFS:', error)
      throw new Error('Failed to upload file to IPFS. Please try again.')
    }
  }

  /**
   * Upload JSON data to IPFS
   * @param {Object} data - JSON data to upload
   * @param {Object} metadata - Additional metadata
   * @returns {Promise<Object>} Upload result with IPFS hash
   */
  async uploadJSON(data, metadata = {}) {
    if (!this.isConfigured) {
      throw new Error('Pinata service not configured.')
    }

    try {
      const pinataMetadata = {
        name: metadata.name || `incident-data-${Date.now()}`,
        keyvalues: {
          type: metadata.type || 'incident-data',
          timestamp: metadata.timestamp || new Date().toISOString(),
          userId: metadata.userId || 'anonymous',
          ...metadata.customData
        }
      }

      const pinataOptions = {
        cidVersion: 1
      }

      const requestBody = {
        pinataContent: data,
        pinataMetadata,
        pinataOptions
      }

      const response = await this.client.post('/pinning/pinJSONToIPFS', requestBody)

      return {
        success: true,
        ipfsHash: response.data.IpfsHash,
        pinSize: response.data.PinSize,
        timestamp: response.data.Timestamp,
        gatewayUrl: `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
      }
    } catch (error) {
      console.error('Error uploading JSON to IPFS:', error)
      throw new Error('Failed to upload data to IPFS. Please try again.')
    }
  }

  /**
   * Get file from IPFS
   * @param {string} ipfsHash - The IPFS hash of the file
   * @returns {Promise<string>} Gateway URL for the file
   */
  async getFile(ipfsHash) {
    if (!ipfsHash) {
      throw new Error('IPFS hash is required')
    }

    return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
  }

  /**
   * Get metadata for a pinned file
   * @param {string} ipfsHash - The IPFS hash
   * @returns {Promise<Object>} File metadata
   */
  async getFileMetadata(ipfsHash) {
    if (!this.isConfigured) {
      throw new Error('Pinata service not configured.')
    }

    try {
      const response = await this.client.get(`/data/pinList?hashContains=${ipfsHash}`)
      
      if (response.data.rows.length === 0) {
        throw new Error('File not found')
      }

      return response.data.rows[0]
    } catch (error) {
      console.error('Error getting file metadata:', error)
      throw new Error('Failed to retrieve file metadata.')
    }
  }

  /**
   * Unpin a file from IPFS (remove from Pinata)
   * @param {string} ipfsHash - The IPFS hash to unpin
   * @returns {Promise<boolean>} Success status
   */
  async unpinFile(ipfsHash) {
    if (!this.isConfigured) {
      throw new Error('Pinata service not configured.')
    }

    try {
      await this.client.delete(`/pinning/unpin/${ipfsHash}`)
      return true
    } catch (error) {
      console.error('Error unpinning file:', error)
      throw new Error('Failed to unpin file from IPFS.')
    }
  }

  /**
   * Test the Pinata connection
   * @returns {Promise<boolean>} Connection status
   */
  async testConnection() {
    if (!this.isConfigured) {
      return false
    }

    try {
      const response = await this.client.get('/data/testAuthentication')
      return response.data.message === 'Congratulations! You are communicating with the Pinata API!'
    } catch (error) {
      console.error('Pinata connection test failed:', error)
      return false
    }
  }

  /**
   * Get account usage information
   * @returns {Promise<Object>} Usage statistics
   */
  async getUsage() {
    if (!this.isConfigured) {
      throw new Error('Pinata service not configured.')
    }

    try {
      const response = await this.client.get('/data/userPinnedDataTotal')
      return {
        pinCount: response.data.pin_count,
        pinSizeTotal: response.data.pin_size_total,
        pinSizeWithReplicationsTotal: response.data.pin_size_with_replications_total
      }
    } catch (error) {
      console.error('Error getting usage data:', error)
      throw new Error('Failed to retrieve usage information.')
    }
  }

  /**
   * Check if service is available
   * @returns {boolean} Service availability
   */
  isAvailable() {
    return this.isConfigured
  }
}

// Export singleton instance
export const pinataService = new PinataService()
export default pinataService
