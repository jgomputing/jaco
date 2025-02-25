'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaCalendar, FaEye } from 'react-icons/fa'

// This would typically come from your API or database
const recentPosts = [
  {
    id: 1,
    title: "Connecting Worship: My Musical Journey with Jaco Osijaye",
    date: "Feb 16, 2024",
    image: "/images/jaco_02.jpg",
    views: "1.2K"
  },
  {
    id: 2,
    title: "Gospel Music Events in 2025: A Season of Praise",
    date: "Feb 15, 2024",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=85&w=2000",
    views: "856"
  },
  {
    id: 3,
    title: "The Power of Collaboration: Gospel Meets Global",
    date: "Feb 14, 2024",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=85&w=2000",
    views: "723"
  }
]

export default function RecentPosts() {
  return (
    <div className="space-y-4">
      {recentPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/admin/blog/${post.id}`} className="group">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300">
              {/* Thumbnail */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate group-hover:text-[#3b82f6] transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1.5 text-white/40 text-sm">
                    <FaCalendar className="text-[#3b82f6]" size={12} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/40 text-sm">
                    <FaEye className="text-[#3b82f6]" size={12} />
                    <span>{post.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
} 