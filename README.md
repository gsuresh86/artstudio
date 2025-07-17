# ArtStudio - Handmade Art Ecommerce Platform

A modern ecommerce platform built with Next.js 15, Supabase, and Stripe for selling handmade art, canvas paintings, mandala art, and DIY crafts.

## 🎨 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Authentication**: Supabase Auth with social logins
- **Database**: Supabase PostgreSQL with Row Level Security
- **Payments**: Stripe integration for secure transactions
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Product Management**: Categories, variants, inventory tracking
- **User Experience**: Shopping cart, wishlist, reviews, ratings

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd artstudio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Stripe Configuration
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Supabase Database**
   
   Create a new Supabase project and run the following SQL to set up your tables:

   ```sql
   -- Create products table
   CREATE TABLE products (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name VARCHAR NOT NULL,
     description TEXT,
     price INTEGER NOT NULL,
     category VARCHAR NOT NULL,
     images TEXT[],
     artist_id UUID REFERENCES auth.users(id),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create orders table
   CREATE TABLE orders (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     status VARCHAR DEFAULT 'pending',
     total INTEGER NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create order_items table
   CREATE TABLE order_items (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     order_id UUID REFERENCES orders(id),
     product_id UUID REFERENCES products(id),
     quantity INTEGER NOT NULL,
     price INTEGER NOT NULL
   );

   -- Enable Row Level Security
   ALTER TABLE products ENABLE ROW LEVEL SECURITY;
   ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
   ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Products are viewable by everyone" ON products
     FOR SELECT USING (true);

   CREATE POLICY "Users can insert their own products" ON products
     FOR INSERT WITH CHECK (auth.uid() = artist_id);

   CREATE POLICY "Users can update their own products" ON products
     FOR UPDATE USING (auth.uid() = artist_id);
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
artstudio/
├── src/
│   ├── app/                 # Next.js 14 app router
│   │   ├── (auth)/          # Authentication pages
│   │   ├── products/        # Product pages
│   │   ├── cart/           # Shopping cart
│   │   └── checkout/       # Checkout flow
│   ├── components/          # Reusable UI components
│   ├── lib/                # Utilities and configurations
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Deployment**: Vercel (recommended)

## 🎯 Key Features

### For Customers
- Browse products by category
- Search and filter functionality
- Shopping cart with persistent storage
- Secure checkout with Stripe
- User reviews and ratings
- Wishlist functionality
- Order tracking

### For Artists/Sellers
- Product management dashboard
- Inventory tracking
- Sales analytics
- Artist profiles
- Commission management

### For Admins
- User management
- Order management
- Product approval system
- Analytics dashboard
- Content management

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production

Make sure to set these in your production environment:

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
STRIPE_SECRET_KEY=your_production_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_production_stripe_publishable_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 📈 Performance

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Caching**: Built-in caching strategies
- **SEO**: Optimized meta tags and structured data
- **Accessibility**: WCAG 2.1 compliant

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@artstudio.com or create an issue in the repository.

## 🔮 Roadmap

- [ ] Multi-language support
- [ ] Advanced search with AI
- [ ] AR/VR product preview
- [ ] Subscription boxes
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Social commerce features
