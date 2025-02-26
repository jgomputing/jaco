import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheck, FaExclamation, FaTimes } from 'react-icons/fa'

export interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
  duration?: number
}

export default function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const variants = {
    initial: { opacity: 0, y: 50, scale: 0.3 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
  }

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium shadow-lg ${
        type === 'success' 
          ? 'bg-green-500 text-white' 
          : 'bg-red-500 text-white'
      }`}
    >
      {type === 'success' ? (
        <FaCheck className="text-white" />
      ) : (
        <FaExclamation className="text-white" />
      )}
      <span>{message}</span>
      <button 
        onClick={onClose}
        className="ml-2 hover:opacity-80 transition-opacity"
      >
        <FaTimes className="text-white" />
      </button>
    </motion.div>
  )
} 