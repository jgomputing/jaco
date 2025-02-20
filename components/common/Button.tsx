'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'spotify' | 'apple'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  icon?: React.ReactNode
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  icon
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-500 rounded relative overflow-hidden group'
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white hover:shadow-lg hover:shadow-[#3b82f6]/25',
    secondary: 'bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 border border-white/10 hover:border-white/20',
    outline: 'border-2 border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white',
    spotify: 'bg-[#1DB954] text-white hover:bg-[#1ed760]',
    apple: 'bg-[#FB233B] text-white hover:bg-[#ff365c]'
  }
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm gap-2',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-4 py-2 text-sm gap-2'
  }

  return (
    <motion.button 
      onClick={onClick}
      type={type}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
      <div className="relative flex items-center gap-inherit">
        {icon && (
          <div className={`p-1.5 rounded ${variant === 'primary' ? 'bg-white/20' : 'bg-white/10'}`}>
            {icon}
          </div>
        )}
        {children}
      </div>
    </motion.button>
  )
} 