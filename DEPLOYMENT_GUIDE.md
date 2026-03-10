# 🚀 COMPLETE DEPLOYMENT GUIDE

Follow these 4 steps to get your portfolio live!

---

## Step 1: Set Up Supabase Database ✅

### 1.1 Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** (free tier available)
3. Sign in with GitHub

### 1.2 Create New Project
1. Click **"New Project"**
2. Fill in:
   - **Name:** `portfolio-db`
   - **Database Password:** (save this securely!)
   - **Region:** Choose closest to you
3. Click **"Create new project"** (takes ~2 minutes)

### 1.3 Run Database Setup
1. In your Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Open the file `supabase-setup.sql` from this project
4. Copy ALL the SQL code
5. Paste into Supabase SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)

✅ You should see: "Success. No rows returned"

### 1.4 Get Your API Keys
1. Go to **Settings** (gear icon) → **API**
2. Copy these two values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 1.5 Update .env.local
Open `.env.local` and paste your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 2: Configure Environment Variables 🔐

### 2.1 Copy Example File
```bash
# Windows (PowerShell)
copy .env.example .env.local

# Linux/Mac
cp .env.example .env.local
```

### 2.2 Choose Email Provider

**Option A: Resend (Recommended - Free Tier)**

1. Go to [resend.com](https://resend.com)
2. Sign up with GitHub
3. Go to **API Keys** → Copy your key
4. Update `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM=Portfolio <onboarding@resend.dev>
NOTIFICATION_EMAIL=your-email@gmail.com
```

**Option B: Gmail (Also Free)**

1. Go to [Google Account](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App Passwords**
4. Create new app password for "Mail"
5. Copy the 16-character password
6. Update `.env.local`:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASS=abcd efgh ijkl mnop  # 16 chars with spaces
NOTIFICATION_EMAIL=your-email@gmail.com
```

### 2.3 Verify Your .env.local

Your final `.env.local` should look like:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email (Choose one)
RESEND_API_KEY=re_xxxxxxxxxxxxx
# OR
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASS=xxxx xxxx xxxx xxxx

# Notification email
NOTIFICATION_EMAIL=you@yourdomain.com
```

---

## Step 3: Deploy to Vercel 🌐

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign in with GitHub

### 3.2 Deploy via Vercel Dashboard (Easiest)

1. Click **"Add New..."** → **"Project"**
2. Under **"Import Git Repository"**, find your portfolio repo
3. Click **"Import"**
4. Configure project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `pnpm build` (or leave blank)
   - **Output Directory:** `.next` (default)
5. Click **"Environment Variables**"
6. Add each variable from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `RESEND_API_KEY` (or `GMAIL_APP_PASS`)
   - `NOTIFICATION_EMAIL`
7. Click **"Deploy"**

⏱️ Wait 2-3 minutes for build to complete!

### 3.3 Deploy via CLI (Alternative)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 3.4 Add Environment Variables via CLI

```bash
# Add each variable
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add RESEND_API_KEY
vercel env add NOTIFICATION_EMAIL

# Link to your project
vercel link

# Deploy
vercel --prod
```

---

## Step 4: Push to GitHub (Enable CI/CD) 🔄

### 4.1 Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `portfolio`
3. **Public** or **Private** (your choice)
4. **DO NOT** initialize with README (you already have one)
5. Click **"Create repository"**

### 4.2 Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create .gitignore check
git status

# First commit
git commit -m "Initial commit: Portfolio website"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 4.3 Connect GitHub to Vercel

1. Go to your project on [vercel.com](https://vercel.com/dashboard)
2. Click your portfolio project
3. Go to **Settings** → **Git**
4. Click **"Connect Git Repository"**
5. Select your GitHub repo
6. Click **"Connect"**

Now every push to `main` will auto-deploy! 🎉

### 4.4 Set Up GitHub Secrets (For CI/CD)

1. Go to your GitHub repo
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add these secrets:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `RESEND_API_KEY` | Your Resend key (if using) |

5. Click **"Add secret"** for each

### 4.5 (Optional) Vercel API Token for GitHub Actions

If you want GitHub Actions to deploy to Vercel:

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click **"Create"**
3. Name: `github-actions`
4. Copy the token
5. Add to GitHub Secrets as `VERCEL_TOKEN`

Also add:
- `VERCEL_ORG_ID` - Found in Vercel Dashboard → Settings
- `VERCEL_PROJECT_ID` - Found in Vercel Project → Settings

---

## ✅ Verification Checklist

After completing all steps, verify:

### Supabase
- [ ] Tables created (leads, bookings, etc.)
- [ ] RLS policies enabled
- [ ] API keys copied to `.env.local`

### Environment
- [ ] `.env.local` exists with all variables
- [ ] Email provider configured (Resend or Gmail)
- [ ] No sensitive files committed to git

### Vercel
- [ ] Project deployed successfully
- [ ] Environment variables added
- [ ] Custom domain configured (optional)

### GitHub
- [ ] Code pushed to repository
- [ ] CI/CD workflows running (check Actions tab)
- [ ] Secrets configured

### Live Site
- [ ] Homepage loads
- [ ] Contact form submits
- [ ] Email notifications received
- [ ] No console errors

---

## 🧪 Test Your Contact Form

```bash
# Start dev server
pnpm dev

# Open http://localhost:3000
# Scroll to contact form
# Fill out and submit

# Check:
# 1. Success toast appears
# 2. Email notification received
# 3. Data in Supabase (Table Editor → leads)
```

---

## 🎯 Quick Commands Reference

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm lint             # Code linting

# Verification
.\verify.ps1          # Windows health check
./verify.sh           # Linux/Mac health check

# Git
git add .             # Stage all changes
git commit -m "msg"   # Commit changes
git push              # Push to GitHub

# Vercel
vercel                # Deploy preview
vercel --prod         # Deploy production
```

---

## 🐛 Troubleshooting

### Build Fails on Vercel
- Check **Deployments** tab for error logs
- Verify all dependencies in `package.json`
- Run `pnpm build` locally first

### Contact Form Not Working
- Check browser console for errors
- Verify Supabase keys in Vercel env vars
- Check Supabase RLS policies

### Email Not Sending
- **Resend:** Verify domain in Resend dashboard
- **Gmail:** Use App Password, not regular password
- Check spam folder

### CI/CD Not Running
- Check GitHub Actions is enabled for repo
- Verify workflow files in `.github/workflows/`
- Check Actions tab for error logs

---

## 🎉 You're Done!

Your portfolio is now:
- ✅ Live on Vercel
- ✅ Connected to Supabase database
- ✅ Sending email notifications
- ✅ Auto-deploying on git push
- ✅ Running CI/CD checks

**Next:** Share your link and start getting clients! 🚀

---

**Need Help?** Check the full README.md or open an issue on GitHub.
