const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

const users = [
    // Professors
    { username: 'manuelperez', password: 'profesor', first: 'Manuel', last: 'Perez', role: 'professor' },
    { username: 'isabellcastillo', password: 'profesor', first: 'Isabell', last: 'Castillo', role: 'professor' },
    { username: 'mariamoras', password: 'profesor', first: 'Maria', last: 'Moras', role: 'professor' },
    { username: 'lingolinguini', password: 'profesor', first: 'Lingo', last: 'Linguini', role: 'professor' },
    
    // Students
    { username: 'alejandromartinez', password: 'student', first: 'Alejandro', last: 'Martinez', role: 'student' },
    { username: 'jeremygonzalez', password: 'student', first: 'Jeremy', last: 'Gonzalez', role: 'student' },
    { username: 'nicolaraya', password: 'student', first: 'Nicola', last: 'Raya', role: 'student' },
    { username: 'mariosunshine', password: 'student', first: 'Mario', last: 'Sunshine', role: 'student' },
    { username: 'luigismansion', password: 'student', first: 'Luigis', last: 'Mansion', role: 'student' },
    { username: 'maikoljaison', password: 'student', first: 'Maikol', last: 'Jaison', role: 'student' }
];

async function createUsers() {
    const client = await pool.connect();
    
    try {
        console.log('👥 Creating users...\n');
        
        for (const user of users) {
            // Hash password
            const hashedPassword = await bcrypt.hash(user.password, 10);
            
            // Insert user
            await client.query(
                `INSERT INTO users (user_name, user_first_name, user_last_name, user_email, user_password, user_rol, user_img)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)
                 ON CONFLICT (user_name) DO UPDATE SET
                 user_first_name = EXCLUDED.user_first_name,
                 user_last_name = EXCLUDED.user_last_name,
                 user_email = EXCLUDED.user_email,
                 user_password = EXCLUDED.user_password,
                 user_rol = EXCLUDED.user_rol`,
                [user.username, user.first, user.last, `${user.username}@gmail.com`, hashedPassword, user.role, 'default.png']
            );
            
            console.log(`✅ Created: ${user.username} (${user.role})`);
        }
        
        console.log('\n🎉 All users created successfully!');
        
        // Show summary
        const result = await client.query('SELECT COUNT(*) as count, user_rol FROM users GROUP BY user_rol');
        console.log('\n📊 Summary:');
        result.rows.forEach(row => {
            console.log(`  ${row.user_rol}: ${row.count}`);
        });
        
    } catch (error) {
        console.error('❌ Error creating users:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

createUsers();
