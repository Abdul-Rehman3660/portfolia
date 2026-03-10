# 🚀 Vercel Deployment Guide

Your portfolio is now on GitHub! Follow these steps to deploy on Vercel:

---

## Step 1: Connect to Vercel (2 minutes)

1. Go to: https://vercel.com
2. Sign in with your GitHub account
3. Click **"Add New..."** → **"Project"**

---

## Step 2: Import Your Repository

1. Find and select your repository: `Abdul-Rehman3660/portfolia`
2. Click **"Import"**

---

## Step 3: Configure Build Settings

Vercel will auto-detect Next.js settings, but verify:

- **Framework Preset:** Next.js ✅
- **Root Directory:** `./` ✅
- **Build Command:** `pnpm build` ✅
- **Output Directory:** `.next` ✅

---

## Step 4: Add Environment Variables (Optional)

If you want contact form to work, add these from your `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY` (or `GMAIL_APP_PASS`)

---

## Step 5: Deploy!

Click **"Deploy"** and wait 2-3 minutes.

---

## ✅ Your Live Website

After deployment, you'll get a URL like:
`https://portfolia-abdul-rehman3660.vercel.app`

---

## 🔄 Future Updates

Any changes you push to GitHub `main` branch will auto-deploy!

```bash
# Make changes, then:
git add .
git commit -m "Your update"
git push
```

---

**🎉 Congratulations! Your portfolio is live!**

Need help? Check Vercel deployment logs for any issues.