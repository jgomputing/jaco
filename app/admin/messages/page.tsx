'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaTrash, FaReply, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa'
import Button from '@/components/admin/Button'

// This would typically come from your API or database
const MESSAGES = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    subject: "Collaboration Opportunity",
    message: "Hi Jaco, I would love to collaborate with you on an upcoming worship event...",
    date: "Feb 16, 2024",
    read: false
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    subject: "Event Booking Inquiry",
    message: "Hello, I'm interested in booking you for our church's upcoming conference...",
    date: "Feb 15, 2024",
    read: true
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.b@example.com",
    subject: "Music Ministry Question",
    message: "Dear Jaco, I was wondering if you could share some insights about worship leading...",
    date: "Feb 14, 2024",
    read: true
  }
]

export default function Messages() {
  const handleReply = (email: string) => {
    window.location.href = `mailto:${email}`
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      console.log('Delete message:', id)
    }
  }

  const handleToggleRead = (id: number) => {
    console.log('Toggle read status:', id)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Messages</h1>
      </div>

      <div className="grid gap-4">
        {MESSAGES.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transition-colors ${
              !message.read ? 'bg-white/10' : ''
            }`}>
              <div className="p-6">
                <div className="flex items-start justify-between gap-6">
                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-lg font-semibold text-white">
                        {message.name}
                      </h2>
                      <span className="text-white/40 text-sm">
                        {message.email}
                      </span>
                      {!message.read && (
                        <span className="px-2 py-0.5 bg-[#3b82f6] text-white text-xs rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <h3 className="text-[#3b82f6] font-medium mb-2">
                      {message.subject}
                    </h3>
                    <p className="text-white/60 line-clamp-2 mb-4">
                      {message.message}
                    </p>
                    <div className="text-white/40 text-sm">
                      Received on {message.date}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={message.read ? FaEnvelopeOpen : FaEnvelope}
                      onClick={() => handleToggleRead(message.id)}
                    >
                      {message.read ? 'Mark as Unread' : 'Mark as Read'}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={FaReply}
                      onClick={() => handleReply(message.email)}
                    >
                      Reply
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={FaTrash}
                      onClick={() => handleDelete(message.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 