'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Palette, Heart, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Discover Unique{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Handmade Art
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore beautiful canvas paintings, intricate mandala art, and creative DIY crafts 
              from talented artists around the world. Each piece tells a unique story.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Link
              href="/products"
              className="rounded-full bg-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors flex items-center gap-2"
            >
              Explore Artwork
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/artists"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-purple-600 transition-colors"
            >
              Meet Our Artists <span aria-hidden="true">→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Palette className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Original Artwork</h3>
              <p className="mt-2 text-sm text-gray-600">
                Each piece is handcrafted with love and attention to detail
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Support Artists</h3>
              <p className="mt-2 text-sm text-gray-600">
                Direct support to talented artists and creators
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <Sparkles className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Unique Pieces</h3>
              <p className="mt-2 text-sm text-gray-600">
                One-of-a-kind creations you wont find anywhere else
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 