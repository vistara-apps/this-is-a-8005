// Application constants and configuration
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Know Your Rights Buddy',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  subscriptionPrice: parseFloat(import.meta.env.VITE_SUBSCRIPTION_PRICE) || 3.00
}

export const API_KEYS = {
  openai: import.meta.env.VITE_OPENAI_API_KEY,
  pinata: {
    apiKey: import.meta.env.VITE_PINATA_API_KEY,
    secretKey: import.meta.env.VITE_PINATA_SECRET_KEY
  },
  stripe: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
  airstack: import.meta.env.VITE_AIRSTACK_API_KEY
}

export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PREMIUM: 'premium'
}

export const LANGUAGES = {
  ENGLISH: 'english',
  SPANISH: 'spanish'
}

export const RECORDING_STATES = {
  IDLE: 'idle',
  RECORDING: 'recording',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  ERROR: 'error'
}

export const US_STATES = [
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

export const SCRIPT_SCENARIOS = {
  TRAFFIC_STOP: 'traffic-stop',
  QUESTIONED: 'questioned',
  SEARCH_REQUEST: 'search-request',
  ARREST: 'arrest',
  RECORDING: 'recording',
  DETENTION: 'detention',
  HOME_VISIT: 'home-visit'
}
