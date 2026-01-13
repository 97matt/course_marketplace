# 🆓 Free Database Setup - Neon (Recommended)

## Why Neon?
- ✅ **FREE tier** - 0.5 GB storage, perfect for development
- ✅ **Doesn't pause/shut down** like Supabase
- ✅ **Serverless PostgreSQL** - fast and reliable
- ✅ **Easy to set up** - takes 5 minutes
- ✅ **Same PostgreSQL** - works with your existing code

## Setup Steps:

### 1. Create Neon Account
1. Go to https://neon.tech
2. Sign up with GitHub (easiest)
3. Click "Create Project"

### 2. Create Database
1. Name your project: `course_marketplace`
2. Select region closest to you
3. Click "Create Project"
4. Wait ~30 seconds for database to be created

### 3. Get Connection String
1. After creation, you'll see a connection string like:
   ```
   postgres://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```
2. Click "Connection Details" to see:
   - Host
   - Database name
   - User
   - Password
   - Port (usually 5432)

### 4. Update Your .env File
Update `backend/.env` with Neon credentials:
```env
DB_USER=neondb_owner
DB_PASSWORD=your_neon_password
DB_HOST=ep-xxx-xxx.region.aws.neon.tech
DB_PORT=5432
DB_NAME=neondb

PORT=3000
JWT_SECRET=course_marketplace_jwt_secret_key_2024
```

### 5. Initialize Database
```bash
cd backend
npm run init-db
```

That's it! Your database will stay active and won't pause.

---

## Alternative Free Options:

### ElephantSQL (Also Good)
- Free tier: 20 MB (smaller than Neon)
- Doesn't pause
- https://www.elephantsql.com

### Render (Free PostgreSQL)
- Free tier available
- Spins down after inactivity (but can wake up)
- https://render.com

---

**Recommendation: Use Neon** - It's the most reliable free option that won't shut down!
