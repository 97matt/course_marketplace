# 📋 How to Get Database Connection Info from pgAdmin4

Follow these steps to get your database connection details:

## Steps:

1. **Open pgAdmin4**

2. **Find your server connection:**
   - In the left panel, expand "Servers"
   - You'll see your PostgreSQL server (might be named "PostgreSQL 15" or similar)

3. **Get connection details:**
   - Right-click on your **Server** (not the database)
   - Select **Properties**
   - Go to the **Connection** tab
   - You'll see:
     - **Host name/address**: (usually `localhost` or `127.0.0.1`)
     - **Port**: (usually `5432`)
     - **Username**: (usually `postgres` or your username)
     - **Password**: (you'll need to enter this in the .env file)

4. **Check the database:**
   - Expand your server
   - Expand "Databases"
   - Make sure `course_marketplace` exists (if not, create it)

5. **Update `.env` file** with these values:
   ```env
   DB_USER=your_username_from_pgadmin
   DB_PASSWORD=your_password_from_pgadmin
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=course_marketplace
   ```

## Quick Test:

After updating `.env`, run:
```bash
npm run test-db
```

This will test your connection and show if it works!
