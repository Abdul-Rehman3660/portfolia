# 🚀 GitHub Pages Deployment - Action Required

Your website is now configured for GitHub Pages! Follow these simple steps:

---

## Step 1: Install Git (2 minutes)

1. Go to: https://git-scm.com/download/win
2. Download and install (just click "Next" for all options)
3. **Restart PowerShell/Terminal** after installation
4. Verify: Run `git --version` in terminal

---

## Step 2: Create GitHub Repository (2 minutes)

1. Go to: https://github.com/new
2. Fill in:
   - **Repository name:** `portfolio` (or your preferred name)
   - **Description:** "My portfolio website"
   - **Public** (checked)
3. Click **"Create repository"**
4. Copy the repository URL shown (format: `https://github.com/YOUR_USERNAME/portfolio.git`)

---

## Step 3: Initialize and Push to GitHub (3 minutes)

Run these commands in PowerShell* from your project folder:

```powershell
# Replace YOUR_USERNAME and YOUR_EMAIL with real values
git config --global user.name "Your Name"
git config --global user.email "your-email@gmail.com"

# Initialize repository
git init
git add .
git commit -m "Initial commit - portfolio website configured for GitHub Pages"

# Set main branch
git branch -M main

# Add remote (paste YOUR_REPO_URL from Step 2)
git remote add origin YOUR_REPO_URL

# Push to GitHub
git push -u origin main

# Example:
# git remote add origin https://github.com/john123/portfolio.git
```

---

## Step 4: Enable GitHub Pages (1 minute)

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/portfolio`
2. Click **Settings** (at top right)
3. Click **Pages** in left sidebar
4. Under "Build and deployment":
   - **Source:** Select `GitHub Actions`
   - It will auto-detect and show your workflow
5. Wait for the workflow to finish (check "Actions" tab)
6. Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio`

---

## Step 5: Verify Deployment ✅

- Check **Actions** tab - you should see a green checkmark ✓
- Visit your live site: `https://YOUR_USERNAME.github.io/portfolio`

---

## 📝 Important Notes

### Contact Form
- **API routes don't work on GitHub Pages** (static hosting only)
- Options:
  - **Option A (5 min):** Use Formspree: https://formspree.io
    - Update contact form endpoint to: `https://formspree.io/f/YOUR_FORM_ID`
  - **Option B:** Remove contact form (keep other sections)
  - **Option C (Better):** Deploy on **Vercel** instead (free, supports API routes)

### Environment Variables
- Supabase URL and Anon Key are NOT needed for GitHub Pages
- They're only needed if contact form uses Supabase
- Remove from environment if not using

### Future Updates
After initial setup, changes auto-deploy when you:
```powershell
git add .
git commit -m "Your change description"
git push
```

---

## 🆘 Troubleshooting

### "Git not found" error
- Make sure you **restarted PowerShell** after installing Git
- Try closing and reopening VS Code terminal

### "Repository not found" error
- Check you copied the URL correctly from GitHub
- Make sure your SSH key is set up (use HTTPS URL if issues)

### Build failed in GitHub Actions
- Check "Actions" tab for error details
- Common issue: Missing environment variables

### Site shows 404
- Make sure branch deployed is `main`
- Check repository is `PUBLIC`
- Deployment must finish (green checkmark)

---

**تمام! اب تمہارا website live ہوگا! 🎉**

Need help? Check the Actions tab on GitHub for build logs.
