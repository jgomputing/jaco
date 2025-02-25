'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaTrash, FaDownload, FaPlus, FaCopy } from 'react-icons/fa'
import Button from '@/components/admin/Button'

// This would typically come from your API or database
const MEDIA_FILES = [
  {
    id: 1,
    name: "jaco_02.jpg",
    type: "image",
    url: "/images/jaco_02.jpg",
    size: "2.4 MB",
    dimensions: "1920x1080",
    uploadedAt: "Feb 16, 2024"
  },
  {
    id: 2,
    name: "follow-jesus.mp3",
    type: "audio",
    url: "/music/follow-jesus.mp3",
    size: "8.7 MB",
    duration: "4:32",
    uploadedAt: "Feb 15, 2024"
  },
  {
    id: 3,
    name: "worship-night-promo.mp4",
    type: "video",
    url: "/videos/worship-night-promo.mp4",
    size: "24.5 MB",
    duration: "1:30",
    uploadedAt: "Feb 14, 2024"
  }
]

export default function Media() {
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      console.log('Delete file:', id)
    }
  }

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
      .then(() => alert('URL copied to clipboard!'))
      .catch(err => console.error('Failed to copy URL:', err))
  }

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <Button icon={FaPlus}>
          Upload Files
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MEDIA_FILES.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
              {/* Preview */}
              <div className="relative aspect-video w-full bg-black/20">
                {file.type === 'image' ? (
                  <Image
                    src={file.url}
                    alt={file.name}
                    fill
                    className="object-cover"
                  />
                ) : file.type === 'audio' ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                      <i className="fas fa-music text-2xl text-[#3b82f6]" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                      <i className="fas fa-video text-2xl text-[#3b82f6]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-white font-medium mb-1 truncate">
                  {file.name}
                </h3>
                <div className="flex items-center gap-4 text-white/40 text-sm mb-4">
                  <span>{file.size}</span>
                  {file.dimensions && <span>{file.dimensions}</span>}
                  {file.duration && <span>{file.duration}</span>}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={FaCopy}
                    onClick={() => handleCopyUrl(file.url)}
                  >
                    Copy URL
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={FaDownload}
                    onClick={() => handleDownload(file.url, file.name)}
                  >
                    Download
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={FaTrash}
                    onClick={() => handleDelete(file.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 