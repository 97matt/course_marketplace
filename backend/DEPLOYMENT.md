# 🚀 Backend Deployment Options

## Option 1: Railway (Recommended - Easiest)

Railway is perfect for Express + PostgreSQL apps.

1. **Sign up**: https://railway.app
2. **Create new project** → "Deploy from GitHub repo"
3. **Add PostgreSQL database**:
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will create a database and provide connection string
4. **Deploy your backend**:
   - Click "New" → "GitHub Repo" → Select your repo
   - Set root directory to `backend`
   - Add environment variables from your `.env` file
   - Railway will auto-deploy

**Cost**: Free tier available, then ~$5/month

---

## Option 2: Render

1. **Sign up**: https://render.com
2. **Create Web Service**:
   - Connect your GitHub repo
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
3. **Add PostgreSQL database**:
   - Create "PostgreSQL" database
   - Copy connection string to environment variables

**Cost**: Free tier available (spins down after inactivity)

---

## Option 3: Fly.io

1. **Install Fly CLI**: https://fly.io/docs/getting-started/installing-flyctl/
2. **Create app**: `fly launch` in backend directory
3. **Add PostgreSQL**: `fly postgres create`
4. **Deploy**: `fly deploy`

**Cost**: Free tier available

---

## Option 4: Keep Local + Use ngrok (For Testing)

If you want to keep running locally but make it accessible:

1. Install ngrok: https://ngrok.com
2. Run: `ngrok http 3000`
3. Use the ngrok URL in your frontend

**Note**: This is only for testing, not production!

---

## Environment Variables to Set

When deploying, make sure to set these in your hosting platform:

```
DB_USER=postgres
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
PORT=3000
JWT_SECRET=your_jwt_secret
```

---

## Reactivating Supabase (If Possible)

If your Supabase project is just paused:

1. Go to https://supabase.com/dashboard
2. Check if you can reactivate the project
3. If yes, you'll get your data back!
4. Update `.env` with Supabase connection string
