import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const ScriptPhrase = ({ text, variant = 'display' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  if (variant === 'display') {
    return (
      <div className="glass-card rounded-lg p-4 shadow-card">
        <p className="text-text-primary">{text}</p>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-lg p-4 shadow-card group hover:bg-white/20 transition-colors">
      <div className="flex items-start justify-between space-x-3">
        <p className="text-text-primary flex-1">{text}</p>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="text-accent" size={16} />
          ) : (
            <Copy className="text-primary" size={16} />
          )}
        </button>
      </div>
    </div>
  )
}

export default ScriptPhrase