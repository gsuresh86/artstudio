import { ProductCard } from '@/components/product-card'

// Sample data - in a real app, this would come from your database
const products = [
  {
    id: '1',
    name: 'Abstract Sunset Canvas',
    description: 'Beautiful abstract painting with warm sunset colors',
    price: 29900,
    images: ['/sample-art-1.jpg'],
    artist: 'Sarah Chen',
    rating: 4.8,
    reviewCount: 24,
    category: 'paintings'
  },
  {
    id: '2',
    name: 'Mandala Meditation Circle',
    description: 'Intricate mandala design perfect for meditation spaces',
    price: 15900,
    images: ['/sample-art-2.jpg'],
    artist: 'Maria Rodriguez',
    rating: 4.9,
    reviewCount: 18,
    category: 'mandala'
  },
  {
    id: '3',
    name: 'Handcrafted Dream Catcher',
    description: 'Traditional dream catcher with natural materials',
    price: 8900,
    images: ['/sample-art-3.jpg'],
    artist: 'James Wilson',
    rating: 4.7,
    reviewCount: 31,
    category: 'crafts'
  },
  {
    id: '4',
    name: 'Ocean Waves Acrylic',
    description: 'Serene ocean scene with calming blue tones',
    price: 19900,
    images: ['/sample-art-4.jpg'],
    artist: 'Emma Thompson',
    rating: 4.6,
    reviewCount: 15,
    category: 'paintings'
  },
  {
    id: '5',
    name: 'Geometric Mandala Art',
    description: 'Modern geometric mandala with vibrant colors',
    price: 12900,
    images: ['/sample-art-5.jpg'],
    artist: 'Alex Kim',
    rating: 4.5,
    reviewCount: 22,
    category: 'mandala'
  },
  {
    id: '6',
    name: 'Handmade Ceramic Vase',
    description: 'Unique ceramic vase with organic shapes',
    price: 7500,
    images: ['/sample-art-6.jpg'],
    artist: 'Lisa Park',
    rating: 4.4,
    reviewCount: 19,
    category: 'crafts'
  }
]

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'paintings', name: 'Canvas Paintings' },
  { id: 'mandala', name: 'Mandala Art' },
  { id: 'crafts', name: 'DIY Crafts' }
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              All Artwork
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Discover unique handmade pieces from talented artists
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-colors"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  )
} 