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

const createLikesTable = async () => {
    try {
        const result = await pool.query(`
            CREATE TABLE likes (
                like_id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
                course_id INTEGER REFERENCES courses(course_id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (user_id, course_id)
            )
        `)
        console.log('Likes table created succesfully.')
    } catch (error) {
        console.error('Error creating likes table;', error.message)
    } finally {
        pool.end()
    }
}

createLikesTable()