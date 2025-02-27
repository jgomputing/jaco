'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaEye, FaClock, FaTag, FaExclamationTriangle } from 'react-icons/fa'
import Button from '@/components/admin/Button'
import Image from 'next/image'
import Toast from '@/components/admin/Toast'
import { formatDate } from '@/lib/utils'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  status: string
  createdAt: Date
  updatedAt: Date
}

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 border border-white/10"
      >
        <div className="flex items-center gap-3 text-red-500 mb-4">
          <FaExclamationTriangle className="text-2xl" />
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-white/60 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function BlogPosts() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    postId: string | null;
  }>({
    isOpen: false,
    postId: null
  })

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog')
      if (!response.ok) throw new Error('Failed to fetch posts')
      const data = await response.json()
      console.log('Fetched posts:', data);
      setPosts(data)
    } catch (error) {
      setError('Failed to load blog posts')
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete post')
      
      setToast({ message: 'Post deleted successfully!', type: 'success' })
      fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      setToast({ message: 'Failed to delete post', type: 'error' })
    } finally {
      setConfirmDialog({ isOpen: false, postId: null })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3b82f6]" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button
          onClick={() => router.push('/admin/blog/create')}
          icon={FaPlus}
        >
          Create New Post
        </Button>
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

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-white/5 rounded w-1/4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-white/5 rounded"></div>
                  <div className="h-4 bg-white/5 rounded"></div>
                  <div className="h-4 bg-white/5 rounded"></div>
                </div>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <FaPlus className="text-4xl text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No Posts Yet</h3>
              <p className="text-white/60 mb-6">Create your first blog post to get started</p>
              <Button
                onClick={() => router.push('/admin/blog/create')}
                icon={FaPlus}
              >
                Create New Post
              </Button>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white/60">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-white/60">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {posts.map((post) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-white line-clamp-1">{post.title}</div>
                          <div className="text-sm text-white/40 line-clamp-1">{post.excerpt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.status === 'Published' 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">
                      {post.createdAt ? formatDate(new Date(post.createdAt).toISOString()) : 'No Date Available'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={FaEdit}
                          onClick={() => router.push(`/admin/blog/edit/${post.id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon={FaTrash}
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              postId: post.id
                            });
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Custom Confirm Dialog */}
      <AnimatePresence>
        {confirmDialog.isOpen && (
          <ConfirmDialog
            isOpen={confirmDialog.isOpen}
            title="Delete Post"
            message="This action cannot be undone. Are you sure you want to delete this post?"
            onConfirm={() => {
              if (confirmDialog.postId) {
                handleDelete(confirmDialog.postId);
              }
            }}
            onCancel={() => setConfirmDialog({ isOpen: false, postId: null })}
          />
        )}
      </AnimatePresence>

      {/* Toast Notification - Fixed Position */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 