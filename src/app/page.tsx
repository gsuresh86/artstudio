import { Hero } from '@/components/hero'
import { ProductCard } from '@/components/product-card'
// import { ProfileInfo } from '@/components/ProfileInfo'

// Sample data - in a real app, this would come from your database
const sampleProducts = [
  {
    id: '1',
    name: 'Abstract Sunset Canvas',
    description: 'Beautiful abstract painting with warm sunset colors',
    price: 29900, // $299.00
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
    price: 15900, // $159.00
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
    price: 8900, // $89.00
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
    price: 19900, // $199.00
    images: ['/sample-art-4.jpg'],
    artist: 'Emma Thompson',
    rating: 4.6,
    reviewCount: 15,
    category: 'paintings'
  }
]

export default function HomePage() {
  return (
    <div>
      {/* <ProfileInfo /> */}
      <Hero />
      
      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Featured Artwork
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover unique handmade art, canvas paintings, mandala art, and DIY crafts from talented artists. Each piece is carefully crafted with love and attention to detail.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              View All Artwork
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Find exactly what you&apos;re looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Canvas Paintings</h3>
                  <p className="text-sm opacity-90">Original artwork on canvas</p>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-square bg-gradient-to-br from-pink-400 to-orange-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Mandala Art</h3>
                  <p className="text-sm opacity-90">Intricate geometric designs</p>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-square bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">DIY Crafts</h3>
                  <p className="text-sm opacity-90">Handmade decorative items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
