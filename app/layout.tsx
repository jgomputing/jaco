import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import { Titillium_Web } from 'next/font/google'

const titilliumWeb = Titillium_Web({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-titillium',
})

export const metadata: Metadata = {
  title: 'Jaco Musical',
  description: 'Official website of Jaco Musical',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={titilliumWeb.variable}>
      <body className={titilliumWeb.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
} 