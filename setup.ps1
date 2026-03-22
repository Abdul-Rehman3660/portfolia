# Portfolio Setup Script for Windows
# Run: .\setup.ps1

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "  Portfolio Setup Script" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "[1/5] Checking prerequisites..." -ForegroundColor Yellow

$nodeInstalled = Get-Command node -ErrorAction SilentlyContinue
if ($nodeInstalled) {
    Write-Host "  [OK] Node.js installed: $(node --version)" -ForegroundColor Green
} else {
    Write-Host "  [WARN] Node.js not found - install from nodejs.org" -ForegroundColor Yellow
}

$gitInstalled = Get-Command git -ErrorAction SilentlyContinue
if ($gitInstalled) {
    Write-Host "  [OK] Git installed: $(git --version)" -ForegroundColor Green
} else {
    Write-Host "  [WARN] Git not found - install from git-scm.com" -ForegroundColor Yellow
}

$pnpmInstalled = Get-Command pnpm -ErrorAction SilentlyContinue
if ($pnpmInstalled) {
    Write-Host "  [OK] pnpm installed: $(pnpm --version)" -ForegroundColor Green
} else {
    Write-Host "  [INFO] Installing pnpm..." -ForegroundColor Yellow
    npm install -g pnpm
}

# Install dependencies
Write-Host ""
Write-Host "[2/5] Installing dependencies..." -ForegroundColor Yellow
pnpm install

# Check environment file
Write-Host ""
Write-Host "[3/5] Checking environment configuration..." -ForegroundColor Yellow

if (Test-Path .env.local) {
    Write-Host "  [OK] .env.local exists" -ForegroundColor Green
    
    $envContent = Get-Content .env.local
    if ($envContent -match "NEXT_PUBLIC_SUPABASE_URL=") {
        Write-Host "  [OK] Supabase URL configured" -ForegroundColor Green
    } else {
        Write-Host "  [WARN] Supabase URL not configured - edit .env.local" -ForegroundColor Yellow
    }
} else {
    Write-Host "  [INFO] Creating .env.local from .env.example..." -ForegroundColor Yellow
    if (Test-Path .env.example) {
        Copy-Item .env.example .env.local
        Write-Host "  [OK] .env.local created - please edit with your keys" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] .env.example not found" -ForegroundColor Red
    }
}

# Run build test
Write-Host ""
Write-Host "[4/5] Running build test..." -ForegroundColor Yellow
$buildResult = pnpm build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  [OK] Build successful!" -ForegroundColor Green
} else {
    Write-Host "  [FAIL] Build failed - check errors above" -ForegroundColor Red
}

# Git initialization
Write-Host ""
Write-Host "[5/5] Checking Git repository..." -ForegroundColor Yellow

if (Test-Path .git) {
    Write-Host "  [OK] Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "  [INFO] Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "  [OK] Git initialized" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Next steps to push to GitHub:" -ForegroundColor Cyan
    Write-Host "  1. Create repo at github.com/new" -ForegroundColor White
    Write-Host "  2. Run: git remote add origin https://github.com/YOUR_USERNAME/portfolio.git" -ForegroundColor White
    Write-Host "  3. Run: git add . && git commit -m 'Initial commit' && git push -u origin main" -ForegroundColor White
}

# Summary
Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Edit .env.local with your Supabase keys" -ForegroundColor White
Write-Host "  2. Configure email provider (Resend or Gmail)" -ForegroundColor White
Write-Host "  3. Run: pnpm dev" -ForegroundColor White
Write-Host "  4. Open: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "See QUICK_START.md for full deployment guide!" -ForegroundColor Cyan
Write-Host ""
