'use client'

import React from 'react'
import Link from 'next/link'
import { IconType } from 'react-icons'

interface DashboardCardProps {
  title: string
  value: string
  icon: IconType
  change?: string
  href: string
}

export default function DashboardCard({ title, value, icon: Icon, change, href }: DashboardCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/60 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
            {change && (
              <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">
                {change}
              </p>
            )}
          </div>
          <div className="p-3 bg-[#3b82f6]/10 rounded-xl group-hover:bg-[#3b82f6] transition-colors">
            <Icon className="text-xl text-[#3b82f6] group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  )
} 