# ⚡ QUICK START CHECKLIST

Print this and check off each step as you complete it!

---

## 🔧 Prerequisites (Install First)

### Install Git
- [ ] Download: [git-scm.com/download.html](https://git-scm.com/download.html)
- [ ] Install with default options
- [ ] Verify: Open terminal and run `git --version`

### Install Node.js (if not already)
- [ ] Download: [nodejs.org](https://nodejs.org) (LTS version 20+)
- [ ] Verify: `node --version` and `npm --version`

### Install pnpm
- [ ] Run: `npm install -g pnpm`
- [ ] Verify: `pnpm --version`

---

## Step 1: Supabase Setup (10 minutes)

- [ ] Go to [supabase.com](https://supabase.com)
- [ ] Sign up with GitHub
- [ ] Click "New Project"
- [ ] Project name: `portfolio-db`
- [ ] Set strong database password (save it!)
- [ ] Choose region closest to you
- [ ] Wait for project to create (~2 min)

### Run SQL Setup
- [ ] Click "SQL Editor" in left sidebar
- [ ] Click "New query"
- [ ] Open file: `supabase-setup.sql`
- [ ] Copy ALL content
- [ ] Paste into Supabase editor
- [ ] Click "Run"
- [ ] Verify: See "Success" message

### Get API Keys
- [ ] Click Settings (gear) → API
- [ ] Copy **Project URL**
- [ ] Copy **anon/public key**
- [ ] Paste into `.env.local` (see Step 2)

---

## Step 2: Environment Variables (5 minutes)

### Copy Example File
- [ ] File `.env.local` already exists (good!)

### Update Supabase Keys
- [ ] Open `.env.local`
- [ ] Replace `NEXT_PUBLIC_SUPABASE_URL` with your URL
- [ ] Replace `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your key

### Choose Email Provider

**Option A: Resend (Recommended)**
- [ ] Go to [resend.com](https://resend.com)
- [ ] Sign up with GitHub
- [ ] Go to "API Keys"
- [ ] Copy API key
- [ ] Add to `.env.local`:
  ```
  RESEND_API_KEY=re_xxxxxxxxxxxxx
  RESEND_FROM=Portfolio <onboarding@resend.dev>
  NOTIFICATION_EMAIL=your-email@gmail.com
  ```

**Option B: Gmail**
- [ ] Go to [myaccount.google.com/security](https://myaccount.google.com/security)
- [ ] Enable 2-Step Verification
- [ ] Go to "App Passwords"
- [ ] Create password for "Mail"
- [ ] Copy 16-character password
- [ ] Add to `.env.local`:
  ```
  GMAIL_USER=your-email@gmail.com
  GMAIL_APP_PASS=xxxx xxxx xxxx xxxx
  NOTIFICATION_EMAIL=your-email@gmail.com
  ```

### Verify .env.local
Your file should have at minimum:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
RESEND_API_KEY=re_xxxxx  # OR Gmail config below
# GMAIL_USER=...
# GMAIL_APP_PASS=...
NOTIFICATION_EMAIL=you@domain.com
```

---

## Step 3: Test Locally (3 minutes)

- [ ] Open terminal in project folder
- [ ] Run: `pnpm install` (if not done)
- [ ] Run: `pnpm dev`
- [ ] Open: http://localhost:3000
- [ ] Scroll to contact form
- [ ] Fill out and submit test form
- [ ] Check: Success toast appears
- [ ] Check: Email received (if configured)
- [ ] Go to Supabase → Table Editor → leads
- [ ] Verify: Your test submission appears!

✅ If working locally, ready for deployment!

---

## Step 4: Deploy to Vercel (5 minutes)

### Create Vercel Account
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign up with GitHub

### Deploy (Dashboard Method - Easiest)
- [ ] Click "Add New..." → "Project"
- [ ] Find your repo under "Import Git Repository"
  - **Don't see it?** Click "Adjust GitHub App Permissions"
- [ ] Click "Import"
- [ ] Framework: Next.js (auto-detected)
- [ ] Click "Environment Variables"
- [ ] Add from `.env.local`:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `RESEND_API_KEY` (or `GMAIL_APP_PASS`)
  - [ ] `NOTIFICATION_EMAIL`
- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes
- [ ] Click "Continue to Dashboard"
- [ ] Click "Visit" to see your live site!

### Test Live Site
- [ ] Site loads
- [ ] Contact form works
- [ ] Email received

---

## Step 5: Push to GitHub (5 minutes)

### Install Git (if not done)
- [ ] Download: [git-scm.com](https://git-scm.com)
- [ ] Install with defaults

### Create GitHub Repo
- [ ] Go to [github.com/new](https://github.com/new)
- [ ] Name: `portfolio`
- [ ] Public or Private (your choice)
- [ ] DO NOT initialize with README
- [ ] Click "Create repository"

### Push Code
Open terminal in project folder:

```bash
# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Portfolio website"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push
git branch -M main
git push -u origin main
```

### Verify
- [ ] Go to your GitHub repo URL
- [ ] See your code!

---

## Step 6: Connect GitHub to Vercel (Auto-Deploy)

- [ ] Go to your Vercel project
- [ ] Settings → Git
- [ ] Click "Connect Git Repository"
- [ ] Select your GitHub repo
- [ ] Click "Connect"

Now every `git push` will auto-deploy! 🎉

---

## Step 7: Set Up CI/CD (Optional - 5 minutes)

### Add GitHub Secrets
- [ ] Go to GitHub repo → Settings
- [ ] Secrets and variables → Actions
- [ ] New repository secret:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase key |
| `RESEND_API_KEY` | Your Resend key (if using) |

- [ ] Click "Add secret" for each

### Test CI/CD
- [ ] Make a small change (edit README.md)
- [ ] Commit and push: `git push`
- [ ] Go to GitHub repo → Actions tab
- [ ] See workflow running!
- [ ] Wait for green checkmark

---

## ✅ Final Verification

### Local
- [ ] `pnpm dev` works
- [ ] Contact form submits
- [ ] No console errors

### Supabase
- [ ] Tables exist (leads, bookings, etc.)
- [ ] Test data visible in Table Editor

### Vercel
- [ ] Site loads at `.vercel.app` domain
- [ ] Contact form works live
- [ ] Environment variables set

### GitHub
- [ ] Code pushed successfully
- [ ] Actions running (if configured)

---

## 🎉 YOU'RE DONE!

Your portfolio is:
- ✅ Live on Vercel
- ✅ Connected to Supabase
- ✅ Sending emails
- ✅ Auto-deploying

**Share your link and start getting clients!** 🚀

---

## 📞 Your Live URLs

**Vercel Production:** https://your-project.vercel.app

**GitHub Repo:** https://github.com/YOUR_USERNAME/portfolio

**Supabase Dashboard:** https://app.supabase.com

---

## 🆘 Need Help?

1. Check `DEPLOYMENT_GUIDE.md` for detailed instructions
2. Check `README.md` for full documentation
3. Run `.\verify.ps1` to check project health
4. Check Vercel deployment logs for errors

---

**Estimated Total Time: 30-40 minutes**
