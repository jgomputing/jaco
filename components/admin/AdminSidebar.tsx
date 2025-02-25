'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FaHome, 
  FaNewspaper, 
  FaMusic, 
  FaCalendarAlt, 
  FaEnvelope, 
  FaCog, 
  FaSignOutAlt,
  FaImage
} from 'react-icons/fa'
import { useAuth } from './AuthProvider'

const menuItems = [
  { icon: FaHome, label: 'Dashboard', href: '/admin' },
  { icon: FaNewspaper, label: 'Blog Posts', href: '/admin/blog' },
  { icon: FaMusic, label: 'Music', href: '/admin/music' },
  { icon: FaCalendarAlt, label: 'Events', href: '/admin/events' },
  { icon: FaEnvelope, label: 'Messages', href: '/admin/messages' },
  { icon: FaImage, label: 'Media', href: '/admin/media' },
  { icon: FaCog, label: 'Settings', href: '/admin/settings' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <aside className="w-64 min-h-screen bg-white/5 backdrop-blur-xl border-r border-white/10">
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white">Admin Panel</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'text-white bg-[#3b82f6]' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`text-lg ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-xl bg-[#3b82f6] -z-10"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  )
} 