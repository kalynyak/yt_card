# Push to GitHub - Instructions

## ✅ Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `yt-card` (or your preferred name)
4. Description: `YouTube Video Article Portal - Transform videos into engaging blog-style articles`
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

## ✅ Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these instead (they're already configured):

```bash
cd /Users/kalynyak/Documents/yt_card

# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/yt-card.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## 🔐 Authentication

If you're prompted for credentials:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your password)
  - Create one at: https://github.com/settings/tokens
  - Select scope: `repo` (full control of private repositories)

## 🚀 Alternative: Using SSH

If you have SSH keys set up with GitHub:

```bash
git remote add origin git@github.com:YOUR_USERNAME/yt-card.git
git push -u origin main
```

## ✅ Quick Copy-Paste Commands

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
cd /Users/kalynyak/Documents/yt_card
git remote add origin https://github.com/YOUR_USERNAME/yt-card.git
git branch -M main
git push -u origin main
```

## 📝 What's Already Done

✅ Git repository initialized
✅ All files committed
✅ .gitignore created
✅ Ready to push

You just need to create the GitHub repo and add the remote!

