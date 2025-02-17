'use client'

import React, { useState } from 'react'

interface SuggestModalProps {
  currentVideo: string
  onClose: () => void
}

export default function SuggestModal({ currentVideo, onClose }: SuggestModalProps) {
  const [suggestion, setSuggestion] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle the suggestion submission here
    console.log('Suggestion submitted:', suggestion)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Suggest a Better Video</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Video
            </label>
            <input
              type="text"
              value={currentVideo}
              disabled
              className="w-full px-3 py-2 bg-gray-100 rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Suggestion
            </label>
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Share a YouTube link or describe the video you'd like to suggest..."
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Suggestion
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 