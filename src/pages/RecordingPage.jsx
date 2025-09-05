import React, { useState } from 'react'
import { useApp } from '../contexts/AppContext'
import RecordButton from '../components/RecordButton'
import ShareButton from '../components/ShareButton'
import CalloutCard from '../components/CalloutCard'
import { ArrowLeft, MapPin, Clock, FileText, Play, Share } from 'lucide-react'

const RecordingPage = ({ onNavigate }) => {
  const { isRecording, recordings, startRecording, stopRecording } = useApp()
  const [selectedRecording, setSelectedRecording] = useState(null)

  const handleRecordToggle = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

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
          <h2 className="text-2xl font-bold">Incident Recording</h2>
          <p className="text-white/80">Document interactions safely and securely</p>
        </div>
      </div>

      {/* Recording Controls */}
      <div className="glass-card rounded-lg p-6 shadow-card text-center">
        <div className="mb-6">
          <RecordButton 
            variant={isRecording ? "floating" : "primary"}
            onClick={handleRecordToggle}
            isRecording={isRecording}
          />
        </div>
        
        {isRecording && (
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              <span className="font-medium">Recording in Progress</span>
            </div>
            <p className="text-sm text-text-secondary">
              Keep your device visible and continue recording until the interaction ends
            </p>
          </div>
        )}

        {!isRecording && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-text-primary">
              Ready to Record
            </h3>
            <p className="text-sm text-text-secondary">
              Tap the record button to start documenting your interaction
            </p>
          </div>
        )}
      </div>

      {/* Safety Guidelines */}
      <CalloutCard variant="warning">
        <h4 className="font-semibold mb-2">Recording Safety Guidelines</h4>
        <ul className="text-sm space-y-1">
          <li>• Keep your device visible and announce that you're recording</li>
          <li>• Don't interfere with police duties</li>
          <li>• Maintain a safe distance</li>
          <li>• Stay calm and follow lawful orders</li>
        </ul>
      </CalloutCard>

      {/* Previous Recordings */}
      {recordings.length > 0 && (
        <div className="glass-card rounded-lg p-6 shadow-card">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Previous Recordings
          </h3>
          <div className="space-y-3">
            {recordings.map((recording) => (
              <div
                key={recording.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedRecording(recording)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Play className="text-primary" size={20} />
                    <div>
                      <div className="font-medium text-text-primary">
                        {formatDate(recording.timestamp)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-text-secondary">
                        <span className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{recording.duration}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{recording.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <ShareButton variant="icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate('scripts')}
          className="bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
        >
          <FileText size={20} />
          <span>View Scripts</span>
        </button>
        <button
          onClick={() => onNavigate('rights')}
          className="bg-accent text-white py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors flex items-center justify-center space-x-2"
        >
          <FileText size={20} />
          <span>Know Your Rights</span>
        </button>
      </div>

      {/* Recording Detail Modal */}
      {selectedRecording && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-modal">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recording Details</h3>
              <button
                onClick={() => setSelectedRecording(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date & Time
                </label>
                <p className="text-text-primary">{formatDate(selectedRecording.timestamp)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <p className="text-text-primary">{selectedRecording.duration}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <p className="text-text-primary">{selectedRecording.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows="3"
                  placeholder="Add notes about this incident..."
                  defaultValue={selectedRecording.notes}
                ></textarea>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 bg-primary text-white py-2 rounded-lg font-medium">
                  Save to Cloud
                </button>
                <ShareButton variant="text" className="flex-1" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecordingPage