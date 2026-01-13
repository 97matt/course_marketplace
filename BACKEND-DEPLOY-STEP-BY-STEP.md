# 🚀 Backend Deployment - Step by Step Guide

## Option 1: Railway (Easiest - Recommended)

### Step 1: Sign Up
1. Go to https://railway.app
2. Click "Start a New Project"
3. Sign up with GitHub (easiest way)
4. Authorize Railway to access your GitHub

### Step 2: Create Project
1. After signing in, click "New Project"
2. Select "Deploy from GitHub repo"
3. Find and select `course_marketplace` repository
4. Click "Deploy Now"

### Step 3: Configure Backend
1. Railway will start deploying
2. Click on the service that was created
3. Go to "Settings" tab
4. Find "Root Directory" setting
5. Change it to: `backend`
6. Click "Save"

### Step 4: Add PostgreSQL Database
1. In your Railway project dashboard, click "New"
2. Select "Database" → "Add PostgreSQL"
3. Wait for database to be created (~30 seconds)
4. Click on the PostgreSQL service
5. Go to "Variables" tab
6. You'll see connection details:
   - `PGHOST`
   - `PGPORT`
   - `PGDATABASE`
   - `PGUSER`
   - `PGPASSWORD`

### Step 5: Set Environment Variables
1. Go back to your backend service (not the database)
2. Click "Variables" tab
3. Add these variables (click "New Variable" for each):
   - `DB_USER` = (value from PGUSER)
   - `DB_PASSWORD` = (value from PGPASSWORD)
   - `DB_HOST` = (value from PGHOST)
   - `DB_PORT` = (value from PGPORT, usually 5432)
   - `DB_NAME` = (value from PGDATABASE)
   - `PORT` = `3000`
   - `JWT_SECRET` = (any random string, e.g., `your_secret_key_123`)

### Step 6: Initialize Database
1. Railway should auto-deploy after you add variables
2. Once deployed, you'll get a URL like: `https://your-app.railway.app`
3. Test it: Visit `https://your-app.railway.app/test-db`
4. If it works, you need to initialize tables:
   - Go to Railway dashboard
   - Click on your backend service
   - Go to "Deployments" tab
   - Click on the latest deployment
   - Click "View Logs"
   - You'll see the deployment logs

### Step 7: Run Database Initialization
**Option A: Using Railway's built-in terminal**
1. In Railway dashboard, click on your backend service
2. Click "Deployments" → Latest deployment
3. Look for "Shell" or "Terminal" option
4. Run: `npm run init-db`

**Option B: Using Railway CLI** (if available)
1. Install Railway CLI: `npm i -g @railway/cli`
2. Run: `railway run npm run init-db`

**Option C: Manual SQL** (if above don't work)
1. Go to your PostgreSQL service in Railway
2. Click "Connect" or "Query" tab
3. Copy the SQL from `backend/init-db.sql`
4. Run it in the query editor

### Step 8: Get Your Backend URL
1. In Railway dashboard, click on your backend service
2. Go to "Settings" → "Domains"
3. You'll see your URL: `https://your-app.railway.app`
4. **Copy this URL** - you'll need it for Vercel!

### Step 9: Update CORS (Important!)
1. Your backend needs to allow your Vercel frontend URL
2. Once you deploy frontend, you'll get a Vercel URL
3. Update `backend/app.js` CORS settings to include your Vercel URL
4. Or for now, you can temporarily allow all origins for testing

---

## What You'll Need to Tell Me

After you complete the steps above, tell me:
1. Your Railway backend URL (e.g., `https://your-app.railway.app`)
2. If the database initialization worked
3. Any errors you encountered

Then we'll deploy the frontend to Vercel!
