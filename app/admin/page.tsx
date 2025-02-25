'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaNewspaper, FaMusic, FaCalendarAlt, FaEnvelope } from 'react-icons/fa'
import DashboardCard from '@/components/admin/DashboardCard'
import RecentPosts from '@/components/admin/RecentPosts'

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Blog Posts',
      value: '6',
      icon: FaNewspaper,
      change: '+2 this week',
      href: '/admin/blog'
    },
    {
      title: 'Music Tracks',
      value: '3',
      icon: FaMusic,
      change: '+1 this month',
      href: '/admin/music'
    },
    {
      title: 'Upcoming Events',
      value: '4',
      icon: FaCalendarAlt,
      change: '2 this week',
      href: '/admin/events'
    },
    {
      title: 'Messages',
      value: '12',
      icon: FaEnvelope,
      change: '5 unread',
      href: '/admin/messages'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] rounded-xl text-white transition-all">
            Create New Post
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <DashboardCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Recent Blog Posts</h2>
          <RecentPosts />
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-left flex items-center gap-4">
              <FaNewspaper className="text-[#3b82f6]" />
              <span>Write New Blog Post</span>
            </button>
            <button className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-left flex items-center gap-4">
              <FaMusic className="text-[#3b82f6]" />
              <span>Upload New Track</span>
            </button>
            <button className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-left flex items-center gap-4">
              <FaCalendarAlt className="text-[#3b82f6]" />
              <span>Schedule Event</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 