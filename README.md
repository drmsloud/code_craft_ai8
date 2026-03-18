# Code Craft AI - Premium Code Templates Marketplace

A modern, fast-loading marketplace for AI-generated and curated code snippets, templates, and boilerplates.

## ✨ Features

- **Gallery Page** - Browse 10+ premium templates with live pricing
- **Product Pages** - Detailed code previews, features, and use cases
- **Stripe Checkout** - Secure payment processing (test mode ready)
- **Instant Delivery** - Email with download link upon purchase
- **Admin Dashboard** - Track sales, revenue, and analytics (password-protected)
- **Responsive Design** - Mobile-first, built with Tailwind CSS
- **Fast Performance** - Next.js 15 with TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Stripe account (test keys)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ament/code-craft-ai.git
cd code-craft-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` with your keys:
```bash
cp .env.local.example .env.local
```

4. Add your Stripe test keys:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_PASSWORD=your_secure_password
```

5. Run development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── checkout/          # Stripe checkout endpoint
│   │   └── admin/             # Admin auth & stats
│   ├── admin/                 # Admin dashboard
│   ├── product/[id]/          # Product detail page
│   ├── success/               # Payment success page
│   ├── cancel/                # Payment cancelled page
│   └── layout.tsx             # Root layout
├── components/
│   ├── StripeCheckout.tsx     # Checkout form
│   └── ProtectedAdminPanel.tsx # Admin stats panel
├── lib/
│   └── templates.ts           # Template data
└── public/                    # Static assets
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Payments**: Stripe API
- **Hosting**: Vercel (ready to deploy)
- **Backend**: Next.js API Routes

## 📋 Template Schema

Each template includes:
- `id` - Unique identifier
- `name` - Display name
- `description` - Short description
- `language` - Programming language
- `framework` - Framework used
- `price` - USD price
- `icon` - Emoji icon
- `features` - Array of features
- `useCase` - Target use case

## 🔐 Admin Dashboard

Access at `/admin` with:
- **Username**: (via password only)
- **Password**: Configured in `ADMIN_PASSWORD` env var (default: `admin123`)

Features:
- View total revenue
- Track order count
- See recent orders
- Average order value

## 💳 Stripe Integration

### Test Cards

- **Success**: `4242 4242 4242 4242` (Exp: any future, CVC: any 3 digits)
- **Declined**: `4000 0000 0000 0002`

## 🚢 Deployment to Vercel

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/ament/code-craft-ai.git
git branch -M main
git push -u origin main
```

2. Import in Vercel:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your GitHub repo
   - Add environment variables
   - Click "Deploy"

## 📧 SendGrid Integration (TODO)

Set `SENDGRID_API_KEY` to enable transactional email on purchase.

## 💾 S3 File Delivery (TODO)

Set AWS credentials to enable template file storage and delivery via signed URLs.

## 📊 DynamoDB Orders (TODO)

Connect DynamoDB for persistent order tracking and analytics.

## 🐛 Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📝 License

MIT License - see LICENSE file

## 👤 Author

Built for Code Craft AI launch (48-hour MVP).

---

**Status**: MVP Ready | **Last Updated**: March 17, 2026
