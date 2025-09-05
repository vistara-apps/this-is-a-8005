// Custom hook for local storage management
import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for managing localStorage with React state
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Initial value if key doesn't exist
 * @returns {[value, setValue, removeValue]} - State value, setter, and remover
 */
export function useLocalStorage(key, initialValue) {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Update localStorage when state changes
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      // Save to localStorage
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

/**
 * Hook for managing user data in localStorage
 */
export function useUserStorage() {
  const [userData, setUserData, removeUserData] = useLocalStorage('kyrb_user', {
    userId: null,
    email: '',
    subscriptionStatus: 'free',
    state: '',
    preferredLanguage: 'english',
    createdAt: null,
    updatedAt: null
  })

  const updateUser = useCallback((updates) => {
    setUserData(prevUser => ({
      ...prevUser,
      ...updates,
      updatedAt: new Date().toISOString()
    }))
  }, [setUserData])

  const clearUser = useCallback(() => {
    removeUserData()
  }, [removeUserData])

  return {
    user: userData,
    updateUser,
    clearUser,
    isLoggedIn: !!userData.userId
  }
}

/**
 * Hook for managing incident records in localStorage
 */
export function useIncidentStorage() {
  const [incidents, setIncidents, removeIncidents] = useLocalStorage('kyrb_incidents', [])

  const addIncident = useCallback((incident) => {
    setIncidents(prevIncidents => [incident, ...prevIncidents])
  }, [setIncidents])

  const updateIncident = useCallback((recordId, updates) => {
    setIncidents(prevIncidents => 
      prevIncidents.map(incident => 
        incident.recordId === recordId 
          ? { ...incident, ...updates }
          : incident
      )
    )
  }, [setIncidents])

  const removeIncident = useCallback((recordId) => {
    setIncidents(prevIncidents => 
      prevIncidents.filter(incident => incident.recordId !== recordId)
    )
  }, [setIncidents])

  const getIncident = useCallback((recordId) => {
    return incidents.find(incident => incident.recordId === recordId)
  }, [incidents])

  const clearIncidents = useCallback(() => {
    removeIncidents()
  }, [removeIncidents])

  return {
    incidents,
    addIncident,
    updateIncident,
    removeIncident,
    getIncident,
    clearIncidents,
    incidentCount: incidents.length
  }
}

/**
 * Hook for managing app settings in localStorage
 */
export function useSettingsStorage() {
  const [settings, setSettings, removeSettings] = useLocalStorage('kyrb_settings', {
    theme: 'light',
    notifications: true,
    autoLocation: false,
    autoBackup: true,
    emergencyContacts: [],
    customScripts: [],
    lastBackup: null
  })

  const updateSetting = useCallback((key, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: value
    }))
  }, [setSettings])

  const updateSettings = useCallback((updates) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...updates
    }))
  }, [setSettings])

  const resetSettings = useCallback(() => {
    removeSettings()
  }, [removeSettings])

  const addEmergencyContact = useCallback((contact) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      emergencyContacts: [...prevSettings.emergencyContacts, contact]
    }))
  }, [setSettings])

  const removeEmergencyContact = useCallback((contactId) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      emergencyContacts: prevSettings.emergencyContacts.filter(
        contact => contact.id !== contactId
      )
    }))
  }, [setSettings])

  const addCustomScript = useCallback((script) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      customScripts: [...prevSettings.customScripts, script]
    }))
  }, [setSettings])

  const removeCustomScript = useCallback((scriptId) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      customScripts: prevSettings.customScripts.filter(
        script => script.id !== scriptId
      )
    }))
  }, [setSettings])

  return {
    settings,
    updateSetting,
    updateSettings,
    resetSettings,
    addEmergencyContact,
    removeEmergencyContact,
    addCustomScript,
    removeCustomScript
  }
}

/**
 * Hook for managing cached data with expiration
 */
export function useCachedStorage(key, expirationMinutes = 60) {
  const [cachedData, setCachedData, removeCachedData] = useLocalStorage(key, null)

  const isExpired = useCallback(() => {
    if (!cachedData || !cachedData.timestamp) {
      return true
    }
    
    const now = Date.now()
    const expirationTime = cachedData.timestamp + (expirationMinutes * 60 * 1000)
    return now > expirationTime
  }, [cachedData, expirationMinutes])

  const setCache = useCallback((data) => {
    setCachedData({
      data,
      timestamp: Date.now()
    })
  }, [setCachedData])

  const getCache = useCallback(() => {
    if (isExpired()) {
      removeCachedData()
      return null
    }
    return cachedData?.data || null
  }, [cachedData, isExpired, removeCachedData])

  const clearCache = useCallback(() => {
    removeCachedData()
  }, [removeCachedData])

  return {
    setCache,
    getCache,
    clearCache,
    isExpired: isExpired(),
    hasCache: !!cachedData && !isExpired()
  }
}
