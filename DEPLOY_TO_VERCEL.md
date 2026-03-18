# Deploy to Vercel - Quick Guide for AJ

## Step 1: Create GitHub Repo

```bash
# AJ - Execute this:
# 1. Go to https://github.com/new
# 2. Create repo named: code-craft-ai
# 3. Don't initialize with README

# Then push the local code:
cd C:\Users\ament\.openclaw\wrkspace1\code-craft-ai
git remote add origin https://github.com/YOUR_USERNAME/code-craft-ai.git
git branch -M main
git push -u origin main
```

## Step 2: Create Vercel Deployment

1. **Go to**: https://vercel.com/new
2. **Login** with your GitHub account
3. **Import project** from `YOUR_USERNAME/code-craft-ai`
4. **Project name**: `code-craft-ai` (or your choice)
5. **Framework preset**: Next.js (auto-detected)
6. **Click "Deploy"**

## Step 3: Add Environment Variables

After clicking "Deploy", Vercel will show a config screen. Add these:

### **Required for Production**:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_APP_URL=https://code-craft-ai.vercel.app (or your custom domain)
ADMIN_PASSWORD=your_secret_admin_password_here
```

### **Optional (for later phases)**:
```
SENDGRID_API_KEY=SG.YOUR_API_KEY
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=code-craft-templates
DATABASE_URL=postgresql://...
```

## Step 4: Deploy

1. Click **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. You'll get a live URL: `https://code-craft-ai.vercel.app`

## Step 5: Test the Deployment

Visit:
- **Gallery**: https://code-craft-ai.vercel.app/
- **Product**: https://code-craft-ai.vercel.app/product/react-admin-dashboard
- **Admin**: https://code-craft-ai.vercel.app/admin (password: `admin123`)

## Step 6: Get Stripe Test Keys (if you don't have them)

1. Go to: https://dashboard.stripe.com/apikeys
2. Copy **Publishable key** (starts with `pk_test_`)
3. Copy **Secret key** (starts with `sk_test_`)
4. Update Vercel environment variables with these real keys
5. Vercel will auto-redeploy

## Step 7: Custom Domain (Optional)

1. In Vercel, go to **Project Settings** → **Domains**
2. Add your custom domain
3. Follow DNS setup instructions

## Automatic Redeploys

Every time you push to GitHub:
```bash
git add .
git commit -m "Your message"
git push origin main
```

Vercel will automatically redeploy! ✨

---

## Test Stripe in Production

Use these test cards:
- **Success**: `4242 4242 4242 4242` (Exp: Any future, CVC: Any 3 digits)
- **Declined**: `4000 0000 0000 0002`
- **Email**: Use any test email

## Troubleshooting

### Build fails?
```bash
# Check local build first
npm run build
npm start
```

### Environment variables not working?
- Make sure they're added in Vercel **Project Settings** → **Environment Variables**
- Redeploy after adding them

### Stripe checkout not working?
- Verify keys are correct
- Check browser console for errors
- Make sure `NEXT_PUBLIC_APP_URL` matches your Vercel domain

---

**Status**: ✅ Ready to deploy!
**Estimated time**: 5 minutes setup + 3 minutes deploy = 8 min total

**Next steps after deploy**:
1. Test checkout flow with test Stripe cards
2. Check admin dashboard
3. Add real template files
4. Integrate backend services (AWS, SendGrid)
5. Launch marketing push
