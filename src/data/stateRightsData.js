// State-specific legal rights data
import { StateRightsGuide } from './models.js'

export const stateRightsData = {
  'California': new StateRightsGuide({
    stateName: 'California',
    guideContent: {
      overview: 'California has strong civil rights protections and specific laws regarding police interactions.',
      trafficStops: {
        title: 'Traffic Stops in California',
        content: 'You have the right to remain silent and refuse searches. California requires consent for vehicle searches unless there is probable cause.',
        keyPoints: [
          'You must provide license, registration, and insurance if requested',
          'You can refuse consent to search your vehicle',
          'You have the right to remain silent beyond basic identification',
          'Recording police is legal in California'
        ]
      },
      recording: {
        title: 'Recording Police in California',
        content: 'California is a two-party consent state for private conversations, but recording police in public is legal.',
        keyPoints: [
          'You can record police officers performing their duties in public',
          'You must maintain a reasonable distance',
          'Officers cannot delete your recordings',
          'You can livestream interactions'
        ]
      },
      detention: {
        title: 'Detention and Arrest',
        content: 'California law requires reasonable suspicion for detention and probable cause for arrest.',
        keyPoints: [
          'Ask "Am I free to leave?" to clarify your status',
          'You have the right to remain silent',
          'Request an attorney immediately if arrested',
          'Do not resist, even if you believe the arrest is unlawful'
        ]
      }
    },
    dosDonts: {
      dos: [
        'Remain calm and polite',
        'Keep your hands visible',
        'Ask if you are free to leave',
        'Record the interaction if safe to do so',
        'Provide required identification during traffic stops',
        'Remember officer badge numbers and patrol car numbers'
      ],
      donts: [
        'Do not argue or become confrontational',
        'Do not consent to searches',
        'Do not answer questions beyond basic identification',
        'Do not resist arrest, even if unlawful',
        'Do not reach for anything without permission',
        'Do not lie or provide false information'
      ]
    },
    lastUpdated: '2024-01-15T00:00:00.000Z',
    version: '1.2'
  }),

  'Texas': new StateRightsGuide({
    stateName: 'Texas',
    guideContent: {
      overview: 'Texas law provides specific protections during police encounters, with particular emphasis on property rights.',
      trafficStops: {
        title: 'Traffic Stops in Texas',
        content: 'Texas law requires reasonable suspicion for extended detention and consent or probable cause for searches.',
        keyPoints: [
          'Provide license and insurance when requested',
          'You can refuse consent to search',
          'Officers need reasonable suspicion to extend a stop',
          'You have the right to remain silent'
        ]
      },
      recording: {
        title: 'Recording Police in Texas',
        content: 'Texas is a one-party consent state, making recording police interactions legal.',
        keyPoints: [
          'You can record police officers in public',
          'No need for consent from officers',
          'Maintain a safe distance',
          'Cannot interfere with police duties'
        ]
      },
      detention: {
        title: 'Stop and Identify',
        content: 'Texas has a "stop and identify" law requiring identification during lawful detention.',
        keyPoints: [
          'Must provide name if lawfully detained',
          'No requirement to carry physical ID',
          'Can ask why you are being detained',
          'Right to remain silent beyond identification'
        ]
      }
    },
    dosDonts: {
      dos: [
        'Provide your name if lawfully detained',
        'Ask "Am I being detained or am I free to go?"',
        'Record interactions when safe',
        'Remain calm and respectful',
        'Keep hands visible at all times',
        'Follow lawful orders'
      ],
      donts: [
        'Do not refuse to identify yourself if detained',
        'Do not consent to searches',
        'Do not answer investigative questions',
        'Do not resist or flee',
        'Do not make sudden movements',
        'Do not argue about the law during the encounter'
      ]
    },
    lastUpdated: '2024-01-15T00:00:00.000Z',
    version: '1.1'
  }),

  'New York': new StateRightsGuide({
    stateName: 'New York',
    guideContent: {
      overview: 'New York has specific laws regarding stop-and-frisk and police interactions, with strong protections in NYC.',
      trafficStops: {
        title: 'Traffic Stops in New York',
        content: 'New York requires reasonable suspicion for stops and probable cause for searches.',
        keyPoints: [
          'Must provide license and registration when requested',
          'Can refuse consent to search vehicle',
          'Right to remain silent beyond identification',
          'Can ask why you were stopped'
        ]
      },
      recording: {
        title: 'Recording Police in New York',
        content: 'New York is a one-party consent state, allowing recording of police interactions.',
        keyPoints: [
          'Legal to record police in public spaces',
          'Cannot interfere with police work',
          'Maintain reasonable distance',
          'Officers cannot confiscate recording devices without warrant'
        ]
      },
      stopAndFrisk: {
        title: 'Stop and Frisk',
        content: 'New York has specific regulations on stop-and-frisk procedures following court reforms.',
        keyPoints: [
          'Officer must have reasonable suspicion of criminal activity',
          'Frisk requires reasonable suspicion of weapons',
          'You can ask why you are being stopped',
          'You have the right to refuse consent to search'
        ]
      }
    },
    dosDonts: {
      dos: [
        'Ask "Why am I being stopped?"',
        'State clearly "I do not consent to any searches"',
        'Record the interaction if possible',
        'Remember officer details',
        'Remain calm and polite',
        'Follow lawful orders'
      ],
      donts: [
        'Do not consent to searches',
        'Do not answer questions beyond identification',
        'Do not resist physical contact during frisk',
        'Do not argue during the encounter',
        'Do not make sudden movements',
        'Do not provide false information'
      ]
    },
    lastUpdated: '2024-01-15T00:00:00.000Z',
    version: '1.3'
  }),

  'Florida': new StateRightsGuide({
    stateName: 'Florida',
    guideContent: {
      overview: 'Florida law provides specific protections during police encounters, with emphasis on traffic stop procedures.',
      trafficStops: {
        title: 'Traffic Stops in Florida',
        content: 'Florida requires reasonable suspicion for detention and consent or probable cause for searches.',
        keyPoints: [
          'Must provide driver license when requested',
          'Passengers generally not required to identify',
          'Can refuse consent to search',
          'Right to remain silent'
        ]
      },
      recording: {
        title: 'Recording Police in Florida',
        content: 'Florida is a two-party consent state, but recording police in public is generally legal.',
        keyPoints: [
          'Can record police performing public duties',
          'Must maintain reasonable distance',
          'Cannot record private conversations without consent',
          'Officers cannot delete recordings'
        ]
      },
      detention: {
        title: 'Detention and Questioning',
        content: 'Florida law requires reasonable suspicion for detention and allows questioning during lawful stops.',
        keyPoints: [
          'Can ask if you are free to leave',
          'Right to remain silent',
          'No general stop and identify requirement',
          'Can refuse to answer questions'
        ]
      }
    },
    dosDonts: {
      dos: [
        'Provide driver license during traffic stops',
        'Ask "Am I free to leave?"',
        'State "I am exercising my right to remain silent"',
        'Record interactions when legal',
        'Remain calm and respectful',
        'Keep hands visible'
      ],
      donts: [
        'Do not consent to searches',
        'Do not answer investigative questions',
        'Do not resist arrest',
        'Do not interfere with police duties',
        'Do not make sudden movements',
        'Do not provide false documents'
      ]
    },
    lastUpdated: '2024-01-15T00:00:00.000Z',
    version: '1.1'
  })
}

