import './globals.css'
import { metadata } from './metadata'
import ClientLayout from '@/components/layout/ClientLayout'

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
} 