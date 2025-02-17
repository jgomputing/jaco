import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JACO Store | Gospel Music, Merchandise & Resources',
  description: 'Shop our collection of gospel music, merchandise, and resources. Find albums, t-shirts, books, and more to support our ministry.',
  keywords: 'gospel store, christian music, worship albums, gospel merchandise, christian resources',
}

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {children}
    </div>
  )
} 