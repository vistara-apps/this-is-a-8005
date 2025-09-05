// Script library data for various law enforcement interaction scenarios
import { Script } from './models.js'
import { SCRIPT_SCENARIOS } from '../config/constants.js'

export const scriptLibrary = {
  [SCRIPT_SCENARIOS.TRAFFIC_STOP]: new Script({
    scenario: SCRIPT_SCENARIOS.TRAFFIC_STOP,
    textEnglish: [
      "Good [morning/afternoon/evening], officer.",
      "I am exercising my right to remain silent.",
      "I do not consent to any searches of my person or vehicle.",
      "Am I free to leave?",
      "I would like to speak with an attorney.",
      "I am not answering any questions without my lawyer present.",
      "Please tell me why I was stopped.",
      "I do not consent to any search of my belongings."
    ],
    textSpanish: [
      "Buenos [días/tardes/noches], oficial.",
      "Estoy ejerciendo mi derecho a permanecer en silencio.",
      "No consiento a ningún registro de mi persona o vehículo.",
      "¿Soy libre de irme?",
      "Me gustaría hablar con un abogado.",
      "No voy a responder ninguna pregunta sin mi abogado presente.",
      "Por favor dígame por qué me detuvo.",
      "No consiento a ningún registro de mis pertenencias."
    ],
    category: 'traffic',
    isPremium: false,
    customizable: true,
    tags: ['traffic', 'vehicle', 'stop', 'basic']
  }),

  [SCRIPT_SCENARIOS.QUESTIONED]: new Script({
    scenario: SCRIPT_SCENARIOS.QUESTIONED,
    textEnglish: [
      "I am exercising my right to remain silent.",
      "Am I being detained or am I free to go?",
      "I do not answer questions without an attorney present.",
      "I do not consent to any searches.",
      "I want to leave now.",
      "What is the reason for this stop?",
      "I am not required to answer your questions.",
      "I would like to contact my attorney."
    ],
    textSpanish: [
      "Estoy ejerciendo mi derecho a permanecer en silencio.",
      "¿Estoy siendo detenido o soy libre de irme?",
      "No respondo preguntas sin un abogado presente.",
      "No consiento a ningún registro.",
      "Quiero irme ahora.",
      "¿Cuál es la razón de esta parada?",
      "No estoy obligado a responder sus preguntas.",
      "Me gustaría contactar a mi abogado."
    ],
    category: 'street',
    isPremium: false,
    customizable: true,
    tags: ['questioning', 'street', 'detention', 'basic']
  }),

  [SCRIPT_SCENARIOS.SEARCH_REQUEST]: new Script({
    scenario: SCRIPT_SCENARIOS.SEARCH_REQUEST,
    textEnglish: [
      "I do not consent to any searches.",
      "I am exercising my Fourth Amendment rights.",
      "Do you have a warrant?",
      "I do not give permission to search my person, belongings, or property.",
      "I want this refusal to search recorded.",
      "Am I required to allow this search?",
      "I am clearly stating I do not consent.",
      "Please document my refusal to consent."
    ],
    textSpanish: [
      "No consiento a ningún registro.",
      "Estoy ejerciendo mis derechos de la Cuarta Enmienda.",
      "¿Tiene una orden judicial?",
      "No doy permiso para registrar mi persona, pertenencias o propiedad.",
      "Quiero que se registre esta negativa al registro.",
      "¿Estoy obligado a permitir este registro?",
      "Estoy declarando claramente que no consiento.",
      "Por favor documente mi negativa a consentir."
    ],
    category: 'search',
    isPremium: false,
    customizable: true,
    tags: ['search', 'consent', 'fourth-amendment', 'basic']
  }),

  [SCRIPT_SCENARIOS.ARREST]: new Script({
    scenario: SCRIPT_SCENARIOS.ARREST,
    textEnglish: [
      "I am not resisting arrest.",
      "I am exercising my right to remain silent.",
      "I want to speak with an attorney immediately.",
      "I do not consent to any searches.",
      "What am I being arrested for?",
      "I invoke my Fifth Amendment right to remain silent.",
      "I request an attorney before answering any questions.",
      "Please be gentle, I am not resisting."
    ],
    textSpanish: [
      "No me estoy resistiendo al arresto.",
      "Estoy ejerciendo mi derecho a permanecer en silencio.",
      "Quiero hablar con un abogado inmediatamente.",
      "No consiento a ningún registro.",
      "¿Por qué me están arrestando?",
      "Invoco mi derecho de la Quinta Enmienda a permanecer en silencio.",
      "Solicito un abogado antes de responder cualquier pregunta.",
      "Por favor sea gentil, no me estoy resistiendo."
    ],
    category: 'arrest',
    isPremium: false,
    customizable: true,
    tags: ['arrest', 'miranda', 'attorney', 'basic']
  }),

  [SCRIPT_SCENARIOS.RECORDING]: new Script({
    scenario: SCRIPT_SCENARIOS.RECORDING,
    textEnglish: [
      "I am recording this interaction for my safety and yours.",
      "I have the right to record police officers in public.",
      "This recording is for documentation purposes.",
      "I am not interfering with your duties.",
      "I am standing at a safe distance.",
      "Recording police is legal in this state.",
      "I am exercising my First Amendment rights.",
      "This is being livestreamed for safety."
    ],
    textSpanish: [
      "Estoy grabando esta interacción por mi seguridad y la suya.",
      "Tengo el derecho de grabar a los oficiales de policía en público.",
      "Esta grabación es para propósitos de documentación.",
      "No estoy interfiriendo con sus deberes.",
      "Estoy parado a una distancia segura.",
      "Grabar a la policía es legal en este estado.",
      "Estoy ejerciendo mis derechos de la Primera Enmienda.",
      "Esto se está transmitiendo en vivo por seguridad."
    ],
    category: 'recording',
    isPremium: false,
    customizable: true,
    tags: ['recording', 'first-amendment', 'documentation', 'basic']
  }),

  [SCRIPT_SCENARIOS.DETENTION]: new Script({
    scenario: SCRIPT_SCENARIOS.DETENTION,
    textEnglish: [
      "Am I being detained or am I free to go?",
      "What is the reasonable suspicion for this detention?",
      "I am exercising my right to remain silent.",
      "How long will this detention last?",
      "I do not consent to any searches during this detention.",
      "I want to leave if I am not being detained.",
      "Please clarify my status - detained or free to go?",
      "I invoke my right to remain silent during this detention."
    ],
    textSpanish: [
      "¿Estoy siendo detenido o soy libre de irme?",
      "¿Cuál es la sospecha razonable para esta detención?",
      "Estoy ejerciendo mi derecho a permanecer en silencio.",
      "¿Cuánto durará esta detención?",
      "No consiento a ningún registro durante esta detención.",
      "Quiero irme si no estoy siendo detenido.",
      "Por favor aclare mi estado - ¿detenido o libre de irme?",
      "Invoco mi derecho a permanecer en silencio durante esta detención."
    ],
    category: 'detention',
    isPremium: true,
    customizable: true,
    tags: ['detention', 'reasonable-suspicion', 'terry-stop', 'premium']
  }),

  [SCRIPT_SCENARIOS.HOME_VISIT]: new Script({
    scenario: SCRIPT_SCENARIOS.HOME_VISIT,
    textEnglish: [
      "Do you have a warrant to enter my home?",
      "I do not consent to you entering my property.",
      "I am exercising my Fourth Amendment rights.",
      "Please show me the warrant before entering.",
      "I do not consent to any search of my home.",
      "I will speak with you through the door.",
      "I am not opening the door without a warrant.",
      "Please state your business and show identification."
    ],
    textSpanish: [
      "¿Tienen una orden para entrar a mi casa?",
      "No consiento a que entren a mi propiedad.",
      "Estoy ejerciendo mis derechos de la Cuarta Enmienda.",
      "Por favor muéstrenme la orden antes de entrar.",
      "No consiento a ningún registro de mi casa.",
      "Hablaré con ustedes a través de la puerta.",
      "No voy a abrir la puerta sin una orden.",
      "Por favor declaren su propósito y muestren identificación."
    ],
    category: 'home',
    isPremium: true,
    customizable: true,
    tags: ['home', 'warrant', 'fourth-amendment', 'property', 'premium']
  })
}

