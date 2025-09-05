import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    subscriptionStatus: 'free', // 'free', 'premium'
    preferredLanguage: 'english',
    state: ''
  })

  const [isRecording, setIsRecording] = useState(false)
  const [recordings, setRecordings] = useState([])

  const startRecording = () => {
    setIsRecording(true)
    // In a real app, this would start actual recording
    console.log('Recording started...')
  }

  const stopRecording = () => {
    setIsRecording(false)
    const newRecording = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      duration: '0:30',
      location: 'Current Location',
      notes: ''
    }
    setRecordings(prev => [newRecording, ...prev])
    console.log('Recording stopped and saved')
  }

  const upgradeSubscription = () => {
    setUser(prev => ({ ...prev, subscriptionStatus: 'premium' }))
    alert('Subscription upgraded! (Demo)')
  }

  const value = {
    user,
    setUser,
    isRecording,
    recordings,
    startRecording,
    stopRecording,
    upgradeSubscription
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}