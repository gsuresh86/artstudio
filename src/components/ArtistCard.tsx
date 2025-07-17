'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Globe, Mail } from 'lucide-react'

interface Artist {
  id: string
  name: string
  specialty: string
  bio: string
  image: string
  rating: number
  followers: number
  products: number
  social: {
    instagram: string
    website: string
  }
}

interface ArtistCardProps {
  artist: Artist
  index: number
}

export default function ArtistCard({ artist, index }: ArtistCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="aspect-square w-full overflow-hidden">
        <Image
          src={artist.image}
          alt={artist.name}
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{artist.name}</h3>
        <p className="text-purple-600 font-medium mb-3">{artist.specialty}</p>
        <p className="text-gray-600 mb-4">{artist.bio}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-600 ml-1">{artist.rating}</span>
            </div>
            <span className="text-sm text-gray-500">{artist.followers} followers</span>
          </div>
          <span className="text-sm text-gray-500">{artist.products} products</span>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <a
            href={`https://instagram.com/${artist.social.instagram}`}
            className="text-gray-400 hover:text-purple-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={`https://${artist.social.website}`}
            className="text-gray-400 hover:text-purple-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${artist.name.toLowerCase().replace(/ /g, '')}@artstudio.com`}
            className="text-gray-400 hover:text-purple-600 transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
        <Link
          href={`/products?artist=${artist.id}`}
          className="mt-4 inline-block w-full text-center bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          View Artist&apos;s Work
        </Link>
      </div>
    </motion.div>
  )
} 