'use client'

import React from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  icon?: IconType
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

const variantStyles = {
  primary: 'bg-[#3b82f6] hover:bg-[#2563eb] text-white',
  secondary: 'bg-white/5 hover:bg-white/10 text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 
        rounded-xl font-medium transition-all duration-200
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {Icon && <Icon className={size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'} />}
      {children}
    </button>
  )
} 