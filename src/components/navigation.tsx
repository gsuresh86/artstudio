'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingCart, User, Menu, X, Search, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface User {
  id: string
  email: string
  user_metadata?: {
    name?: string
  }
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Paintings', href: '/category/paintings' },
  { name: 'Mandala Art', href: '/category/mandala' },
  { name: 'DIY Crafts', href: '/category/crafts' },
  { name: 'Artists', href: '/artists' },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user as User || null)
    }
    getUser()
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getUser()
    })
    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    window.location.reload()
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-purple-600">ArtStudio</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-purple-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 items-center">
          <button className="text-gray-700 hover:text-purple-600 transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <Link href="/cart" className="text-gray-700 hover:text-purple-600 transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600" />
              <Link href="/profile" className="text-sm font-medium text-gray-900 hover:text-purple-600 transition-colors">
                {user.user_metadata?.name || user.email}
              </Link>
              <button
                onClick={handleSignOut}
                className="ml-2 text-gray-500 hover:text-red-600 transition-colors"
                title="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link href="/auth" className="text-gray-700 hover:text-purple-600 transition-colors">
              <User className="h-5 w-5" />
            </Link>
          )}
        </div>
      </nav>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="text-2xl font-bold text-purple-600">ArtStudio</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <div className="flex items-center gap-x-4">
                    <button className="text-gray-700 hover:text-purple-600 transition-colors">
                      <Search className="h-5 w-5" />
                    </button>
                    <Link href="/cart" className="text-gray-700 hover:text-purple-600 transition-colors">
                      <ShoppingCart className="h-5 w-5" />
                    </Link>
                    {user ? (
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-gray-900">
                          {user.user_metadata?.name || user.email}
                        </span>
                        <button
                          onClick={handleSignOut}
                          className="ml-2 text-gray-500 hover:text-red-600 transition-colors"
                          title="Sign out"
                        >
                          <LogOut className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <Link href="/auth" className="text-gray-700 hover:text-purple-600 transition-colors">
                        <User className="h-5 w-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 