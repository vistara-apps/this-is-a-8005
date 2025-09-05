import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const StateSelector = ({ selectedState, onStateSelect, variant = 'dropdown' }) => {
  const [isOpen, setIsOpen] = useState(false)

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ]

  const handleStateSelect = (state) => {
    onStateSelect(state)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-primary transition-colors"
      >
        <span className={selectedState ? 'text-text-primary' : 'text-text-secondary'}>
          {selectedState || 'Select your state...'}
        </span>
        <ChevronDown 
          className={`text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}
          size={20}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-modal max-h-60 overflow-y-auto z-10">
          {states.map((state) => (
            <button
              key={state}
              onClick={() => handleStateSelect(state)}
              className="w-full p-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              {state}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default StateSelector