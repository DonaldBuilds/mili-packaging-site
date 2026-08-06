@echo off
rem ============================================
rem  Generic deploy script (no secrets, safe to commit)
rem  Requires CF_API_TOKEN env var set
rem ============================================
echo Building site...
call npm run build
if errorlevel 1 (
  echo Build failed!
  pause
  exit /b 1
)
echo Copying to dist-seo...
if exist dist-seo rmdir /s /q dist-seo
robocopy dist dist-seo /E /XF *.jpg *.jpeg *.png *.webp /NFL /NDL /NJH /NJS /NP >nul
echo Deploying to Cloudflare...
call node deploy.cjs
echo.
echo Done! Refresh mili-packaging.com
pause
