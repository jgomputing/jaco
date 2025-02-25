import './globals.css'
import { Titillium_Web } from 'next/font/google'
import { metadata } from './metadata'

const titilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  display: 'swap',
  variable: '--font-titillium'
})

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={titilliumWeb.variable}>
      <body className="bg-[#0f1219] text-white font-titillium">
        {children}
      </body>
    </html>
  )
} 