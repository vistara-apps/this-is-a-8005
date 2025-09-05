import React from 'react'
import StateSelector from '../components/StateSelector'
import CalloutCard from '../components/CalloutCard'
import RecordButton from '../components/RecordButton'
import { Shield, MessageSquare, Video, Star } from 'lucide-react'

const HomePage = ({ onNavigate, selectedState, onStateSelect }) => {
  const features = [
    {
      icon: Shield,
      title: 'State-Specific Rights Guides',
      description: 'Get personalized legal guidance for your state',
      action: () => onNavigate('rights')
    },
    {
      icon: MessageSquare,
      title: 'Script Library',
      description: 'Ready-to-use phrases in English & Spanish',
      action: () => onNavigate('scripts')
    },
    {
      icon: Video,
      title: 'One-Tap Recording',
      description: 'Document interactions safely and securely',
      action: () => onNavigate('record')
    }
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center text-white mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Empowering you with legal knowledge in your pocket
        </h2>
        <p className="text-lg text-white/80 mb-6">
          Stay informed, stay safe, and know your rights during law enforcement interactions.
        </p>
      </div>

      {/* State Selection */}
      <div className="glass-card rounded-lg p-6 shadow-card">
        <h3 className="text-xl font-semibold mb-4 text-text-primary">
          Select Your State
        </h3>
        <StateSelector 
          selectedState={selectedState}
          onStateSelect={onStateSelect}
        />
        {selectedState && (
          <div className="mt-4">
            <button
              onClick={() => onNavigate('rights')}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              View {selectedState} Rights Guide
            </button>
          </div>
        )}
      </div>

      {/* Quick Features */}
      <div className="grid gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="glass-card rounded-lg p-4 shadow-card cursor-pointer hover:bg-white/20 transition-colors"
            onClick={feature.action}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-accent/20 p-3 rounded-lg">
                <feature.icon className="text-accent" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-text-primary">{feature.title}</h4>
                <p className="text-sm text-text-secondary">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Record Button */}
      <div className="text-center">
        <RecordButton 
          variant="primary"
          onClick={() => onNavigate('record')}
        />
        <p className="text-white/80 text-sm mt-2">
          Emergency recording - tap to start documenting
        </p>
      </div>

      {/* Subscription CTA */}
      <CalloutCard variant="info">
        <div className="flex items-center space-x-3">
          <Star className="text-accent" size={20} />
          <div>
            <h4 className="font-semibold">Unlock Premium Features</h4>
            <p className="text-sm text-text-secondary">
              Get unlimited scripts, cloud backup, and advanced guides for $3/month
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('profile')}
          className="mt-3 w-full bg-accent text-white py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          Upgrade Now
        </button>
      </CalloutCard>
    </div>
  )
}

export default HomePage