#!/usr/bin/env pwsh
# GitHub Pages Deployment Setup Script
# This script automates the git initialization and GitHub setup

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Pages Deployment Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version 2>$null
    Write-Host "✓ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git not found!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Step 1: Configure Git User" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$userName = Read-Host "Enter your name (e.g., John Doe)"
$userEmail = Read-Host "Enter your email (e.g., john@example.com)"

git config --global user.name "$userName"
git config --global user.email "$userEmail"

Write-Host "✓ Git user configured" -ForegroundColor Green
Write-Host ""

Write-Host "Step 2: Initialize Repository" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if (Test-Path ".git") {
    Write-Host "✓ Repository already initialized" -ForegroundColor Green
} else {
    git init
    Write-Host "✓ Repository initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "Staging all files..." -ForegroundColor Yellow
git add .

Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit - portfolio website configured for GitHub Pages"

Write-Host "✓ Files staged and committed" -ForegroundColor Green
Write-Host ""

Write-Host "Step 3: Add GitHub Remote" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Go to GitHub and create a new repository:" -ForegroundColor Yellow
Write-Host "   https://github.com/new" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Name it 'portfolio' and click 'Create repository'" -ForegroundColor Yellow
Write-Host ""

$repoUrl = Read-Host "Paste your GitHub repository URL (https://github.com/username/portfolio.git)"

if (-not $repoUrl) {
    Write-Host "✗ Repository URL is required" -ForegroundColor Red
    exit 1
}

git remote add origin "$repoUrl" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Remote might already exist, updating..." -ForegroundColor Yellow
    git remote set-url origin "$repoUrl"
}

Write-Host "✓ GitHub remote added" -ForegroundColor Green
Write-Host ""

Write-Host "Step 4: Push to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

git branch -M main
Write-Host "✓ Branch renamed to 'main'" -ForegroundColor Green

Write-Host ""
Write-Host "Pushing to GitHub (this may take a moment)..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Successfully pushed to GitHub" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to push to GitHub" -ForegroundColor Red
    Write-Host "Make sure you have internet connection and correct repository URL" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✓ Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to: https://github.com/$(($repoUrl -split '/')[-2])/$(($repoUrl -split '/')[-1] -replace '.git')" -ForegroundColor Cyan
Write-Host "2. Click 'Settings' → 'Pages'" -ForegroundColor Cyan
Write-Host "3. Select 'GitHub Actions' as source" -ForegroundColor Cyan
Write-Host "4. Wait for deployment to complete (check Actions tab)" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your site will be live at:" -ForegroundColor Green
Write-Host "https://$(($repoUrl -split '/')[-2]).github.io/$(($repoUrl -split '/')[-1] -replace '.git')" -ForegroundColor Green
Write-Host ""
