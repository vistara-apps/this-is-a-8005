// Stripe service for subscription payment processing
import { loadStripe } from '@stripe/stripe-js'
import { API_KEYS, APP_CONFIG } from '../config/constants.js'

class StripeService {
  constructor() {
    this.publishableKey = API_KEYS.stripe
    this.stripe = null
    this.isConfigured = false

    if (!this.publishableKey) {
      console.warn('Stripe publishable key not found. Payment features will be disabled.')
      return
    }

    this.initializeStripe()
  }

  async initializeStripe() {
    try {
      this.stripe = await loadStripe(this.publishableKey)
      this.isConfigured = true
    } catch (error) {
      console.error('Failed to initialize Stripe:', error)
      this.isConfigured = false
    }
  }

  /**
   * Create a subscription checkout session
   * @param {Object} options - Checkout options
   * @returns {Promise<Object>} Checkout session result
   */
  async createSubscriptionCheckout(options = {}) {
    if (!this.isConfigured) {
      throw new Error('Stripe service not configured. Please check API key.')
    }

    try {
      // In a real application, this would call your backend API
      // For demo purposes, we'll simulate the checkout process
      const checkoutData = {
        mode: 'subscription',
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Know Your Rights Buddy Premium',
              description: 'Unlimited script customization, cloud backup, and advanced features'
            },
            unit_amount: Math.round(APP_CONFIG.subscriptionPrice * 100), // Convert to cents
            recurring: {
              interval: 'month'
            }
          },
          quantity: 1
        }],
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/profile`,
        customer_email: options.customerEmail,
        metadata: {
          userId: options.userId || 'anonymous',
          plan: 'premium'
        }
      }

      // In production, send this to your backend endpoint
      console.log('Would create checkout session with:', checkoutData)
      
      // For demo, return a mock session
      return {
        success: true,
        sessionId: 'demo_session_' + Date.now(),
        url: '#demo-checkout'
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw new Error('Failed to create checkout session. Please try again.')
    }
  }

  /**
   * Redirect to Stripe Checkout
   * @param {string} sessionId - Checkout session ID
   * @returns {Promise<void>}
   */
  async redirectToCheckout(sessionId) {
    if (!this.stripe) {
      throw new Error('Stripe not initialized')
    }

    try {
      const { error } = await this.stripe.redirectToCheckout({
        sessionId: sessionId
      })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Error redirecting to checkout:', error)
      throw new Error('Failed to redirect to checkout. Please try again.')
    }
  }

  /**
   * Create a one-time payment
   * @param {Object} options - Payment options
   * @returns {Promise<Object>} Payment result
   */
  async createOneTimePayment(options = {}) {
    if (!this.isConfigured) {
      throw new Error('Stripe service not configured.')
    }

    try {
      // This would typically call your backend to create a PaymentIntent
      const paymentData = {
        amount: Math.round(options.amount * 100), // Convert to cents
        currency: options.currency || 'usd',
        description: options.description || 'Know Your Rights Buddy Purchase',
        metadata: {
          userId: options.userId || 'anonymous',
          type: options.type || 'one-time'
        }
      }

      console.log('Would create payment intent with:', paymentData)
      
      // For demo, return mock payment intent
      return {
        success: true,
        clientSecret: 'demo_pi_' + Date.now() + '_secret',
        paymentIntentId: 'demo_pi_' + Date.now()
      }
    } catch (error) {
      console.error('Error creating payment:', error)
      throw new Error('Failed to create payment. Please try again.')
    }
  }

  /**
   * Confirm a payment with card details
   * @param {string} clientSecret - Payment intent client secret
   * @param {Object} cardElement - Stripe card element
   * @param {Object} billingDetails - Billing information
   * @returns {Promise<Object>} Payment confirmation result
   */
  async confirmPayment(clientSecret, cardElement, billingDetails = {}) {
    if (!this.stripe) {
      throw new Error('Stripe not initialized')
    }

    try {
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: billingDetails
          }
        }
      )

      if (error) {
        throw error
      }

      return {
        success: true,
        paymentIntent: paymentIntent
      }
    } catch (error) {
      console.error('Error confirming payment:', error)
      throw new Error('Payment failed. Please check your card details and try again.')
    }
  }

  /**
   * Create Stripe Elements for card input
   * @param {Object} options - Element options
   * @returns {Object} Stripe elements
   */
  createElements(options = {}) {
    if (!this.stripe) {
      throw new Error('Stripe not initialized')
    }

    const elements = this.stripe.elements({
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: 'hsl(220 80% 50%)',
          colorBackground: 'hsl(220 10% 100%)',
          colorText: 'hsl(220 10% 15%)',
          colorDanger: '#df1b41',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          spacingUnit: '4px',
          borderRadius: '6px'
        }
      },
      ...options
    })

    return elements
  }

  /**
   * Create a card element
   * @param {Object} elements - Stripe elements instance
   * @param {Object} options - Card element options
   * @returns {Object} Card element
   */
  createCardElement(elements, options = {}) {
    return elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: 'hsl(220 10% 15%)',
          '::placeholder': {
            color: 'hsl(220 10% 45%)'
          }
        },
        invalid: {
          color: '#df1b41'
        }
      },
      hidePostalCode: true,
      ...options
    })
  }

  /**
   * Retrieve a checkout session
   * @param {string} sessionId - Checkout session ID
   * @returns {Promise<Object>} Session details
   */
  async retrieveCheckoutSession(sessionId) {
    // This would typically call your backend
    console.log('Would retrieve session:', sessionId)
    
    // For demo, return mock session data
    return {
      id: sessionId,
      payment_status: 'paid',
      customer_email: 'demo@example.com',
      subscription: {
        id: 'sub_demo_' + Date.now(),
        status: 'active'
      }
    }
  }

  /**
   * Cancel a subscription
   * @param {string} subscriptionId - Subscription ID
   * @returns {Promise<Object>} Cancellation result
   */
  async cancelSubscription(subscriptionId) {
    // This would typically call your backend
    console.log('Would cancel subscription:', subscriptionId)
    
    return {
      success: true,
      subscription: {
        id: subscriptionId,
        status: 'canceled',
        canceled_at: Date.now()
      }
    }
  }

  /**
   * Get subscription details
   * @param {string} subscriptionId - Subscription ID
   * @returns {Promise<Object>} Subscription details
   */
  async getSubscription(subscriptionId) {
    // This would typically call your backend
    console.log('Would get subscription:', subscriptionId)
    
    return {
      id: subscriptionId,
      status: 'active',
      current_period_end: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days from now
      plan: {
        amount: APP_CONFIG.subscriptionPrice * 100,
        currency: 'usd',
        interval: 'month'
      }
    }
  }

  /**
   * Check if service is available
   * @returns {boolean} Service availability
   */
  isAvailable() {
    return this.isConfigured
  }

  /**
   * Get Stripe instance
   * @returns {Object|null} Stripe instance
   */
  getStripe() {
    return this.stripe
  }
}

// Export singleton instance
export const stripeService = new StripeService()
export default stripeService
