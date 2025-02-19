'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaCalendar, FaArrowRight } from 'react-icons/fa'

const FEATURED_POSTS = [
  {
    id: 1,
    title: "The Journey of Gospel Music Ministry",
    excerpt: "From local church events to international stages, discover how our musical journey has been transforming lives through worship.",
    date: "Feb 15, 2024",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=85",
    category: "Ministry"
  },
  {
    id: 2,
    title: "Behind the Scenes: Making of 'I Cannot Fail'",
    excerpt: "Get an exclusive look into the creative process and spiritual inspiration behind our latest worship anthem.",
    date: "Feb 10, 2024",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=85",
    category: "Music"
  },
  {
    id: 3,
    title: "Worship Community UAE: A Vision for Unity",
    excerpt: "Learn about our mission to unite worshippers across the UAE and create a platform for spiritual growth through music.",
    date: "Feb 5, 2024",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=85",
    category: "Community"
  }
]

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 relative scroll-mt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#3b82f6] rounded-full opacity-[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full opacity-[0.03] blur-3xl" />
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Latest from Our <span className="text-[#3b82f6]">Blog</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Stay updated with our journey, music insights, and ministry updates
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#3b82f6] rounded-full text-white text-sm font-medium">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                    <FaCalendar className="text-[#3b82f6]" />
                    {post.date}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#3b82f6] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-white/60 text-sm mb-4">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-white transition-colors text-sm font-medium group"
                  >
                    Read More 
                    <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => {
              const blogSection = document.getElementById('blog')
              if (blogSection) {
                blogSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white rounded-full hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-300 shadow-lg group"
          >
            View All Posts
            <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
} 