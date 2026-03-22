# Portfolio Website — Full-Stack Developer

A modern, high-performance portfolio website built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Features include 3D animations, contact form with email notifications, Supabase integration, and automated CI/CD.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178c6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.2.0-38bdf8?logo=tailwind)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel)

---

## 🚀 Features

### Core
- ⚡ **Next.js 16 App Router** — Latest React Server Components & Turbopack
- 🎨 **Modern UI/UX** — Framer Motion animations, 3D elements, dark mode
- 📱 **Fully Responsive** — Mobile-first design, all devices
- ♿ **Accessible** — WCAG 2.1 compliant, keyboard navigation
- 🎯 **SEO Optimized** — Meta tags, Open Graph, sitemap ready

### Functionality
- 📧 **Contact Form** — Multi-step form with real-time validation
- 🗄️ **Supabase Integration** — PostgreSQL database for leads & analytics
- 📧 **Email Notifications** — Resend or Gmail (nodemailer) support
- 📊 **Analytics** — Vercel Analytics + custom event tracking
- 💬 **Live Chat** — AI-powered chatbot (optional)
- 📅 **Booking System** — Calendly integration for meetings

### DevOps
- 🔒 **Security Scanning** — Automated secret detection
- ✅ **CI/CD Pipeline** — GitHub Actions for automated testing & deployment
- 🚀 **One-Click Deploy** — Vercel-ready configuration
- 🧪 **Verification Scripts** — PowerShell & Bash health checks

---

## 📦 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.1.6 (App Router) |
| **Language** | TypeScript 5.7.3 |
| **Styling** | Tailwind CSS v4, shadcn/ui |
| **Animations** | Framer Motion 11, Three.js |
| **Database** | Supabase (PostgreSQL) |
| **Email** | Resend / Nodemailer |
| **Hosting** | Vercel / Netlify |
| **Package Manager** | pnpm |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+ ([Download](https://nodejs.org))
- pnpm 8+ (`npm install -g pnpm`)
- Supabase account ([Free tier](https://supabase.com))
- Vercel account (for deployment)

### 1. Clone & Install

```bash
# Clone repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
pnpm install
```

### 2. Environment Setup

Create `.env.local` in the root directory:

```bash
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Email Notifications (Optional - choose one)

# Option A: Resend (Recommended)
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM=Portfolio <onboarding@resend.dev>

# Option B: Gmail
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASS=xxxx xxxx xxxx xxxx

# Notification recipient (defaults to GMAIL_USER)
NOTIFICATION_EMAIL=you@yourdomain.com

# Site URL (for production)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3. Supabase Database Setup

Go to your Supabase project → SQL Editor and run:

```sql
-- Leads table (contact form submissions)
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT DEFAULT 'General',
  budget TEXT DEFAULT 'Not specified',
  details TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  lead_magnet TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings (Calendly alternative)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  meeting_type TEXT NOT NULL,
  meeting_date DATE NOT NULL,
  meeting_time TIME NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL,
  message TEXT NOT NULL,
  is_user BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (adjust for production)
CREATE POLICY "Allow public insert" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON chat_messages FOR INSERT WITH CHECK (true);
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   ├── contact/        # Contact form API
│   │   └── health/         # Health check endpoint
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main portfolio page
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── contact-enhanced.tsx  # Multi-step contact form
│   ├── hero-3d.tsx         # 3D hero animations
│   ├── project-showcase.tsx  # Project gallery
│   └── ...
├── lib/
│   ├── supabase.ts         # Supabase client
│   └── utils.ts            # Utility functions
├── public/                 # Static assets
├── .github/
│   └── workflows/
│       ├── ci-cd.yml       # Main CI/CD pipeline
│       └── pr-verify.yml   # PR verification
├── verify.ps1              # PowerShell verification
├── verify.sh               # Bash verification
└── package.json
```

---

## 🧪 Testing & Verification

### Quick Health Check

```bash
# Windows (PowerShell)
.\verify.ps1

# Linux/Mac/WSL
chmod +x verify.sh
./verify.sh
```

### Manual Checks

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Lint code
pnpm lint

# Type check
npx tsc --noEmit
```

---

## 📧 Contact Form API

### Endpoint: `POST /api/contact`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "projectType": "mvp",
  "budget": "medium",
  "message": "I need an MVP built in 4 weeks..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you! I'll get back to you soon.",
  "data": { ... }
}
```

**Response (Error):**
```json
{
  "error": "Invalid email format"
}
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to [Vercel](https://vercel.com) for automatic deployments.

### Environment Variables on Vercel

Add these in Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `RESEND_API_KEY` | Resend API key (if using) |
| `GMAIL_APP_PASS` | Gmail app password (if using) |

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

---

## 🔒 Security

### Best Practices Implemented

- ✅ `.env.local` excluded from git
- ✅ Environment variables validated server-side
- ✅ Row Level Security (RLS) on Supabase tables
- ✅ Input sanitization on API routes
- ✅ Automated secret scanning in CI

### Never Commit

```bash
# Add to .gitignore
.env.local
.env*.local
node_modules/
.next/
*.log
```

---

## 📊 GitHub Actions CI/CD

### Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci-cd.yml` | Push to main | Build, test, deploy |
| `pr-verify.yml` | Pull request | Verify before merge |

### What It Does

1. **Installs dependencies** with pnpm cache
2. **Runs linting** and type checking
3. **Builds the project** (catches compile errors)
4. **Security scan** for exposed secrets
5. **Deploys to Vercel** (on main branch only)

### Required Secrets

In GitHub Repo → Settings → Secrets and variables → Actions:

| Secret | Description |
|--------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

---

## 🎨 Customization

### Update Personal Info

Edit `app/page.tsx`:

```typescript
const NAV_ITEMS = [...]  // Navigation links
const AUDIENCES = [...]  // Target clients
const PROJECTS = [...]   // Your projects
const SERVICES = [...]   // Service offerings
const WRITING = [...]    // Blog posts
```

### Change Colors

Edit `app/globals.css`:

```css
:root {
  --gold: 45 89% 54%;     /* Primary accent */
  --sky: 199 89% 48%;     /* Secondary accent */
  /* ... */
}
```

### Add Your Projects

Edit `PROJECTS` array in `app/page.tsx`:

```typescript
{
  title: "Your Project",
  outcome: "Result achieved",
  audience: "saas|agency|startup|local",
  type: "app|landing",
  role: "Your role",
  year: "2025",
  highlights: ["Feature 1", "Feature 2"],
  tech: ["Next.js", "Your stack"],
  link: "https://...",
}
```

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules/.cache

# Reinstall
pnpm install

# Rebuild
pnpm build
```

### Supabase Connection Error

- Check `.env.local` has correct URL and key
- Verify Supabase project is active
- Check RLS policies allow inserts

### Email Not Sending

- **Resend**: Verify API key, check `RESEND_FROM` format
- **Gmail**: Use App Password (not regular password)
- Check spam folder for test emails

---

## 📄 License

MIT License — feel free to use this template for your own portfolio!

---

## 🤝 Contributing

Found a bug or want to add a feature? Open an issue or submit a PR!

---

## 📬 Support

- **Email**: your-email@example.com
- **Twitter**: @yourhandle
- **LinkedIn**: /in/yourprofile

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
