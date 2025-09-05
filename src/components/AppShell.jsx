import React from 'react'
import { Home, Shield, MessageSquare, Video, User } from 'lucide-react'

const AppShell = ({ children, currentView, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'rights', icon: Shield, label: 'Rights' },
    { id: 'scripts', icon: MessageSquare, label: 'Scripts' },
    { id: 'record', icon: Video, label: 'Record' },
    { id: 'profile', icon: User, label: 'Profile' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <h1 className="text-xl font-bold text-white">Know Your Rights Buddy</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex justify-around py-2">
            {navItems.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  currentView === id
                    ? 'text-accent bg-white/20'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AppShell