'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaPaypal, FaUniversity, FaHeart, FaPrayingHands, FaHandHoldingHeart, FaArrowLeft, FaMusic } from 'react-icons/fa'
import Link from 'next/link'
import FooterSection from '@/components/sections/FooterSection'

const BANK_DETAILS = {
  bankName: "Your Bank Name",
  accountName: "Your Account Name",
  accountNumber: "Your Account Number",
  swiftCode: "Your SWIFT Code",
  iban: "Your IBAN"
}

export default function SupportPage() {
  return (
    <>
      <main className="min-h-screen pt-32 pb-20">
        <div className="container max-w-4xl">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-12 group"
          >
            <FaArrowLeft className="text-sm transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] text-sm font-medium mb-6">
              <FaHeart className="animate-pulse" />
              <span>Support Our Ministry</span>
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Partner With Us in <span className="text-[#3b82f6]">Spreading God's Love</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Your support helps us continue our mission of transforming lives through gospel music and worship.
            </p>
          </motion.div>

          {/* Support Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* PayPal Option */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00457C]/20 via-[#0079C1]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />
              <div className="p-8 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:bg-white/[0.05] transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-[#00457C] text-white">
                    <FaPaypal size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">PayPal</h3>
                </div>
                <p className="text-white/60 mb-6">
                  Make a secure donation through PayPal. You can use your PayPal account or credit card.
                </p>
                <a
                  href="https://www.paypal.com/donate?hosted_button_id=YOUR_BUTTON_ID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00457C] hover:bg-[#003C6B] text-white rounded-xl transition-all duration-300"
                >
                  <FaPaypal />
                  <span>Donate with PayPal</span>
                </a>
              </div>
            </motion.div>

            {/* Bank Transfer Option */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/20 via-purple-600/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />
              <div className="p-8 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:bg-white/[0.05] transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-[#3b82f6] text-white">
                    <FaUniversity size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Bank Transfer</h3>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-white/40 text-sm">Bank Name</p>
                    <p className="text-white">{BANK_DETAILS.bankName}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-sm">Account Name</p>
                    <p className="text-white">{BANK_DETAILS.accountName}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-sm">Account Number</p>
                    <p className="text-white">{BANK_DETAILS.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-sm">SWIFT Code</p>
                    <p className="text-white">{BANK_DETAILS.swiftCode}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-sm">IBAN</p>
                    <p className="text-white">{BANK_DETAILS.iban}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Impact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Your Support Makes a Difference</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-white/[0.03] backdrop-blur-xl">
                <div className="p-3 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] w-fit mx-auto mb-3">
                  <FaPrayingHands size={20} />
                </div>
                <p className="text-white/60">Enables More Worship Events</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] backdrop-blur-xl">
                <div className="p-3 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] w-fit mx-auto mb-3">
                  <FaMusic size={20} />
                </div>
                <p className="text-white/60">Supports New Music Production</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] backdrop-blur-xl">
                <div className="p-3 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] w-fit mx-auto mb-3">
                  <FaHandHoldingHeart size={20} />
                </div>
                <p className="text-white/60">Helps Reach More Lives</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </>
  )
} 