'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaCalendar, FaArrowLeft, FaShare, FaClock, FaBookmark, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa'
import FooterSection from '@/components/sections/FooterSection'

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

export default function BlogPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${params.id}`)
        if (!response.ok) throw new Error('Failed to fetch post')
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error('Error fetching post:', error)
        setError('Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.id])

  const handleShare = async (platform?: string) => {
    const url = window.location.href
    const text = post?.title || 'Check out this blog post'

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      default:
        try {
          await navigator.share({
            title: post?.title,
            text: post?.excerpt,
            url
          })
        } catch (error) {
          console.error('Error sharing:', error)
        }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3b82f6]" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-white/60 mb-8">{error || "The blog post you're looking for doesn't exist."}</p>
        <Link 
          href="/#blog"
          className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-white transition-colors"
        >
          <FaArrowLeft />
          <span>Return to Blog</span>
        </Link>
      </div>
    )
  }

  return (
    <>
      <article className="min-h-screen bg-black">
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[500px]">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={post.image || 'https://via.placeholder.com/1920x1080'}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          </div>

          {/* Content */}
          <div className="relative h-full container px-4">
            <div className="h-full flex flex-col justify-end pb-12">
              {/* Back Button */}
              <Link
                href="/#blog"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors group"
              >
                <FaArrowLeft className="transform group-hover:-translate-x-1 transition-transform" />
                <span>Back to Blog</span>
              </Link>

              {/* Category & Date */}
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-2 bg-[#3b82f6] rounded-full text-white text-sm font-medium">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-white/60">
                  <FaCalendar className="text-[#3b82f6]" />
                  <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                </div>
              </div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl"
              >
                {post.title}
              </motion.h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Actions Bar */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center gap-2 transition-colors ${
                    isBookmarked ? 'text-[#3b82f6]' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <FaBookmark />
                  <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
                <div className="flex items-center gap-2">
                  <FaClock className="text-[#3b82f6]" />
                  <span className="text-white/60">5 min read</span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 text-white/60 hover:text-[#1DA1F2] transition-colors"
                >
                  <FaTwitter />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 text-white/60 hover:text-[#0A66C2] transition-colors"
                >
                  <FaLinkedin />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 text-white/60 hover:text-[#1877F2] transition-colors"
                >
                  <FaFacebook />
                </button>
                <button
                  onClick={() => handleShare()}
                  className="p-2 text-white/60 hover:text-white transition-colors"
                >
                  <FaShare />
                </button>
              </div>
            </div>

            {/* Blog Content */}
            <div className="prose prose-invert max-w-none">
              {/* Excerpt */}
              <div className="text-xl text-white/80 mb-8 leading-relaxed">
                {post.excerpt}
              </div>

              {/* Main Content */}
              <div 
                className="text-white/80 space-y-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <span className="text-white/60">Tags:</span>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/80 hover:bg-white/10 transition-colors cursor-pointer">
                    {post.category}
                  </span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/80 hover:bg-white/10 transition-colors cursor-pointer">
                    Worship
                  </span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/80 hover:bg-white/10 transition-colors cursor-pointer">
                    Music
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <FooterSection />
    </>
  )
} 