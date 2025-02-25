'use client'

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaImage, FaSave, FaTimes, FaNewspaper, FaTag, FaClock, FaExclamationCircle, FaCloudUploadAlt } from 'react-icons/fa'
import Button from '@/components/admin/Button'
import QuillEditor from '@/components/admin/QuillEditor'

export default function CreateBlogPost() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    status: 'Draft'
  })
  const [imagePreview, setImagePreview] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

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
    setIsUploading(true)
    setError('')

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
    } finally {
      setIsUploading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    handleFileUpload(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to create blog post')
      router.push('/admin/blog')
    } catch (error) {
      console.error('Error creating post:', error)
      setError(error instanceof Error ? error.message : 'Failed to create blog post')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
        >
          Create New Post
        </motion.h1>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            icon={FaTimes}
            onClick={() => router.push('/admin/blog')}
            className="hover:bg-white/10 transition-colors"
          >
            Cancel
          </Button>
          <Button
            icon={FaSave}
            onClick={(e: React.FormEvent) => handleSubmit(e)}
            disabled={loading}
            className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-300"
          >
            {loading ? 'Creating...' : 'Create Post'}
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

      {/* Post Details Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div>
          <label className="inline-flex items-center gap-2 text-sm font-medium text-white/80 mb-3">
            <FaTag className="text-[#3b82f6]" />
            Category
          </label>
          <select
            value={formData.category}
            onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full bg-[#1a1f2d] text-white rounded-lg border border-white/10 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] text-sm h-12 transition-all duration-300 hover:border-white/20"
          >
            <option value="">Select Category</option>
            <option value="News">News</option>
            <option value="Events">Events</option>
            <option value="Music">Music</option>
            <option value="Ministry">Ministry</option>
          </select>
        </div>

        <div>
          <label className="inline-flex items-center gap-2 text-sm font-medium text-white/80 mb-3">
            <FaClock className="text-[#3b82f6]" />
            Status
          </label>
          <select
            value={formData.status}
            onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
            className="w-full bg-[#1a1f2d] text-white rounded-lg border border-white/10 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] text-sm h-12 transition-all duration-300 hover:border-white/20"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <div>
          <label className="inline-flex items-center gap-2 text-sm font-medium text-white/80 mb-3">
            <FaNewspaper className="text-[#3b82f6]" />
            Excerpt
          </label>
          <textarea
            rows={1}
            placeholder="Write a brief description..."
            value={formData.excerpt}
            onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            className="w-full bg-[#1a1f2d] text-white rounded-lg border border-white/10 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] placeholder-white/40 text-sm px-4 py-3.5 transition-all duration-300 resize-none hover:border-white/20"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-8">
        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-2 space-y-6"
        >
          <div className="bg-[#1a1f2d] rounded-xl border border-white/10 p-6 shadow-lg transition-all duration-300 hover:border-white/20">
            <input
              type="text"
              placeholder="Post Title"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-transparent text-2xl font-medium text-white border-none focus:outline-none focus:ring-0 placeholder-white/40"
            />
          </div>

          <div className="bg-[#1a1f2d] rounded-xl border border-white/10 p-6 shadow-lg transition-all duration-300 hover:border-white/20">
            <QuillEditor
              value={formData.content}
              onChange={content => setFormData(prev => ({ ...prev, content }))}
            />
          </div>
        </motion.div>

        {/* Sidebar - Image Upload Only */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-[#1a1f2d] rounded-xl border border-white/10 overflow-hidden shadow-lg transition-all duration-300 hover:border-white/20">
            <div className="p-4 border-b border-white/10">
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                <FaImage className="text-[#3b82f6]" />
                Featured Image
              </h3>
            </div>
            <div className="p-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative aspect-video w-full bg-[#141922] rounded-lg overflow-hidden mb-4 group cursor-pointer"
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-sm text-white flex items-center gap-2">
                        <FaCloudUploadAlt className="text-xl" />
                        Drop new image here or click to change
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <FaCloudUploadAlt className="text-5xl text-[#3b82f6] mb-3" />
                    <p className="text-sm text-white/60">Drag & drop your image here</p>
                    <p className="text-xs text-white/40 mt-1">or</p>
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
              <label
                htmlFor="image-upload"
                className="block w-full px-4 py-3 text-sm text-center text-white bg-[#141922] hover:bg-[#1e242f] rounded-lg cursor-pointer transition-all duration-300 active:scale-95"
              >
                Choose Image
              </label>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 