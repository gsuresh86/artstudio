'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  artist: string
  rating?: number
  reviewCount?: number
  category: string
}

export function ProductCard({
  id,
  name,
  price,
  images,
  artist,
  rating = 4.5,
  reviewCount = 12,
  category,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <Link href={`/product/${id}`} className="block">
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <Image
            src={images[0] || '/placeholder-art.jpg'}
            alt={name}
            width={400}
            height={400}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link href={`/product/${id}`}>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                {name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 mt-1">{artist}</p>
            <p className="text-xs text-gray-500 mt-1 capitalize">{category}</p>
          </div>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">({reviewCount})</span>
          </div>
          <span className="text-lg font-bold text-gray-900">{formatPrice(price)}</span>
        </div>

        <div className="mt-4 flex space-x-2">
          <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  )
} 