'use client'

import React from 'react'
import Navbar from '@/components/layout/Navbar'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
} 