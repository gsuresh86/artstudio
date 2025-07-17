import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Globe, Mail } from 'lucide-react'

const artists = [
  {
    id: '1',
    name: 'Sarah Chen',
    specialty: 'Abstract Paintings',
    bio: 'Sarah creates vibrant abstract paintings that explore color theory and emotional expression.',
    image: '/mandala1.jpg',
    rating: 4.8,
    followers: 1240,
    products: 12,
    social: {
      instagram: 'sarahchenart',
      website: 'sarahchen.com',
    },
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    specialty: 'Mandala Art',
    bio: 'Maria specializes in intricate mandala designs that promote meditation and spiritual connection.',
    image: '/mandala2.jpg',
    rating: 4.9,
    followers: 2150,
    products: 18,
    social: {
      instagram: 'mariamandalas',
      website: 'mariamandalas.com',
    },
  },
  {
    id: '3',
    name: 'James Wilson',
    specialty: 'Handmade Crafts',
    bio: 'James creates unique handmade crafts using traditional techniques and natural materials.',
    image: '/mandala3.jpg',
    rating: 4.7,
    followers: 890,
    products: 8,
    social: {
      instagram: 'jamescrafts',
      website: 'jameswilsoncrafts.com',
    },
  },
  {
    id: '4',
    name: 'Emma Thompson',
    specialty: 'Canvas Paintings',
    bio: 'Emma paints serene landscapes and ocean scenes that bring peace and tranquility.',
    image: '/mandala1.jpg',
    rating: 4.6,
    followers: 1560,
    products: 15,
    social: {
      instagram: 'emmathompsonart',
      website: 'emmathompson.com',
    },
  },
]

export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Our Artists</h1>
            <p className="mt-4 text-lg text-gray-600">
              Meet the talented artists behind our beautiful handmade creations
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
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
                <p className="text-gray-60 mb-4">{artist.bio}</p>
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
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://${artist.social.website}`}
                    className="text-gray-400 hover:text-purple-600 transition-colors"
                    target="_blank"
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
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Want to join our community of artists?</p>
          <Link
            href="/auth"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            Become an Artist
          </Link>
        </div>
      </div>
    </div>
  )
} 