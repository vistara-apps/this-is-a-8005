import React from 'react'
import { Video, Square } from 'lucide-react'

const RecordButton = ({ variant = 'primary', onClick, isRecording = false }) => {
  if (variant === 'floating') {
    return (
      <button
        onClick={onClick}
        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-modal transition-all ${
          isRecording
            ? 'bg-red-600 hover:bg-red-700 animate-pulse'
            : 'bg-accent hover:bg-accent/90'
        }`}
      >
        {isRecording ? (
          <Square className="text-white" size={32} />
        ) : (
          <Video className="text-white" size={32} />
        )}
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`w-16 h-16 rounded-full flex items-center justify-center shadow-card transition-all ${
        isRecording
          ? 'bg-red-600 hover:bg-red-700 animate-pulse'
          : 'bg-accent hover:bg-accent/90'
      }`}
    >
      {isRecording ? (
        <Square className="text-white" size={24} />
      ) : (
        <Video className="text-white" size={24} />
      )}
    </button>
  )
}

export default RecordButton