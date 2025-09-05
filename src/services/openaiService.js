// OpenAI service for AI-powered script customization
import OpenAI from 'openai'
import { API_KEYS } from '../config/constants.js'

class OpenAIService {
  constructor() {
    if (!API_KEYS.openai) {
      console.warn('OpenAI API key not found. AI features will be disabled.')
      this.client = null
      return
    }

    this.client = new OpenAI({
      apiKey: API_KEYS.openai,
      dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
    })
  }

  /**
   * Customize a script based on user input and scenario
   * @param {string} scenario - The scenario type
   * @param {string} originalScript - The original script text
   * @param {string} customization - User's customization request
   * @param {string} language - Target language (english/spanish)
   * @param {string} state - User's state for state-specific customization
   * @returns {Promise<string>} Customized script
   */
  async customizeScript(scenario, originalScript, customization, language = 'english', state = '') {
    if (!this.client) {
      throw new Error('OpenAI service not available. Please check API key configuration.')
    }

    try {
      const systemPrompt = this.buildSystemPrompt(scenario, language, state)
      const userPrompt = this.buildUserPrompt(originalScript, customization)

      const response = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 500,
        temperature: 0.3
      })

      return response.choices[0]?.message?.content || originalScript
    } catch (error) {
      console.error('Error customizing script:', error)
      throw new Error('Failed to customize script. Please try again.')
    }
  }

  /**
   * Generate an incident card description
   * @param {Object} incidentData - Incident details
   * @returns {Promise<string>} Generated description
   */
  async generateIncidentDescription(incidentData) {
    if (!this.client) {
      throw new Error('OpenAI service not available.')
    }

    try {
      const prompt = `Generate a concise, professional incident description for a police interaction record. Include key details but keep it factual and neutral.

Incident Details:
- Date/Time: ${incidentData.timestamp}
- Location: ${incidentData.location || 'Not specified'}
- Duration: ${incidentData.duration || 'Unknown'}
- Type: ${incidentData.eventType || 'General interaction'}
- Notes: ${incidentData.notes || 'No additional notes'}

Generate a 2-3 sentence professional summary suitable for sharing with legal counsel or trusted contacts.`

      const response = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: 200,
        temperature: 0.2
      })

      return response.choices[0]?.message?.content || 'Police interaction documented.'
    } catch (error) {
      console.error('Error generating incident description:', error)
      return 'Police interaction documented.'
    }
  }

  /**
   * Generate state-specific advice
   * @param {string} state - State name
   * @param {string} scenario - Scenario type
   * @returns {Promise<string>} State-specific advice
   */
  async generateStateAdvice(state, scenario) {
    if (!this.client) {
      throw new Error('OpenAI service not available.')
    }

    try {
      const prompt = `Provide brief, accurate legal advice for ${scenario} scenarios in ${state}. Focus on state-specific laws and procedures. Keep response under 100 words and include only factual, well-established legal information.

Scenario: ${scenario}
State: ${state}

Provide 2-3 key state-specific points that differ from general federal rights.`

      const response = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: 150,
        temperature: 0.1
      })

      return response.choices[0]?.message?.content || 'General constitutional rights apply.'
    } catch (error) {
      console.error('Error generating state advice:', error)
      return 'General constitutional rights apply.'
    }
  }

  buildSystemPrompt(scenario, language, state) {
    const languageInstruction = language === 'spanish' 
      ? 'Respond in Spanish.' 
      : 'Respond in English.'

    const stateInstruction = state 
      ? `Consider ${state} state laws when applicable.` 
      : ''

    return `You are a legal rights assistant helping people customize scripts for police interactions. 

Guidelines:
- Keep responses factual and based on established constitutional rights
- Maintain a respectful, non-confrontational tone
- Focus on de-escalation and safety
- Include only legally sound advice
- ${languageInstruction}
- ${stateInstruction}
- Scenario context: ${scenario}

Your role is to help customize the provided script while maintaining legal accuracy and safety focus.`
  }

  buildUserPrompt(originalScript, customization) {
    return `Original script: "${originalScript}"

User's customization request: "${customization}"

Please provide a customized version that:
1. Incorporates the user's request while maintaining legal accuracy
2. Keeps the respectful, non-confrontational tone
3. Ensures the script promotes safety and de-escalation
4. Maintains constitutional rights focus

Return only the customized script text.`
  }

  /**
   * Check if OpenAI service is available
   * @returns {boolean} Service availability
   */
  isAvailable() {
    return this.client !== null
  }
}

// Export singleton instance
export const openaiService = new OpenAIService()
export default openaiService
