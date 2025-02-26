'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { FaImage, FaSave, FaTimes } from 'react-icons/fa'
import Button from '@/components/admin/Button'
import Toast from '@/components/admin/Toast'

const QuillEditor = dynamic(() => import('@/components/admin/QuillEditor'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-white/5 animate-pulse rounded-xl" />
})

export default function CreateBlogPost() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    status: 'Draft'
  })
  const [imagePreview, setImagePreview] = useState('')

  const handleFileUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      return data.url
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const url = await handleFileUpload(file)
      setFormData(prev => ({ ...prev, image: url }))
      setImagePreview(URL.createObjectURL(file))
    } catch (error) {
      setToast({ message: 'Failed to upload image', type: 'error' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to create post')

      setToast({ message: 'Blog post created successfully!', type: 'success' })
      setTimeout(() => {
        router.push('/admin/blog')
      }, 1000)
    } catch (error) {
      console.error('Error creating post:', error)
      setToast({ message: 'Failed to create blog post', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Create New Blog Post</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              icon={FaTimes}
              onClick={() => router.back()}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              loadingText="Creating..."
              className="w-full"
            >
              Create Post
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-white/80">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent text-base"
                placeholder="Enter blog title"
                required
              />
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label htmlFor="excerpt" className="block text-sm font-medium text-white/80">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent text-base resize-none h-24"
                placeholder="Enter a brief excerpt"
                required
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium text-white/80">
                Content
              </label>
              <style jsx global>{`
                .ql-toolbar {
                  background: rgba(255, 255, 255, 0.1) !important;
                  border-color: rgba(255, 255, 255, 0.2) !important;
                  border-top-left-radius: 12px !important;
                  border-top-right-radius: 12px !important;
                }
                .ql-toolbar .ql-stroke {
                  stroke: rgba(255, 255, 255, 0.8) !important;
                }
                .ql-toolbar .ql-fill {
                  fill: rgba(255, 255, 255, 0.8) !important;
                }
                .ql-toolbar .ql-picker {
                  color: rgba(255, 255, 255, 0.8) !important;
                }
                .ql-toolbar .ql-picker-options {
                  background-color: #1f2937 !important;
                  border-color: rgba(255, 255, 255, 0.2) !important;
                }
                .ql-container {
                  background: rgba(255, 255, 255, 0.1) !important;
                  border-color: rgba(255, 255, 255, 0.2) !important;
                  border-bottom-left-radius: 12px !important;
                  border-bottom-right-radius: 12px !important;
                  font-size: 16px !important;
                }
                .ql-editor {
                  color: white !important;
                  min-height: 200px !important;
                }
                .ql-editor.ql-blank::before {
                  color: rgba(255, 255, 255, 0.4) !important;
                  font-style: normal !important;
                }
                .ql-editor * {
                  color: white !important;
                }
                .ql-snow * {
                  color: white !important;
                }
              `}</style>
              <div className="prose-editor">
                <QuillEditor
                  value={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Featured Image
              </label>
              <div className="relative aspect-video bg-white/5 rounded-xl overflow-hidden border-2 border-dashed border-white/20 hover:border-white/40 transition-colors">
                {imagePreview ? (
                  <div className="relative h-full group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, image: '' }))
                          setImagePreview('')
                        }}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                    <FaImage className="text-3xl text-white/40 mb-2" />
                    <span className="text-sm text-white/60">Click to upload image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-white/80">
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent text-base"
                required
              >
                <option value="" disabled className="bg-gray-800 text-white">Select a category</option>
                <option value="Worship" className="bg-gray-800 text-white">Worship</option>
                <option value="Music" className="bg-gray-800 text-white">Music</option>
                <option value="Events" className="bg-gray-800 text-white">Events</option>
                <option value="Ministry" className="bg-gray-800 text-white">Ministry</option>
                <option value="Personal" className="bg-gray-800 text-white">Personal</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-white/80">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent text-base"
                required
              >
                <option value="Draft" className="bg-gray-800 text-white">Draft</option>
                <option value="Published" className="bg-gray-800 text-white">Published</option>
              </select>
            </div>
          </div>
        </div>
      </form>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
} 