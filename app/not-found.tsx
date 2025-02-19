'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaHome, FaArrowLeft } from 'react-icons/fa'

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#3b82f6] rounded-full opacity-[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-[0.03] blur-3xl" />
      </div>

      <div className="container px-4 py-20 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-8xl sm:text-9xl font-bold text-white mb-4 relative">
              <span className="absolute -inset-2 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] opacity-20 blur-2xl rounded-full" />
              <span className="relative">404</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Oops! The page you're looking for seems to have gone on a spiritual journey.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white rounded-xl hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex items-center gap-2">
                <FaHome className="text-lg" />
                Return Home
              </span>
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all duration-500"
            >
              <FaArrowLeft className="text-lg" />
              Go Back
            </button>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3b82f6] rounded-full opacity-[0.02] blur-3xl" />
          </div>
        </div>
      </div>
    </main>
  )
} 