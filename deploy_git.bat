@echo off
echo ==============================================
echo       ConnectWith Git Deployment Helper      
echo ==============================================
echo.

echo [1/4] Cleaning up nested Git repository in frontend...
rmdir /s /q frontend\.git 2>nul
if exist frontend\.git (
    echo WARNING: frontend\.git is locked by VS Code/IDE.
    echo Please close VS Code or restart your editor, then run this script again.
    pause
    exit /b
)

echo [2/4] Untracking backend/.env file from Git...
git rm --cached backend/.env 2>nul

echo [3/4] Adding and committing files...
git add .
git commit -m "fix: automate frontend build, dynamic api urls, and untrack env file"

echo [4/4] Pushing to GitHub (main)...
git push origin main

echo.
echo ==============================================
echo Deployment commands completed successfully!
echo ==============================================
pause
