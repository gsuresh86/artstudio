import { ProductCard } from '@/components/product-card'

// Sample crafts data using actual images from public folder
const crafts = [
  { id: '1', name: 'Handcrafted Dream Catcher',
    description: 'Traditional dream catcher with natural materials',
    price: 8900, images: ['/mandala1.jpg'], // Using existing image
    artist: 'James Wilson',
    rating: 4.7,
    reviewCount: 31, category: 'crafts' },
  { id: '2', name: 'Handmade Ceramic Vase',
    description: 'Unique ceramic vase with organic shapes',
    price: 7500, images: ['/mandala2.jpg'], // Using existing image
    artist: 'Lisa Park',
    rating: 4.4,
    reviewCount: 19, category: 'crafts' },
  { id: '3', name: 'Macrame Wall Hanging',
    description: 'Beautiful macrame wall art with natural fibers',
    price: 6500, images: ['/mandala3.jpg'], // Using existing image
    artist: 'Emma Thompson',
    rating: 4.6,
    reviewCount: 25, category: 'crafts' },
  { id: '4', name: 'Handmade Jewelry Box',
    description: 'Intricately carved wooden jewelry box',
    price: 12000, images: ['/mandala1.jpg'], // Using existing image
    artist: 'Carlos Mendez',
    rating: 4.8,
    reviewCount: 16, category: 'crafts' }
]

export default function CraftsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              DIY Crafts
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Discover unique handmade decorative items and crafts
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {crafts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors">
            Load More Crafts
          </button>
        </div>
      </div>
    </div>
  )
} 