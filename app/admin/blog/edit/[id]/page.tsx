'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaSave, FaImage } from 'react-icons/fa'
import Image from 'next/image'
import Button from '@/components/admin/Button'
import Toast from '@/components/admin/Toast'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  status: string
}

export default function EditBlogPost({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<BlogPost | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetchPost()
  }, [])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${params.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch post')
      }
      const data = await response.json()
      setFormData(data)
    } catch (error) {
      console.error('Error fetching post:', error)
      setError('Failed to fetch post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    setSaving(true)

    try {
      const response = await fetch(`/api/blog/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to update post')
      }

      setToast({ message: 'Post updated successfully!', type: 'success' })
      setTimeout(() => {
        router.push('/admin/blog')
      }, 1000)
    } catch (error) {
      console.error('Error updating post:', error)
      setError('Failed to update post. Please try again.')
      setToast({ message: 'Failed to update post', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev!, [name]: value }))
  }

  const handleEditorChange = (content: string) => {
    if (!formData) return
    setFormData((prev) => ({ ...prev!, content }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      setFormData(prev => ({ ...prev!, image: data.url }))
    } catch (error) {
      console.error('Error uploading image:', error)
      setError('Failed to upload image. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-500">Post not found</h1>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Edit Blog Post</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              icon={FaTimes}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              loading={saving}
              loadingText="Saving..."
              icon={FaSave}
            >
              Save Changes
            </Button>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-500"
          >
            {error}
          </motion.div>
        )}

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </AnimatePresence>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-white/60">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent text-white placeholder-white/40 text-base"
                placeholder="Enter post title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="excerpt" className="block text-sm font-medium text-white/60">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                required
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent text-white placeholder-white/40 text-base resize-none"
                placeholder="Brief description of the post"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/60">
                Content <span className="text-red-500">*</span>
              </label>
              <style jsx global>{`
                .ql-toolbar {
                  background: rgba(255, 255, 255, 0.1) !important;
                  border-color: rgba(255, 255, 255, 0.2) !important;
                  border-top-left-radius: 12px !important;
                  border-top-right-radius: 12px !important;
                }
                .ql-toolbar .ql-stroke {
                  stroke: rgba(255, 255, 255, 0.6) !important;
                }
                .ql-toolbar .ql-fill {
                  fill: rgba(255, 255, 255, 0.6) !important;
                }
                .ql-toolbar .ql-picker {
                  color: rgba(255, 255, 255, 0.6) !important;
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
              `}</style>
              <div className="prose prose-invert max-w-none">
                <ReactQuill
                  value={formData.content}
                  onChange={handleEditorChange}
                  theme="snow"
                  className="rounded-xl text-white"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'image'],
                      ['clean']
                    ]
                  }}
                  placeholder="Write your post content here..."
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h2 className="text-lg font-semibold mb-4">Post Settings</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium text-white/60">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent text-white text-base"
                  >
                    <option value="" className="bg-gray-800">Select category</option>
                    <option value="Worship" className="bg-gray-800">Worship</option>
                    <option value="Ministry" className="bg-gray-800">Ministry</option>
                    <option value="Events" className="bg-gray-800">Events</option>
                    <option value="News" className="bg-gray-800">News</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="status" className="block text-sm font-medium text-white/60">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent text-white text-base"
                  >
                    <option value="Draft" className="bg-gray-800">Draft</option>
                    <option value="Published" className="bg-gray-800">Published</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="image" className="block text-sm font-medium text-white/60">
                    Featured Image
                  </label>
                  <div className="relative">
                    {formData.image ? (
                      <div className="relative aspect-video rounded-xl overflow-hidden">
                        <Image
                          src={formData.image}
                          alt={formData.title}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => setFormData(prev => ({ ...prev!, image: '' }))}
                          className="absolute top-2 right-2 p-1 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
                        >
                          <FaTimes className="text-white" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full aspect-video bg-white/5 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-[#3b82f6] transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FaImage className="text-2xl text-white/40 mb-2" />
                          <p className="text-sm text-white/60">Click to upload image</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 