const { Pool } = require('pg');
require('dotenv').config();

// Try to connect with current .env settings
const isNeon = process.env.DB_HOST && process.env.DB_HOST.includes('neon.tech');
const isSupabase = process.env.DB_HOST && process.env.DB_HOST.includes('supabase');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'course_marketplace',
    ssl: (isNeon || isSupabase) ? {
        rejectUnauthorized: false // Required for Neon and Supabase
    } : false
});

async function testConnection() {
    console.log('🔍 Testing database connection...\n');
    console.log('Current settings:');
    console.log(`  Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`  Port: ${process.env.DB_PORT || 5432}`);
    console.log(`  Database: ${process.env.DB_NAME || 'course_marketplace'}`);
    console.log(`  User: ${process.env.DB_USER || 'postgres'}`);
    console.log(`  Password: ${process.env.DB_PASSWORD ? '***' : '(empty)'}\n`);

    try {
        const client = await pool.connect();
        console.log('✅ Connection successful!');
        
        // Test query
        const result = await client.query('SELECT NOW()');
        console.log('✅ Database is responding:', result.rows[0].now);
        
        // Check if tables exist
        const tablesResult = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        `);
        
        console.log('\n📊 Existing tables:');
        if (tablesResult.rows.length === 0) {
            console.log('  (no tables found - database needs initialization)');
        } else {
            tablesResult.rows.forEach(row => {
                console.log(`  - ${row.table_name}`);
            });
        }
        
        client.release();
        await pool.end();
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Connection failed:', error.message);
        console.error('\n💡 To find your connection details in pgAdmin4:');
        console.error('   1. Open pgAdmin4');
        console.error('   2. Right-click on your "course_marketplace" database');
        console.error('   3. Select "Properties" → "Connection" tab');
        console.error('   4. Check the Host, Port, and Username');
        console.error('   5. Update your .env file with these values\n');
        process.exit(1);
    }
}

testConnection();
