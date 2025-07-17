import { ProductCard } from '@/components/product-card'

// Sample paintings data using actual images from public folder
const paintings = [
  { id: '1',
    name: 'Abstract Sunset Canvas',
    description: 'Beautiful abstract painting with warm sunset colors',
    price: 29900,
    images: ['/mandala1.jpg'], // Using existing image
    artist: 'Sarah Chen',
    rating: 4.8,
    reviewCount: 24,
    category: 'paintings'
  },
  { id: '2',
    name: 'Ocean Waves Acrylic',
    description: 'Serene ocean scene with calming blue tones',
    price: 19900,
    images: ['/mandala2.jpg'], // Using existing image
    artist: 'Emma Thompson',
    rating: 4.6,
    reviewCount: 15,
    category: 'paintings'
  },
  { id: '3',
    name: 'Mountain Landscape',
    description: 'Stunning mountain landscape in oil on canvas',
    price: 35000,
    images: ['/mandala3.jpg'], // Using existing image
    artist: 'Michael Rodriguez',
    rating: 4.9,
    reviewCount: 31,
    category: 'paintings'
  },
  { id: '4',
    name: 'Urban Cityscape',
    description: 'Modern cityscape with vibrant colors',
    price: 25000,
    images: ['/mandala1.jpg'], // Using existing image
    artist: 'Lisa Park',
    rating: 4.7,
    reviewCount: 18,
    category: 'paintings'
  }
]

export default function PaintingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Canvas Paintings
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Discover beautiful original artwork on canvas from talented artists
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paintings.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors">
            Load More Paintings
          </button>
        </div>
      </div>
    </div>
  )
} 