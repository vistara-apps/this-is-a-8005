import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../data/models.js'
import { useUserStorage, useIncidentStorage, useSettingsStorage } from '../hooks/useLocalStorage.js'
import { useRecording } from '../hooks/useRecording.js'
import { stripeService } from '../services/stripeService.js'
import { generateIncidentCard } from '../utils/incidentCardGenerator.js'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  // Local storage hooks
  const { user, updateUser, clearUser, isLoggedIn } = useUserStorage()
  const { incidents, addIncident, updateIncident, removeIncident, getIncident, clearIncidents } = useIncidentStorage()
  const { settings, updateSetting, updateSettings, addEmergencyContact, removeEmergencyContact } = useSettingsStorage()
  
  // Recording hook
  const recording = useRecording()
  
  // App state
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Initialize user if not exists
  useEffect(() => {
    if (!user.userId) {
      const newUser = new User({
        email: '',
        subscriptionStatus: 'free',
        preferredLanguage: 'english',
        state: ''
      })
      updateUser(newUser.toJSON())
    }
  }, [user.userId, updateUser])

  /**
   * Update user profile
   */
  const updateUserProfile = async (updates) => {
    try {
      setError(null)
      updateUser(updates)
    } catch (error) {
      setError('Failed to update profile')
      console.error('Profile update error:', error)
    }
  }

  /**
   * Upgrade subscription
   */
  const upgradeSubscription = async (options = {}) => {
    try {
      setIsLoading(true)
      setError(null)

      if (!stripeService.isAvailable()) {
        // Demo mode - just update locally
        updateUser({ subscriptionStatus: 'premium' })
        alert('Subscription upgraded! (Demo mode)')
        return { success: true, demo: true }
      }

      const checkoutSession = await stripeService.createSubscriptionCheckout({
        customerEmail: user.email,
        userId: user.userId,
        ...options
      })

      if (checkoutSession.success) {
        // In demo mode, just update the user
        updateUser({ subscriptionStatus: 'premium' })
        return checkoutSession
      }

      throw new Error('Failed to create checkout session')
    } catch (error) {
      setError('Failed to upgrade subscription')
      console.error('Subscription upgrade error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Cancel subscription
   */
  const cancelSubscription = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // In demo mode, just update locally
      updateUser({ subscriptionStatus: 'free' })
      alert('Subscription canceled (Demo mode)')
      
      return { success: true, demo: true }
    } catch (error) {
      setError('Failed to cancel subscription')
      console.error('Subscription cancellation error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Save a completed recording
   */
  const saveRecording = async (recordingBlob, metadata = {}) => {
    try {
      setIsLoading(true)
      setError(null)

      // Get current location if enabled
      let location = null
      if (settings.autoLocation) {
        location = await recording.getCurrentLocation()
      }

      // Save recording using the recording service
      const incidentRecord = await recording.saveRecording(recordingBlob, {
        userId: user.userId,
        location: location,
        ...metadata
      })

      // Add to local storage
      addIncident(incidentRecord.toJSON())

      // Generate incident card if needed
      if (metadata.generateCard) {
        const incidentCard = await generateIncidentCard(
          incidentRecord, 
          user.state, 
          settings.emergencyContacts
        )
        
        // Update incident with card data
        updateIncident(incidentRecord.recordId, {
          incidentCard: incidentCard.toJSON()
        })
      }

      return incidentRecord
    } catch (error) {
      setError('Failed to save recording')
      console.error('Recording save error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Delete an incident record
   */
  const deleteIncident = async (recordId) => {
    try {
      setError(null)
      removeIncident(recordId)
    } catch (error) {
      setError('Failed to delete incident')
      console.error('Incident deletion error:', error)
      throw error
    }
  }

  /**
   * Clear all user data
   */
  const clearAllData = () => {
    clearUser()
    clearIncidents()
    recording.cleanup()
  }

  /**
   * Check if user has premium features
   */
  const hasPremium = () => {
    return user.subscriptionStatus === 'premium'
  }

  /**
   * Get user's incident count
   */
  const getIncidentCount = () => {
    return incidents.length
  }

  const value = {
    // User data
    user,
    updateUser: updateUserProfile,
    clearUser,
    isLoggedIn,
    hasPremium: hasPremium(),

    // Subscription
    upgradeSubscription,
    cancelSubscription,

    // Incidents
    incidents,
    addIncident,
    updateIncident,
    removeIncident,
    getIncident,
    deleteIncident,
    saveRecording,
    getIncidentCount: getIncidentCount(),

    // Settings
    settings,
    updateSetting,
    updateSettings,
    addEmergencyContact,
    removeEmergencyContact,

    // Recording
    recording,

    // App state
    isLoading,
    error,
    setError,
    clearAllData
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
