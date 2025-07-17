# 🚀 ArtStudio Deployment Guide

This guide will help you deploy your ArtStudio ecommerce platform to production.

## Prerequisites

Before deploying, make sure you have:

- [Node.js 18+](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Supabase account](https://supabase.com/)
- [Stripe account](https://stripe.com/)
- [Vercel account](https://vercel.com/) (recommended)

## Step 1: Set Up Supabase

1. **Create a new Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose your organization
   - Enter project name: `artstudio`
   - Set a database password
   - Choose a region close to your users

2. **Get your Supabase credentials**
   - Go to Settings → API
   - Copy your Project URL and anon/public key

3. **Set up the database schema**
   - Go to SQL Editor in your Supabase dashboard
   - Run the following SQL:

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

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_artist_id ON products(artist_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
```

## Step 2: Set Up Stripe

1. **Create a Stripe account**
   - Go to [stripe.com](https://stripe.com)
   - Sign up for an account
   - Complete your business profile

2. **Get your Stripe keys**
   - Go to Developers → API keys
   - Copy your Publishable key and Secret key
   - **Important**: Use test keys for development, live keys for production

3. **Set up webhooks** (for production)
   - Go to Developers → Webhooks
   - Add endpoint: `https://your-domain.com/api/webhooks/stripe`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`

## Step 3: Deploy to Vercel

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure environment variables**
   In your Vercel project settings, add these environment variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   - Vercel will automatically deploy your app
   - Your site will be available at `https://your-domain.vercel.app`

## Step 4: Configure Custom Domain (Optional)

1. **Add custom domain in Vercel**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain

2. **Update DNS records**
   - Add the CNAME record provided by Vercel
   - Wait for DNS propagation (up to 48 hours)

3. **Update environment variables**
   - Update `NEXT_PUBLIC_APP_URL` to your custom domain

## Step 5: Set Up Analytics (Optional)

1. **Google Analytics**
   - Create a Google Analytics account
   - Add your tracking ID to environment variables

2. **Vercel Analytics**
   - Enable in your Vercel project settings
   - No additional configuration needed

## Step 6: Production Checklist

Before going live, ensure:

- [ ] All environment variables are set correctly
- [ ] Database schema is created
- [ ] Stripe webhooks are configured
- [ ] Custom domain is working (if applicable)
- [ ] SSL certificate is active
- [ ] Analytics are tracking correctly
- [ ] Test payments are working
- [ ] User registration is working
- [ ] Product upload is working

## Environment Variables Reference

### Required Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Stripe
STRIPE_SECRET_KEY=sk_test_... or sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... or pk_live_...

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Optional Variables

```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Troubleshooting

### Common Issues

1. **Build fails**
   - Check that all dependencies are installed
   - Ensure TypeScript types are correct
   - Verify environment variables are set

2. **Database connection fails**
   - Verify Supabase URL and keys
   - Check if database schema is created
   - Ensure RLS policies are set up correctly

3. **Payments not working**
   - Verify Stripe keys are correct
   - Check webhook endpoints
   - Ensure you're using the right keys (test vs live)

4. **Authentication issues**
   - Check Supabase Auth settings
   - Verify redirect URLs are correct
   - Ensure email templates are configured

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Supabase documentation](https://supabase.com/docs)
- Consult [Stripe documentation](https://stripe.com/docs)
- Create an issue in the repository

## Security Best Practices

1. **Environment Variables**
   - Never commit secrets to version control
   - Use different keys for development and production
   - Rotate keys regularly

2. **Database Security**
   - Enable Row Level Security (RLS)
   - Use parameterized queries
   - Regularly backup your database

3. **Payment Security**
   - Use HTTPS everywhere
   - Validate all payment data
   - Implement proper error handling

4. **Authentication**
   - Use strong password policies
   - Implement rate limiting
   - Enable 2FA for admin accounts

## Performance Optimization

1. **Images**
   - Use Next.js Image component
   - Optimize image sizes
   - Use WebP format when possible

2. **Code**
   - Enable code splitting
   - Use dynamic imports
   - Minimize bundle size

3. **Database**
   - Add proper indexes
   - Use connection pooling
   - Implement caching strategies

## Monitoring

1. **Set up monitoring**
   - Vercel Analytics
   - Error tracking (Sentry)
   - Performance monitoring

2. **Regular maintenance**
   - Update dependencies
   - Monitor database performance
   - Review security settings

Your ArtStudio ecommerce platform is now ready for production! 🎉 