// Function to get rights data for a specific state
export const getStateRights = (stateName) => {
  return stateRightsData[stateName] || null
}

// Function to get all available states
export const getAvailableStates = () => {
  return Object.keys(stateRightsData)
}

// Default rights guide for states not yet implemented
export const getDefaultRightsGuide = (stateName) => {
  return new StateRightsGuide({
    stateName,
    guideContent: {
      overview: `General rights information for ${stateName}. State-specific details coming soon.`,
      general: {
        title: 'Your Constitutional Rights',
        content: 'These rights apply in all states under the U.S. Constitution.',
        keyPoints: [
          'You have the right to remain silent',
          'You have the right to refuse consent to searches',
          'You have the right to an attorney',
          'You have the right to record police in public',
          'You cannot be detained without reasonable suspicion',
          'You cannot be arrested without probable cause'
        ]
      }
    },
    dosDonts: {
      dos: [
        'Remain calm and polite',
        'Keep your hands visible',
        'Ask if you are free to leave',
        'Exercise your right to remain silent',
        'Request an attorney if arrested',
        'Remember details of the encounter'
      ],
      donts: [
        'Do not consent to searches',
        'Do not answer questions beyond identification',
        'Do not resist arrest',
        'Do not argue with officers',
        'Do not make sudden movements',
        'Do not lie or provide false information'
      ]
    },
    lastUpdated: new Date().toISOString(),
    version: '1.0'
  })
}
