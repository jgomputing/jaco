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
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  icon,
  fullWidth = false
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${fullWidth ? 'btn-full' : ''} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <div className="btn-glow" />
      <div className="btn-content">
        {icon && (
          <div className="btn-icon">
            {icon}
          </div>
        )}
        {children}
      </div>
    </motion.button>
  )
} 