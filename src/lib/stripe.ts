import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

// Client-side Stripe instance
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
}

// Stripe types
export type StripeProduct = {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  metadata: {
    category: string
    artist_id: string
  }
}

export type StripePrice = {
  id: string
  product_id: string
  unit_amount: number
  currency: string
} 