import React, { useState, useEffect } from 'react'
import { AppProvider } from './contexts/AppContext'
import AppShell from './components/AppShell'
import HomePage from './pages/HomePage'
import RightsGuidePage from './pages/RightsGuidePage'
import ScriptLibraryPage from './pages/ScriptLibraryPage'
import RecordingPage from './pages/RecordingPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [selectedState, setSelectedState] = useState('')

  return (
    <AppProvider>
      <div className="min-h-screen gradient-bg">
        <AppShell currentView={currentView} onNavigate={setCurrentView}>
          {currentView === 'home' && (
            <HomePage 
              onNavigate={setCurrentView}
              selectedState={selectedState}
              onStateSelect={setSelectedState}
            />
          )}
          {currentView === 'rights' && (
            <RightsGuidePage 
              state={selectedState}
              onNavigate={setCurrentView}
            />
          )}
          {currentView === 'scripts' && (
            <ScriptLibraryPage onNavigate={setCurrentView} />
          )}
          {currentView === 'record' && (
            <RecordingPage onNavigate={setCurrentView} />
          )}
          {currentView === 'profile' && (
            <ProfilePage onNavigate={setCurrentView} />
          )}
        </AppShell>
      </div>
    </AppProvider>
  )
}

export default App