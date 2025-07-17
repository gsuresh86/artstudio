import Image from 'next/image'
import Link from 'next/link'
import ArtistCard from '../../components/ArtistCard'

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
            <ArtistCard key={artist.id} artist={artist} index={index} />
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