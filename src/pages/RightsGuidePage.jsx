import React from 'react'
import CalloutCard from '../components/CalloutCard'
import { ArrowLeft, Shield, AlertTriangle, CheckCircle } from 'lucide-react'

const RightsGuidePage = ({ state, onNavigate }) => {
  const stateGuides = {
    'California': {
      dos: [
        'Remain calm and polite',
        'Keep your hands visible',
        'State: "I am exercising my right to remain silent"',
        'Ask: "Am I free to leave?"',
        'Record the interaction if safe to do so'
      ],
      donts: [
        'Don\'t resist physically, even if you believe the stop is unlawful',
        'Don\'t consent to searches unless required',
        'Don\'t provide false information',
        'Don\'t argue about your rights on the street'
      ],
      specific: [
        'California requires consent for vehicle searches in most cases',
        'You have the right to observe and record police from a safe distance',
        'Police must inform you of Miranda rights before custodial interrogation'
      ]
    },
    'Texas': {
      dos: [
        'Remain calm and respectful',
        'Keep your hands where officers can see them',
        'Invoke your right to remain silent clearly',
        'Ask if you are under arrest',
        'Request a lawyer if arrested'
      ],
      donts: [
        'Don\'t physically resist arrest',
        'Don\'t consent to searches without a warrant',
        'Don\'t lie or provide false documents',
        'Don\'t interfere with police duties'
      ],
      specific: [
        'Texas has "Stop and Identify" laws - you may need to provide your name',
        'Vehicle searches require probable cause or consent',
        'Open carry laws apply in Texas with proper licensing'
      ]
    },
    'New York': {
      dos: [
        'Stay calm and speak politely',
        'Keep your hands visible at all times',
        'Clearly state: "I invoke my right to remain silent"',
        'Ask: "Am I being detained or am I free to go?"',
        'Remember badge numbers and patrol car numbers'
      ],
      donts: [
        'Don\'t run or physically resist',
        'Don\'t consent to searches',
        'Don\'t answer questions beyond required identification',
        'Don\'t take photos too close to officers'
      ],
      specific: [
        'Stop-and-frisk requires reasonable suspicion of criminal activity',
        'Police need probable cause for vehicle searches',
        'Recording police is legal in public spaces'
      ]
    }
  }

  const guide = stateGuides[state] || stateGuides['California']

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
          <h2 className="text-2xl font-bold">{state || 'General'} Rights Guide</h2>
          <p className="text-white/80">Know your rights and stay safe</p>
        </div>
      </div>

      {/* Important Notice */}
      <CalloutCard variant="warning">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
          <div>
            <h4 className="font-semibold">Important Disclaimer</h4>
            <p className="text-sm">
              This information is for educational purposes only and does not constitute legal advice. 
              Laws vary by jurisdiction and circumstances. Consult with a qualified attorney for specific legal guidance.
            </p>
          </div>
        </div>
      </CalloutCard>

      {/* Do's Section */}
      <div className="glass-card rounded-lg p-6 shadow-card">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="text-accent" size={24} />
          <h3 className="text-xl font-semibold text-text-primary">What to DO</h3>
        </div>
        <ul className="space-y-3">
          {guide.dos.map((item, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-text-primary">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Don'ts Section */}
      <div className="glass-card rounded-lg p-6 shadow-card">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="text-red-500" size={24} />
          <h3 className="text-xl font-semibold text-text-primary">What NOT to do</h3>
        </div>
        <ul className="space-y-3">
          {guide.donts.map((item, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-text-primary">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* State-Specific Information */}
      <div className="glass-card rounded-lg p-6 shadow-card">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="text-primary" size={24} />
          <h3 className="text-xl font-semibold text-text-primary">{state} Specific Laws</h3>
        </div>
        <ul className="space-y-3">
          {guide.specific.map((item, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-text-primary">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate('scripts')}
          className="bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          View Script Library
        </button>
        <button
          onClick={() => onNavigate('record')}
          className="bg-accent text-white py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          Start Recording
        </button>
      </div>
    </div>
  )
}

export default RightsGuidePage