// Premium scripts for advanced scenarios
export const premiumScripts = {
  'dui-checkpoint': new Script({
    scenario: 'dui-checkpoint',
    textEnglish: [
      "I am exercising my right to remain silent.",
      "I do not consent to any field sobriety tests.",
      "I do not consent to any searches of my vehicle.",
      "Am I free to leave this checkpoint?",
      "I invoke my Fifth Amendment rights.",
      "I do not answer questions about where I've been or where I'm going.",
      "I do not consent to any chemical tests without a warrant.",
      "I want to speak with an attorney before proceeding."
    ],
    textSpanish: [
      "Estoy ejerciendo mi derecho a permanecer en silencio.",
      "No consiento a ninguna prueba de sobriedad de campo.",
      "No consiento a ningún registro de mi vehículo.",
      "¿Soy libre de dejar este punto de control?",
      "Invoco mis derechos de la Quinta Enmienda.",
      "No respondo preguntas sobre dónde he estado o a dónde voy.",
      "No consiento a ninguna prueba química sin una orden.",
      "Quiero hablar con un abogado antes de proceder."
    ],
    category: 'traffic',
    isPremium: true,
    customizable: true,
    tags: ['dui', 'checkpoint', 'sobriety', 'premium']
  }),

  'protest-arrest': new Script({
    scenario: 'protest-arrest',
    textEnglish: [
      "I am exercising my First Amendment right to peaceful protest.",
      "I am not resisting arrest.",
      "I want to speak with an attorney immediately.",
      "I do not consent to any searches.",
      "This is a peaceful demonstration.",
      "I invoke my right to remain silent.",
      "Please document that I am not resisting.",
      "I am exercising my constitutional rights."
    ],
    textSpanish: [
      "Estoy ejerciendo mi derecho de la Primera Enmienda a protestar pacíficamente.",
      "No me estoy resistiendo al arresto.",
      "Quiero hablar con un abogado inmediatamente.",
      "No consiento a ningún registro.",
      "Esta es una manifestación pacífica.",
      "Invoco mi derecho a permanecer en silencio.",
      "Por favor documenten que no me estoy resistiendo.",
      "Estoy ejerciendo mis derechos constitucionales."
    ],
    category: 'protest',
    isPremium: true,
    customizable: true,
    tags: ['protest', 'first-amendment', 'demonstration', 'premium']
  })
}

// Function to get scripts by scenario
export const getScriptsByScenario = (scenario) => {
  return scriptLibrary[scenario] || null
}

// Function to get all available scenarios
export const getAvailableScenarios = () => {
  return Object.keys(scriptLibrary)
}

// Function to get premium scripts
export const getPremiumScripts = () => {
  return premiumScripts
}

// Function to get scripts by category
export const getScriptsByCategory = (category) => {
  const scripts = { ...scriptLibrary, ...premiumScripts }
  return Object.values(scripts).filter(script => script.category === category)
}

// Function to search scripts by tags
export const searchScriptsByTags = (tags) => {
  const scripts = { ...scriptLibrary, ...premiumScripts }
  return Object.values(scripts).filter(script => 
    tags.some(tag => script.tags.includes(tag))
  )
}
