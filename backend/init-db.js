const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Database connection configuration
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
});

async function initDatabase() {
    const client = await pool.connect();
    
    try {
        console.log('📦 Connecting to database...');
        
        // Read and execute the SQL file
        const sqlFile = path.join(__dirname, 'init-db.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');
        
        console.log('📝 Executing database schema...');
        await client.query(sql);
        
        console.log('✅ Database initialized successfully!');
        console.log('📊 Tables created: users, courses, user_course, likes');
        
    } catch (error) {
        console.error('❌ Error initializing database:', error.message);
        
        // If database doesn't exist, try to create it
        if (error.message.includes('does not exist')) {
            console.log('💡 Database does not exist. Creating database...');
            try {
                // Connect to default postgres database to create the new database
                const adminIsNeon = process.env.DB_HOST && process.env.DB_HOST.includes('neon.tech');
                const adminIsSupabase = process.env.DB_HOST && process.env.DB_HOST.includes('supabase');
                
                const adminPool = new Pool({
                    user: process.env.DB_USER || 'postgres',
                    password: process.env.DB_PASSWORD || '',
                    host: process.env.DB_HOST || 'localhost',
                    port: process.env.DB_PORT || 5432,
                    database: 'postgres',
                    ssl: (adminIsNeon || adminIsSupabase) ? {
                        rejectUnauthorized: false
                    } : false
                });
                
                const adminClient = await adminPool.connect();
                const dbName = process.env.DB_NAME || process.env.PGDATABASE || 'course_marketplace';
                await adminClient.query(`CREATE DATABASE ${dbName}`);
                await adminClient.release();
                await adminPool.end();
                
                console.log(`✅ Database "${dbName}" created successfully!`);
                console.log('🔄 Please run this script again to create tables.');
                
            } catch (createError) {
                console.error('❌ Error creating database:', createError.message);
                console.log('\n💡 Please create the database manually:');
                console.log(`   CREATE DATABASE ${process.env.DB_NAME || 'course_marketplace'};`);
            }
        }
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

initDatabase();
