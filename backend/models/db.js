const { Pool } = require('pg')
require('dotenv').config()      //This loads .env variables

// Support both DB_* and PG* environment variables
const isNeon = process.env.DB_HOST && process.env.DB_HOST.includes('neon.tech');
const isSupabase = process.env.DB_HOST && process.env.DB_HOST.includes('supabase');

const pool = new Pool({
    user: process.env.DB_USER || process.env.PGUSER || 'postgres',
    password: process.env.DB_PASSWORD || process.env.PGPASSWORD || '',
    host: process.env.DB_HOST || process.env.PGHOST || 'localhost',
    port: process.env.DB_PORT || process.env.PGPORT || 5432,
    database: process.env.DB_NAME || process.env.PGDATABASE || 'course_marketplace',
    ssl: (isNeon || isSupabase) ? {
        rejectUnauthorized: false // Required for Neon and Supabase
    } : false
})

module.exports = {
    pool,
    query: (text, params) => pool.query(text, params),
}