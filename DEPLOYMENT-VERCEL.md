# 🚀 Deploying to Vercel

## Frontend Deployment (Vercel)

### Step 1: Deploy Frontend to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Import your GitHub repo**:
   - Click "Add New" → "Project"
   - Import `course_marketplace` repository
   - **Root Directory**: Select `frontend` folder
   - Framework Preset: Vite (auto-detected)

3. **Configure Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Environment Variables** (IMPORTANT):
   - Go to Settings → Environment Variables
   - Add: `VITE_API_URL`
   - Value: Your backend URL (e.g., `https://your-backend.railway.app/api`)
   - Add to: Production, Preview, Development

5. **Deploy**: Click "Deploy"

---

## Backend Deployment (Railway or Render)

### Option 1: Railway (Recommended)

1. **Go to Railway**: https://railway.app
2. **Create new project** → "Deploy from GitHub repo"
3. **Select your repo** → Set root directory to `backend`
4. **Add PostgreSQL database**:
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will provide connection string
5. **Environment Variables**:
   - Add all variables from `backend/.env`
   - Update `DB_HOST`, `DB_USER`, `DB_PASSWORD`, etc. with Railway's values
6. **Deploy**: Railway auto-deploys

### Option 2: Render

1. **Go to Render**: https://render.com
2. **Create Web Service** → Connect GitHub repo
3. **Settings**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Add PostgreSQL Database**:
   - Create "PostgreSQL" database
   - Copy connection string
5. **Environment Variables**: Add all from `backend/.env`
6. **Deploy**: Render auto-deploys

---

## After Deployment

### Update Frontend Environment Variable

Once backend is deployed, update Vercel environment variable:
- `VITE_API_URL` = `https://your-backend-url.com/api`

### Test Your Deployment

1. Frontend: `https://your-app.vercel.app`
2. Backend: `https://your-backend.railway.app` or `.render.com`
3. Test API: `https://your-backend-url.com/api/courses/filtered`

---

## Important Notes

- ✅ `.env` files are NOT pushed to GitHub (safe)
- ✅ You need to set environment variables in Vercel/Railway dashboards
- ✅ Backend must be deployed first, then update frontend `VITE_API_URL`
- ✅ CORS is already configured for your frontend domain

---

## Quick Deploy Commands

If using Vercel CLI:
```bash
cd frontend
npm install -g vercel
vercel
```

Follow the prompts and set environment variables when asked.
