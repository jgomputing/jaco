import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export default function Card({
  children,
  className = '',
  hover = true,
  onClick
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : {}}
      onClick={onClick}
      className={`bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 
        ${hover ? 'hover:bg-white/10 hover:border-white/20 hover:shadow-lg' : ''} 
        transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  )
} 