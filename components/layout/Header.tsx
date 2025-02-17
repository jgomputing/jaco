import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NAVIGATION_LINKS } from '@/constants'
import { IMAGES } from '@/constants/images'

export default function Header() {
  return (
    <header className="w-full py-4 px-8 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative w-[150px] h-[50px]">
            <Image
              src={IMAGES.logo}
              alt="Website Logo"
              fill
              sizes="150px"
              priority
              className="object-contain"
            />
          </div>
        </Link>
        <nav>
          <ul className="flex gap-6">
            {NAVIGATION_LINKS.map((link) => (
              <li key={link.path}>
                <Link 
                  href={link.path} 
                  className="hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
} 