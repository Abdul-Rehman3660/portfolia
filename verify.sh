#!/bin/bash

# Portfolio Verification Script (Bash)
# Run: ./verify.sh

echo "================================="
echo "  Portfolio Verification Script"
echo "================================="
echo ""

ERROR_COUNT=0
WARNING_COUNT=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
GRAY='\033[0;90m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Helper functions
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}[OK]${NC} $1 exists"
        return 0
    else
        echo -e "${RED}[FAIL]${NC} $1 missing"
        ((ERROR_COUNT++))
        return 1
    fi
}

check_env_var() {
    if grep -q "^$1=" .env.local 2>/dev/null; then
        echo -e "${GREEN}[OK]${NC} $1 is set"
        return 0
    else
        echo -e "${RED}[FAIL]${NC} $1 missing"
        ((ERROR_COUNT++))
        return 1
    fi
}

# 1. File Structure Check
echo -e "\n${YELLOW}[1/6] File Structure${NC}"
check_file "package.json"
check_file "next.config.mjs"
check_file "app/layout.tsx"
check_file "app/page.tsx"
check_file "lib/supabase.ts"
check_file "tsconfig.json"

# 2. Environment Variables Check
echo -e "\n${YELLOW}[2/6] Environment Variables${NC}"
if [ -f .env.local ]; then
    check_env_var "NEXT_PUBLIC_SUPABASE_URL"
    check_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY"
else
    echo -e "${RED}[FAIL]${NC} .env.local not found"
    ((ERROR_COUNT++))
fi

# 3. Dependencies Check
echo -e "\n${YELLOW}[3/6] Dependencies${NC}"
if command -v pnpm &> /dev/null; then
    PM="pnpm"
elif command -v npm &> /dev/null; then
    PM="npm"
elif command -v yarn &> /dev/null; then
    PM="yarn"
else
    echo -e "${RED}[FAIL]${NC} No package manager found"
    ((ERROR_COUNT++))
fi

if [ -n "$PM" ]; then
    for dep in next react framer-motion lucide-react; do
        if $PM list "$dep" &>/dev/null; then
            version=$($PM list "$dep" 2>/dev/null | grep "$dep@" | head -1 | awk -F'@' '{print $2}')
            echo -e "${GREEN}[OK]${NC} $dep installed ($version)"
        else
            echo -e "${RED}[FAIL]${NC} $dep not found"
            ((ERROR_COUNT++))
        fi
    done
fi

if [ -d "node_modules" ]; then
    echo -e "${GREEN}[OK]${NC} node_modules exists"
else
    echo -e "${YELLOW}[WARN]${NC} node_modules missing - run: $PM install"
    ((WARNING_COUNT++))
fi

# 4. Build Check
echo -e "\n${YELLOW}[4/6] Build Test${NC}"
echo -e "${GRAY}Running: $pm build...${NC}"

if $PM build > build.log 2>&1; then
    echo -e "${GREEN}[OK]${NC} Build successful"
    grep -i "compiled successfully" build.log | while read line; do
        echo -e "${GRAY}  $line${NC}"
    done
    rm -f build.log
else
    echo -e "${RED}[FAIL]${NC} Build failed - see build.log for details"
    ((ERROR_COUNT++))
fi

# 5. Git Configuration Check
echo -e "\n${YELLOW}[5/6] Git Configuration${NC}"
if [ -d ".git" ]; then
    echo -e "${GREEN}[OK]${NC} Git repository initialized"
else
    echo -e "${YELLOW}[WARN]${NC} Not a git repository"
    ((WARNING_COUNT++))
fi

if grep -q "\.env" .gitignore 2>/dev/null; then
    echo -e "${GREEN}[OK]${NC} .env files excluded from git"
else
    echo -e "${YELLOW}[WARN]${NC} .env files may not be excluded"
    ((WARNING_COUNT++))
fi

# 6. Security Check
echo -e "\n${YELLOW}[6/6] Security Check${NC}"

# Check for exposed secrets in code
SECRETS_FOUND=false
for file in $(find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -not -path "./node_modules/*" -not -path "./.next/*"); do
    if grep -qE "(password|api[_-]?key|secret)\s*=\s*['\"][^'\"]+['\"]" "$file" 2>/dev/null; then
        echo -e "${YELLOW}[WARN]${NC} Possible secret in $file"
        SECRETS_FOUND=true
        ((WARNING_COUNT++))
    fi
done

if [ "$SECRETS_FOUND" = false ]; then
    echo -e "${GREEN}[OK]${NC} No obvious secrets detected in code"
fi

# Summary
echo ""
echo "================================="
echo -e "  ${CYAN}Verification Summary${NC}"
echo "================================="
echo ""

if [ $ERROR_COUNT -eq 0 ] && [ $WARNING_COUNT -eq 0 ]; then
    echo -e "  ${GREEN}All checks passed!${NC}"
    echo ""
    echo -e "  ${CYAN}Next steps:${NC}"
    echo -e "  - Run: $pm dev"
    echo -e "  - Open: http://localhost:3000"
elif [ $ERROR_COUNT -eq 0 ]; then
    echo -e "  ${YELLOW}Passed with $WARNING_COUNT warning(s)${NC}"
else
    echo -e "  ${RED}Failed with $ERROR_COUNT error(s)${NC}"
    echo -e "  Warnings: $WARNING_COUNT"
fi

echo ""
echo "================================="

# Exit with error code if failures
if [ $ERROR_COUNT -gt 0 ]; then
    exit 1
fi
