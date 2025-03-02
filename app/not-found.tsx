'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaHome } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-300 mb-6">Page Not Found</h2>
          <p className="text-gray-400 mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white 
              bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <FaHome className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
} 