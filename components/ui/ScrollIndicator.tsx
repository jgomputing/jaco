'use client'

import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white/60 text-sm font-medium"
    >
      <div className="absolute inset-1 rounded-full border-2 border-[#3b82f6] border-r-transparent rotate-45" />
      <span className="rotate-45">↑</span>
    </motion.div>
  )
} 