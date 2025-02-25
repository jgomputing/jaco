'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMusic, FaSave, FaTimes, FaImage, FaClock, FaCalendar, FaTag, FaExclamationCircle } from 'react-icons/fa'
import Button from '@/components/admin/Button'

export default function CreateMusicTrack() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    releaseDate: '',
    genre: '',
    status: 'Upcoming',
    image: '',
    audioFile: null as File | null
  })
  const [imagePreview, setImagePreview] = useState('')

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    const file = e.dataTransfer.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    
    handleFileUpload(file)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Failed to upload image')

      const data = await res.json()
      setFormData(prev => ({ ...prev, image: data.url }))
      setImagePreview(URL.createObjectURL(file))
    } catch (error) {
      console.error('Error uploading image:', error)
      setError('Failed to upload image')
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    handleFileUpload(file)
  }

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFormData(prev => ({ ...prev, audioFile: file }))
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    if (!formData.title || !formData.duration) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const uploadData = new FormData()
      if (formData.audioFile) {
        uploadData.append('file', formData.audioFile)
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        })

        if (!uploadRes.ok) throw new Error('Failed to upload audio file')
        const { url: audioUrl } = await uploadRes.json()

        const res = await fetch('/api/music', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            audioUrl,
          }),
        })

        if (!res.ok) throw new Error('Failed to create track')
        router.push('/admin/music')
      }
    } catch (error) {
      console.error('Error creating track:', error)
      setError(error instanceof Error ? error.message : 'Failed to create track')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
        >
          Upload New Track
        </motion.h1>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            icon={FaTimes}
            onClick={() => router.push('/admin/music')}
          >
            Cancel
          </Button>
          <Button
            icon={FaSave}
            onClick={handleSubmit}
            disabled={loading}
            loading={loading}
            loadingText="Saving..."
            className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-300"
          >
            Save Track
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400"
          >
            <FaExclamationCircle />
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          <div className="bg-[#1a1f2d] rounded-xl border border-white/10 p-6 shadow-lg transition-all duration-300 hover:border-white/20">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Track Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-[#141922] text-white rounded-lg border border-white/10 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] text-sm h-12 px-4 transition-all duration-300"
                  placeholder="Enter track title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Audio File</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="hidden"
                    id="audio-upload"
                  />
                  <label
                    htmlFor="audio-upload"
                    className="block w-full px-4 py-4 text-sm text-center text-white bg-[#141922] hover:bg-[#1e242f] rounded-lg cursor-pointer transition-all duration-300 border border-white/10 hover:border-white/20"
                  >
                    <FaMusic className="mx-auto mb-2 text-[#3b82f6] text-xl" />
                    {formData.audioFile ? formData.audioFile.name : 'Choose Audio File'}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Track Details */}
          <div className="bg-[#1a1f2d] rounded-xl border border-white/10 overflow-hidden shadow-lg">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-sm font-medium text-white">Track Details</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="inline-flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                  <FaClock className="text-[#3b82f6]" />
                  Duration
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={e => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full bg-[#141922] text-white rounded-lg border border-white/10 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] text-sm h-10 px-4"
                  placeholder="e.g. 4:32"
                />
              </div>

              <div>
                <label className="inline-flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                  <FaTag className="text-[#3b82f6]" />
                  Genre
                </label>
                <select
                  value={formData.genre}
                  onChange={e => setFormData(prev => ({ ...prev, genre: e.target.value }))}
                  className="w-full bg-[#141922] text-white rounded-lg border border-white/10 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] text-sm h-10"
                >
                  <option value="">Select Genre</option>
                  <option value="Gospel">Gospel</option>
                  <option value="Worship">Worship</option>
                  <option value="Praise">Praise</option>
                </select>
              </div>

              <div>
                <label className="inline-flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                  <FaCalendar className="text-[#3b82f6]" />
                  Release Date
                </label>
                <input
                  type="date"
                  value={formData.releaseDate}
                  onChange={e => setFormData(prev => ({ ...prev, releaseDate: e.target.value }))}
                  className="w-full bg-[#141922] text-white rounded-lg border border-white/10 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] text-sm h-10 px-4"
                />
              </div>

              <div>
                <label className="inline-flex items-center gap-2 text-sm font-medium text-white/80 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full bg-[#141922] text-white rounded-lg border border-white/10 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] text-sm h-10"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Released">Released</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-[#1a1f2d] rounded-xl border border-white/10 overflow-hidden shadow-lg">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                <FaImage className="text-[#3b82f6]" />
                Cover Image
              </h3>
            </div>
            <div className="p-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative aspect-square w-full bg-[#141922] rounded-lg overflow-hidden mb-4 group cursor-pointer"
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-sm text-white">Change Image</p>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <FaImage className="text-4xl text-[#3b82f6] mb-3" />
                    <p className="text-sm text-white/60">Drop image here</p>
                    <p className="text-xs text-white/40 mt-1">or click to browse</p>
                  </div>
                )}
                <label
                  htmlFor="image-upload"
                  className="absolute inset-0 cursor-pointer"
                />
              </motion.div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 