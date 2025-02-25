'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'spotify' | 'apple' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit'
  disabled?: boolean
  icon?: IconType | React.ReactNode
  fullWidth?: boolean
  loading?: boolean
  loadingText?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  icon: Icon,
  fullWidth = false,
  loading = false,
  loadingText
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-500 rounded-xl relative overflow-hidden group'
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white hover:shadow-lg hover:shadow-[#3b82f6]/25',
    secondary: 'bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 border border-white/10 hover:border-white/20',
    outline: 'border-2 border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white',
    spotify: 'bg-[#1DB954] text-white hover:bg-[#1ed760]',
    apple: 'bg-[#FB233B] text-white hover:bg-[#ff365c]',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  }
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm gap-2',
    md: 'px-4 py-2 gap-2',
    lg: 'px-6 py-3 text-lg gap-3'
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      type={type}
      disabled={disabled || loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
      <div className="relative flex items-center gap-2">
        {Icon && !loading && (
          typeof Icon === 'function' ? (
            <Icon className={size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'} />
          ) : (
            Icon
          )
        )}
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            {loadingText || children}
          </>
        ) : (
          children
        )}
      </div>
    </motion.button>
  )
} 