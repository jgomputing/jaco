import React from 'react'
import Image from 'next/image'
import Button from '@/components/common/Button'
import { IMAGES } from '@/constants/images'

export default function AboutSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[600px] rounded-lg overflow-hidden">
            <Image
              src={IMAGES.about}
              alt="JACO MUSICAL performing"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">About JACO MUSICAL</h2>
            <p className="text-lg text-gray-700 mb-6">
              JACO MUSICAL is a passionate gospel artist dedicated to spreading the message 
              of hope and faith through powerful musical performances. With a unique blend 
              of contemporary and traditional gospel sounds, each song is crafted to touch 
              hearts and uplift spirits.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Join us on this musical journey of praise and worship, as we create 
              meaningful connections through the universal language of gospel music.
            </p>
            <Button variant="primary">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  )
} 