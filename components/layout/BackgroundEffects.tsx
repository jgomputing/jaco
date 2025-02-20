'use client'

import React from 'react'

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Top-right orb */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3b82f6] rounded-full opacity-10 blur-3xl animate-pulse" />
      
      {/* Bottom-left orb */}
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl animate-pulse" />
      
      {/* Center orb */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500 rounded-full opacity-5 blur-3xl" />
      
      {/* Additional decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full opacity-5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500 rounded-full opacity-5 blur-3xl animate-pulse" />
    </div>
  )
} 