const { Pool } = require('pg')
require('dotenv').config()      //This loads .env variables

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false // Required for Supabase
    }
})

module.exports = {
    pool,
    query: (text, params) => pool.query(text, params),
}