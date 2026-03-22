# Portfolio Verification Script (PowerShell)
# Run: .\verify.ps1

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "  Portfolio Verification Script" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

$ErrorCount = 0
$WarningCount = 0

# Helper functions
function Check-File {
    param($Path)
    if (Test-Path $Path) {
        Write-Host "[OK] $Path exists" -ForegroundColor Green
        return $true
    } else {
        Write-Host "[FAIL] $Path missing" -ForegroundColor Red
        $script:ErrorCount++
        return $false
    }
}

function Check-EnvVar {
    param($Name)
    $content = Get-Content .env.local -ErrorAction SilentlyContinue
    if ($content -match "^$Name=") {
        Write-Host "[OK] $Name is set" -ForegroundColor Green
        return $true
    } else {
        Write-Host "[FAIL] $Name missing" -ForegroundColor Red
        $script:ErrorCount++
        return $false
    }
}

function Check-Command {
    param($Command)
    try {
        $result = Invoke-Expression $Command 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[OK] $Command" -ForegroundColor Green
            return $true
        }
    } catch {}
    Write-Host "[FAIL] $Command" -ForegroundColor Red
    $script:ErrorCount++
    return $false
}

# 1. File Structure Check
Write-Host "`n[1/6] File Structure" -ForegroundColor Yellow
Check-File "package.json"
Check-File "next.config.mjs"
Check-File "app/layout.tsx"
Check-File "app/page.tsx"
Check-File "lib/supabase.ts"
Check-File "tsconfig.json"

# 2. Environment Variables Check
Write-Host "`n[2/6] Environment Variables" -ForegroundColor Yellow
if (Test-Path .env.local) {
    Check-EnvVar "NEXT_PUBLIC_SUPABASE_URL"
    Check-EnvVar "NEXT_PUBLIC_SUPABASE_ANON_KEY"
} else {
    Write-Host "[FAIL] .env.local not found" -ForegroundColor Red
    $script:ErrorCount++
}

# 3. Dependencies Check
Write-Host "`n[3/6] Dependencies" -ForegroundColor Yellow
$packageJson = Get-Content package.json -Raw | ConvertFrom-Json
$requiredDeps = @("next", "react", "framer-motion", "lucide-react")
foreach ($dep in $requiredDeps) {
    if ($packageJson.dependencies.$dep) {
        Write-Host "[OK] $dep installed ($($packageJson.dependencies.$dep))" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] $dep not found" -ForegroundColor Red
        $script:ErrorCount++
    }
}

# Check node_modules
if (Test-Path node_modules) {
    Write-Host "[OK] node_modules exists" -ForegroundColor Green
} else {
    Write-Host "[WARN] node_modules missing - run: pnpm install" -ForegroundColor Yellow
    $script:WarningCount++
}

# 4. Build Check
Write-Host "`n[4/6] Build Test" -ForegroundColor Yellow
Write-Host "Running: pnpm build..." -ForegroundColor Gray

$buildOutput = & pnpm build 2>&1
$buildSuccess = $LASTEXITCODE -eq 0

if ($buildSuccess) {
    Write-Host "[OK] Build successful" -ForegroundColor Green
    # Extract key build info
    $buildOutput | Select-String "Compiled successfully" | ForEach-Object {
        Write-Host "  $($_.Line)" -ForegroundColor Gray
    }
} else {
    Write-Host "[FAIL] Build failed - see errors above" -ForegroundColor Red
    $script:ErrorCount++
}

# 5. Git Configuration Check
Write-Host "`n[5/6] Git Configuration" -ForegroundColor Yellow
if (Test-Path .git) {
    Write-Host "[OK] Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "[WARN] Not a git repository" -ForegroundColor Yellow
    $script:WarningCount++
}

# Check .gitignore for sensitive files
$gitignore = Get-Content .gitignore -ErrorAction SilentlyContinue
if ($gitignore -match "\.env") {
    Write-Host "[OK] .env files excluded from git" -ForegroundColor Green
} else {
    Write-Host "[WARN] .env files may not be excluded" -ForegroundColor Yellow
    $script:WarningCount++
}

# 6. Security Check
Write-Host "`n[6/6] Security Check" -ForegroundColor Yellow

# Check for exposed secrets in code
$exposedPatterns = @(
    "password\s*=\s*['\"][^'\"]+['\"]",
    "api[_-]?key\s*=\s*['\"][^'\"]+['\"]",
    "secret\s*=\s*['\"][^'\"]+['\"]"
)

$filesToScan = Get-ChildItem -Include *.ts,*.tsx,*.js,*.jsx -Recurse -Exclude node_modules,.next
$secretsFound = $false

foreach ($file in $filesToScan) {
    foreach ($pattern in $exposedPatterns) {
        $content = Get-Content $file.FullName -Raw
        if ($content -match $pattern) {
            Write-Host "[WARN] Possible secret in $($file.FullName)" -ForegroundColor Yellow
            $secretsFound = $true
            $script:WarningCount++
        }
    }
}

if (-not $secretsFound) {
    Write-Host "[OK] No obvious secrets detected in code" -ForegroundColor Green
}

# Summary
Write-Host "`n=================================" -ForegroundColor Cyan
Write-Host "  Verification Summary" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

if ($ErrorCount -eq 0 -and $WarningCount -eq 0) {
    Write-Host "  All checks passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Next steps:" -ForegroundColor Cyan
    Write-Host "  - Run: pnpm dev" -ForegroundColor White
    Write-Host "  - Open: http://localhost:3000" -ForegroundColor White
} elseif ($ErrorCount -eq 0) {
    Write-Host "  Passed with $WarningCount warning(s)" -ForegroundColor Yellow
} else {
    Write-Host "  Failed with $ErrorCount error(s)" -ForegroundColor Red
    Write-Host "  Warnings: $WarningCount" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan

# Exit with error code if failures
if ($ErrorCount -gt 0) {
    exit 1
}
