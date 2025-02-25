'use client'

import React from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  icon?: IconType
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  loading?: boolean
  loadingText?: string
}

const variantStyles = {
  primary: 'bg-[#3b82f6] hover:bg-[#2563eb] text-white',
  secondary: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20',
  danger: 'bg-red-500 hover:bg-red-600 text-white'
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  loading = false,
  loadingText
}: ButtonProps) {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      await onClick(e)
    }
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 
        rounded-xl font-medium transition-all duration-200
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {Icon && !loading && <Icon className={size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'} />}
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          {loadingText || children}
        </>
      ) : (
        children
      )}
    </button>
  )
} 