# 🚀 Backend Setup Instructions

## Prerequisites

You need a PostgreSQL database. You have two options:

### Option 1: Local PostgreSQL (Recommended for Development)

1. **Install PostgreSQL** (if not already installed):
   - Windows: Download from https://www.postgresql.org/download/windows/
   - Or use a package manager like Chocolatey: `choco install postgresql`

2. **Create the database**:
   ```sql
   CREATE DATABASE course_marketplace;
   ```

3. **Update `.env` file** with your PostgreSQL credentials:
   ```env
   DB_USER=postgres
   DB_PASSWORD=your_postgres_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=course_marketplace
   ```

### Option 2: Supabase (Cloud Database)

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to **Settings** → **Database**
3. Copy the connection details
4. Update `.env` file:
   ```env
   DB_USER=postgres
   DB_PASSWORD=your_supabase_password
   DB_HOST=db.sdauswbtuhvswetrdvji.supabase.co
   DB_PORT=5432
   DB_NAME=postgres
   ```

## Setup Steps

1. **Install dependencies** (if not done):
   ```bash
   npm install
   ```

2. **Configure database** in `.env` file (see options above)

3. **Initialize database tables**:
   ```bash
   npm run init-db
   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:3000`

## Troubleshooting

- **"password authentication failed"**: Check your `.env` file has the correct database password
- **"database does not exist"**: Create the database first: `CREATE DATABASE course_marketplace;`
- **"connection refused"**: Make sure PostgreSQL is running locally, or check your Supabase connection string
