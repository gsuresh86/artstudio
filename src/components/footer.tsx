import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">ArtStudio</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover unique handmade art, canvas paintings, mandala art, and DIY crafts 
              from talented artists around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-purple-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/category/paintings" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Canvas Paintings
                </Link>
              </li>
              <li>
                <Link href="/category/mandala" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Mandala Art
                </Link>
              </li>
              <li>
                <Link href="/category/crafts" className="text-gray-300 hover:text-purple-400 transition-colors">
                  DIY Crafts
                </Link>
              </li>
              <li>
                <Link href="/artists" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Our Artists
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-purple-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-purple-400 mr-3" />
              <span className="text-gray-300">hello@artstudio.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-purple-400 mr-3" />
              <span className="text-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-purple-400 mr-3" />
              <span className="text-gray-300">123 Art Street, Creative City, CA 90210</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2024 ArtStudio. All rights reserved. Handmade with ❤️ for art lovers.
          </p>
        </div>
      </div>
    </footer>
  )
} 