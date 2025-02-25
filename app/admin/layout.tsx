'use client'

import AuthProvider from '@/components/admin/AuthProvider'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AuthProvider>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </AuthProvider>
    </div>
  )
} 