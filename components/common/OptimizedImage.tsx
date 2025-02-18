'use client'

import React from 'react'
import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  fill?: boolean
  width?: number
  height?: number
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '100vw',
  quality = 85,
  fill = false,
  width,
  height
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      priority={priority}
      sizes={sizes}
      quality={quality}
      fill={fill}
      width={width}
      height={height}
    />
  )
} 