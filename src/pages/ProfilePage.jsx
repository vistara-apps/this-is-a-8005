import React from 'react'
import { useApp } from '../contexts/AppContext'
import CalloutCard from '../components/CalloutCard'
import { ArrowLeft, Crown, User, Settings, Star, CreditCard, Shield } from 'lucide-react'

const ProfilePage = ({ onNavigate }) => {
  const { user, upgradeSubscription } = useApp()

  const premiumFeatures = [
    'Unlimited script customization with AI',
    'Cloud backup of all recordings',
    'Advanced state-specific legal details',
    'Priority customer support',
    'Offline access to all content'
  ]

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
          <h2 className="text-2xl font-bold">Profile & Settings</h2>
          <p className="text-white/80">Manage your account and subscription</p>
        </div>
      </div>

      {/* User Info */}
      <div className="glass-card rounded-lg p-6 shadow-card">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-primary/20 p-3 rounded-lg">
            <User className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              {user.email || 'Guest User'}
            </h3>
            <p className="text-text-secondary capitalize">
              {user.subscriptionStatus} Plan
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">State</span>
            <span className="text-text-primary">{user.state || 'Not selected'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Language</span>
            <span className="text-text-primary capitalize">{user.preferredLanguage}</span>
          </div>
        </div>
      </div>

      {/* Subscription Status */}
      {user.subscriptionStatus === 'free' ? (
        <CalloutCard variant="info">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Crown className="text-accent" size={24} />
              <div>
                <h4 className="text-lg font-semibold">Upgrade to Premium</h4>
                <p className="text-text-secondary">Unlock advanced features for just $3/month</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h5 className="font-medium text-text-primary">Premium Features:</h5>
              <ul className="space-y-1">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <Star className="text-accent" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={upgradeSubscription}
              className="w-full bg-accent text-white py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center justify-center space-x-2"
            >
              <CreditCard size={20} />
              <span>Upgrade Now - $3/month</span>
            </button>
          </div>
        </CalloutCard>
      ) : (
        <CalloutCard variant="success">
          <div className="flex items-center space-x-3">
            <Crown className="text-accent" size={24} />
            <div>
              <h4 className="text-lg font-semibold">Premium Member</h4>
              <p className="text-text-secondary">
                You have access to all premium features. Next billing: Feb 15, 2024
              </p>
            </div>
          </div>
          <button className="mt-3 w-full bg-gray-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
            Manage Subscription
          </button>
        </CalloutCard>
      )}

      {/* Settings */}
      <div className="glass-card rounded-lg p-6 shadow-card">
        <div className="flex items-center space-x-3 mb-4">
          <Settings className="text-primary" size={24} />
          <h3 className="text-lg font-semibold text-text-primary">Settings</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              defaultValue={user.email}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Preferred Language
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="english">English</option>
              <option value="spanish">Español</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Default State
            </label>
            <select className="w-full p-3 border border-gray-300 rounded-lg">
              <option value="">Select your state</option>
              <option value="California">California</option>
              <option value="Texas">Texas</option>
              <option value="New York">New York</option>
              <option value="Florida">Florida</option>
            </select>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Save Settings
        </button>
      </div>

      {/* Legal & Safety */}
      <div className="glass-card rounded-lg p-4 shadow-card">
        <div className="flex items-center space-x-3 mb-3">
          <Shield className="text-text-secondary" size={20} />
          <h4 className="font-semibold text-text-primary">Legal & Safety</h4>
        </div>
        <div className="space-y-2 text-sm">
          <button className="block text-text-secondary hover:text-text-primary">
            Privacy Policy
          </button>
          <button className="block text-text-secondary hover:text-text-primary">
            Terms of Service
          </button>
          <button className="block text-text-secondary hover:text-text-primary">
            Safety Guidelines
          </button>
          <button className="block text-text-secondary hover:text-text-primary">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage