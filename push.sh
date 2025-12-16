#!/bin/bash
# Script to push YouTube Video Card Portal to GitHub
# Run this after creating the repository on GitHub

echo "🚀 Pushing YouTube Video Card Portal to GitHub..."
echo ""

# Replace 'yt-card' with your actual repository name if different
REPO_NAME="yt-card"
GITHUB_USER="kalynyak"

# Add remote (if not already added)
if ! git remote get-url origin &> /dev/null; then
    echo "📡 Adding GitHub remote..."
    git remote add origin https://github.com/${GITHUB_USER}/${REPO_NAME}.git
else
    echo "✅ Remote already configured"
fi

# Ensure we're on main branch
git branch -M main

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Done! Your code is now on GitHub!"
echo "🌐 View it at: https://github.com/${GITHUB_USER}/${REPO_NAME}"

