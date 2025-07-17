import { ProductCard } from '@/components/product-card'

// Sample mandala data using actual images from public folder
const mandalas = [
  { id: '1', name: 'Mandala Meditation Circle', description: 'Intricate mandala design perfect for meditation spaces', price: 15900, images: ['/mandala1.jpg'], artist: 'Maria Rodriguez', rating: 4.9, reviewCount: 18, category: 'mandala' },
  { id: '2', name: 'Geometric Mandala Art', description: 'Modern geometric mandala with vibrant colors', price: 12900, images: ['/mandala2.jpg'], artist: 'Alex Kim', rating: 4.5, reviewCount: 22, category: 'mandala' },
  { id: '3', name: 'Sacred Geometry Mandala', description: 'Sacred geometry patterns in calming earth tones', price: 18900, images: ['/mandala3.jpg'], artist: 'Priya Sharma', rating: 4.8, reviewCount: 27, category: 'mandala' },
  { id: '4', name: 'Flower of Life Mandala', description: 'Traditional flower of life pattern with modern twist', price: 14500, images: ['/mandala1.jpg'], artist: 'David Chen', rating: 4.6, reviewCount: 19, category: 'mandala' }
]

export default function MandalaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Mandala Art
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Discover intricate geometric designs and sacred patterns
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mandalas.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors">
            Load More Mandalas
          </button>
        </div>
      </div>
    </div>
  )
} 