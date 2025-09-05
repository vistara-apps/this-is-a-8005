import React from 'react'
import { AlertTriangle, Info, CheckCircle } from 'lucide-react'

const CalloutCard = ({ children, variant = 'info' }) => {
  const variants = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: Info,
      iconColor: 'text-blue-600'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: CheckCircle,
      iconColor: 'text-green-600'
    }
  }

  const config = variants[variant]
  const Icon = config.icon

  return (
    <div className={`${config.bg} ${config.border} border rounded-lg p-4 shadow-card`}>
      {children}
    </div>
  )
}

export default CalloutCard