'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
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
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white hover:from-[#2563eb] hover:to-[#1d4ed8] shadow-lg hover:shadow-xl hover:shadow-blue-500/20',
    secondary: 'bg-white text-[#3b82f6] hover:bg-blue-50 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white'
  }
  
  const sizeStyles = {
    sm: 'px-3 sm:px-4 py-2 text-xs sm:text-sm gap-1.5',
    md: 'px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base gap-2',
    lg: 'px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg gap-2.5'
  }

  return (
    <motion.button 
      onClick={onClick}
      type={type}
      disabled={disabled}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="relative">{icon}</span>}
      {children}
    </motion.button>
  )
} 