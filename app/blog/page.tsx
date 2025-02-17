'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendar, FaUser, FaTag, FaHeart, FaComment, FaShare, FaSearch, FaArrowRight } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

// Blog Categories
const BLOG_CATEGORIES = [
  'All Posts',
  'Worship',
  'Ministry',
  'Testimonies',
  'Events',
  'Behind the Scenes'
]

// Sample Blog Posts
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Power of Worship in Modern Times",
    excerpt: "Exploring how worship music continues to transform lives in our digital age...",
    content: "Full blog post content here...",
    category: "Worship",
    author: "JACO",
    date: "Jan 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=85",
    likes: 128,
    comments: 23,
    featured: true,
    tags: ['worship', 'music', 'faith']
  },
  {
    id: 2,
    title: "Behind the Scenes: Creating Gospel Music",
    excerpt: "A glimpse into the creative process of writing and producing gospel music...",
    content: "Full blog post content here...",
    category: "Behind the Scenes",
    author: "JACO",
    date: "Jan 10, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&q=85",
    likes: 95,
    comments: 15,
    tags: ['production', 'music', 'creativity']
  },
  {
    id: 3,
    title: "Ministry Through Music: A Journey of Faith",
    excerpt: "Reflecting on the impact of music ministry in spreading God's message...",
    content: "Full blog post content here...",
    category: "Ministry",
    author: "JACO",
    date: "Jan 5, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=85",
    likes: 156,
    comments: 28,
    tags: ['ministry', 'faith', 'journey']
  }
]

// Featured Post Component
const FeaturedPost = ({ post }: { post: typeof BLOG_POSTS[0] }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="relative h-[600px] rounded-2xl overflow-hidden mb-16 group"
  >
    <Image
      src={post.image}
      alt={post.title}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-105"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
    
    <div className="absolute inset-0 flex items-end p-12">
      <div className="max-w-3xl">
        <div className="flex items-center gap-4 mb-4">
          <span className="px-4 py-1 bg-[#3b82f6] rounded-full text-sm font-medium text-white">
            Featured
          </span>
          <span className="text-white/60 text-sm flex items-center gap-2">
            <FaCalendar className="text-[#3b82f6]" /> {post.date}
          </span>
          <span className="text-white/60 text-sm flex items-center gap-2">
            <FaUser className="text-[#3b82f6]" /> {post.author}
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {post.title}
        </h2>
        <p className="text-xl text-white/80 mb-8">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-8">
          <Link 
            href={`/blog/${post.id}`}
            className="inline-flex items-center gap-2 text-white font-medium hover:text-[#3b82f6] transition-colors"
          >
            Read More <FaArrowRight />
          </Link>
          <div className="flex items-center gap-4">
            <button className="text-white/60 hover:text-[#3b82f6] transition-colors flex items-center gap-2">
              <FaHeart /> {post.likes}
            </button>
            <button className="text-white/60 hover:text-[#3b82f6] transition-colors flex items-center gap-2">
              <FaComment /> {post.comments}
            </button>
            <button className="text-white/60 hover:text-[#3b82f6] transition-colors">
              <FaShare />
            </button>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)

// Blog Card Component
const BlogCard = ({ post }: { post: typeof BLOG_POSTS[0] }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden group"
  >
    <div className="aspect-[16/10] relative overflow-hidden">
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-[#3b82f6] rounded-full text-sm font-medium text-white">
          {post.category}
        </span>
      </div>
    </div>

    <div className="p-6">
      <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
        <span className="flex items-center gap-2">
          <FaCalendar className="text-[#3b82f6]" /> {post.date}
        </span>
        <span className="flex items-center gap-2">
          <FaUser className="text-[#3b82f6]" /> {post.author}
        </span>
        <span>{post.readTime}</span>
      </div>

      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#3b82f6] transition-colors">
        {post.title}
      </h3>
      <p className="text-white/60 mb-6">
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {post.tags.map(tag => (
            <span 
              key={tag}
              className="px-2 py-1 bg-white/10 rounded-full text-xs font-medium text-white/60"
            >
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white/60 hover:text-[#3b82f6] transition-colors flex items-center gap-2">
            <FaHeart /> {post.likes}
          </button>
          <button className="text-white/60 hover:text-[#3b82f6] transition-colors flex items-center gap-2">
            <FaComment /> {post.comments}
          </button>
        </div>
      </div>
    </div>
  </motion.article>
)

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All Posts')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const featuredPost = BLOG_POSTS.find(post => post.featured)
  const filteredPosts = BLOG_POSTS.filter(post => 
    (activeCategory === 'All Posts' || post.category === activeCategory) &&
    (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-8 lg:px-16 2xl:px-24">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Blog & Articles
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Insights, stories, and reflections on worship, ministry, and the journey of faith through music.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && <FeaturedPost post={featuredPost} />}

        {/* Search and Filters */}
        <div className="mb-12 space-y-8">
          {/* Search Bar */}
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm rounded-full text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition-all duration-300"
            />
            <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/40" />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-4">
            {BLOG_CATEGORIES.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#3b82f6] text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {isLoading ? (
              // Loading Skeleton
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-[16/10] bg-white/10" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-white/10 rounded-full w-3/4" />
                    <div className="h-4 bg-white/10 rounded-full w-1/2" />
                    <div className="h-20 bg-white/10 rounded-lg" />
                  </div>
                </div>
              ))
            ) : (
              filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
} 