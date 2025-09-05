import React from 'react'
import { Share } from 'lucide-react'

const ShareButton = ({ variant = 'icon', className = '', onClick }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Know Your Rights Buddy',
        text: 'Important legal rights information',
        url: window.location.href
      }).catch(console.error)
    } else {
      // Fallback for browsers without Web Share API
      alert('Share functionality would open here (demo)')
    }
    
    if (onClick) onClick()
  }

  if (variant === 'text') {
    return (
      <button
        onClick={handleShare}
        className={`bg-accent text-white py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center justify-center space-x-2 ${className}`}
      >
        <Share size={16} />
        <span>Share</span>
      </button>
    )
  }

  return (
    <button
      onClick={handleShare}
      className={`p-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors ${className}`}
      title="Share"
    >
      <Share className="text-accent" size={16} />
    </button>
  )
}

export default ShareButton