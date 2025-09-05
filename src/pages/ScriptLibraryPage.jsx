import React, { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import ScriptPhrase from '../components/ScriptPhrase'
import CalloutCard from '../components/CalloutCard'
import { ArrowLeft, Globe, Crown } from 'lucide-react'

const ScriptLibraryPage = ({ onNavigate }) => {
  const { user } = useApp()
  const [selectedLanguage, setSelectedLanguage] = useState(user.preferredLanguage)
  const [selectedScenario, setSelectedScenario] = useState('traffic-stop')

  const scenarios = [
    { id: 'traffic-stop', name: 'Traffic Stop' },
    { id: 'questioned', name: 'Questioned on Street' },
    { id: 'search-request', name: 'Search Request' },
    { id: 'arrest', name: 'Being Arrested' },
    { id: 'recording', name: 'Recording Police' }
  ]

  const scripts = {
    'traffic-stop': {
      english: [
        "Good [morning/afternoon/evening], officer.",
        "I am exercising my right to remain silent.",
        "I do not consent to any searches of my person or vehicle.",
        "Am I free to leave?",
        "I would like to speak with an attorney."
      ],
      spanish: [
        "Buenos [días/tardes/noches], oficial.",
        "Estoy ejerciendo mi derecho a permanecer en silencio.",
        "No consiento a ningún registro de mi persona o vehículo.",
        "¿Soy libre de irme?",
        "Me gustaría hablar con un abogado."
      ]
    },
    'questioned': {
      english: [
        "I am exercising my right to remain silent.",
        "Am I being detained or am I free to go?",
        "I do not answer questions without an attorney present.",
        "I do not consent to any searches.",
        "I want to leave now."
      ],
      spanish: [
        "Estoy ejerciendo mi derecho a permanecer en silencio.",
        "¿Estoy siendo detenido o soy libre de irme?",
        "No respondo preguntas sin un abogado presente.",
        "No consiento a ningún registro.",
        "Quiero irme ahora."
      ]
    },
    'search-request': {
      english: [
        "I do not consent to any searches.",
        "Do you have a warrant?",
        "I am exercising my constitutional rights.",
        "I want this interaction recorded.",
        "I will not resist, but I do not consent."
      ],
      spanish: [
        "No consiento a ningún registro.",
        "¿Tiene una orden judicial?",
        "Estoy ejerciendo mis derechos constitucionales.",
        "Quiero que esta interacción sea grabada.",
        "No voy a resistir, pero no consiento."
      ]
    },
    'arrest': {
      english: [
        "I am exercising my right to remain silent.",
        "I want to speak with an attorney immediately.",
        "I do not consent to any searches.",
        "What am I being charged with?",
        "I am not resisting arrest."
      ],
      spanish: [
        "Estoy ejerciendo mi derecho a permanecer en silencio.",
        "Quiero hablar con un abogado inmediatamente.",
        "No consiento a ningún registro.",
        "¿De qué se me acusa?",
        "No me estoy resistiendo al arresto."
      ]
    },
    'recording': {
      english: [
        "I have the right to record this interaction.",
        "I am not interfering with your duties.",
        "This is a public space and I have the right to be here.",
        "I am recording for my safety and yours.",
        "I will maintain a safe distance."
      ],
      spanish: [
        "Tengo el derecho de grabar esta interacción.",
        "No estoy interfiriendo con sus deberes.",
        "Este es un espacio público y tengo derecho a estar aquí.",
        "Estoy grabando por mi seguridad y la suya.",
        "Mantendré una distancia segura."
      ]
    }
  }

  const currentScripts = scripts[selectedScenario]?.[selectedLanguage] || []

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center space-x-4 text-white">
        <button
          onClick={() => onNavigate('home')}
          className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold">Script Library</h2>
          <p className="text-white/80">Ready-to-use phrases for common situations</p>
        </div>
      </div>

      {/* Language Selector */}
      <div className="glass-card rounded-lg p-4 shadow-card">
        <div className="flex items-center space-x-3 mb-3">
          <Globe className="text-primary" size={20} />
          <h3 className="font-semibold text-text-primary">Language</h3>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setSelectedLanguage('english')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedLanguage === 'english'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-text-primary hover:bg-gray-200'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setSelectedLanguage('spanish')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedLanguage === 'spanish'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-text-primary hover:bg-gray-200'
            }`}
          >
            Español
          </button>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="glass-card rounded-lg p-4 shadow-card">
        <h3 className="font-semibold text-text-primary mb-3">Select Scenario</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario.id)}
              className={`p-3 rounded-lg text-left transition-colors ${
                selectedScenario === scenario.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-text-primary hover:bg-gray-200'
              }`}
            >
              {scenario.name}
            </button>
          ))}
        </div>
      </div>

      {/* Scripts */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">
          {scenarios.find(s => s.id === selectedScenario)?.name} - {selectedLanguage === 'english' ? 'English' : 'Español'}
        </h3>
        
        {currentScripts.map((script, index) => (
          <ScriptPhrase 
            key={index}
            text={script}
            variant="interactive"
          />
        ))}
      </div>

      {/* Premium Features */}
      {user.subscriptionStatus === 'free' && (
        <CalloutCard variant="info">
          <div className="flex items-center space-x-3">
            <Crown className="text-accent" size={20} />
            <div>
              <h4 className="font-semibold">Premium Script Customization</h4>
              <p className="text-sm text-text-secondary">
                Upgrade to customize scripts with AI, save favorites, and access advanced scenarios.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="mt-3 w-full bg-accent text-white py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            Upgrade to Premium
          </button>
        </CalloutCard>
      )}

      {/* Emergency Record Button */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('record')}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Emergency Record
        </button>
        <p className="text-white/80 text-sm mt-2">
          Tap to start immediate recording
        </p>
      </div>
    </div>
  )
}

export default ScriptLibraryPage