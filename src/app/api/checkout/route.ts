import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  artist: string
  quantity: number
}

interface LineItem {
  price_data: {
    currency: string
    product_data: {
      name: string
      description: string
      images: string[]
      metadata: {
        product_id: string
        artist: string
      }
    }
    unit_amount: number
  }
  quantity: number
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, successUrl, cancelUrl } = body

    if (!items || !Array.isArray(items) || items.length ===0) {
      return NextResponse.json(
        { error: 'Invalid items data' },
        { status:400 }
      )
    }

    // Create line items for Stripe
    const lineItems: LineItem[] = items.map((item: CartItem) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: `by ${item.artist}`,
          images: [item.image],
          metadata: {
            product_id: item.id,
            artist: item.artist,
          },
        },
        unit_amount: item.price, // Amount in cents
      },
      quantity: item.quantity,
    }))

    // Add shipping cost as a separate line item
    const shippingCost = 1500 // $15 in cents
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Shipping & Handling',
          description: 'Standard shipping',
          images: [],
          metadata: {
            product_id: 'shipping',
            artist: 'ArtStudio',
          },
        },
        unit_amount: shippingCost,
      },
      quantity: 1,
    })

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      metadata: {
        items_count: items.length.toString(),
        total_amount: items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0).toString(),
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'IE', 'PT', 'GR', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SK', 'SI', 'EE', 'LV', 'LT', 'LU', 'MT', 'CY'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shippingCost,
              currency: 'usd',
            },
            display_name: 'Standard shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
      ],
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
} 