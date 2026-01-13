const { Pool } = require('pg');
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

async function createLikes() {
    const client = await pool.connect();
    
    try {
        console.log('❤️ Creating likes for courses...\n');
        
        // Get students and courses
        const studentsResult = await client.query('SELECT user_id FROM users WHERE user_rol = \'student\' ORDER BY user_id LIMIT 6');
        const coursesResult = await client.query('SELECT course_id FROM courses ORDER BY course_id LIMIT 3');
        
        const students = studentsResult.rows.map(s => s.user_id);
        const courses = coursesResult.rows.map(c => c.course_id);
        
        if (students.length < 6 || courses.length < 3) {
            console.error('❌ Not enough students or courses');
            return;
        }
        
        // Course 1: 3 likes (students 0, 1, 2)
        console.log(`📚 Course ${courses[0]}: Adding 3 likes...`);
        for (let i = 0; i < 3; i++) {
            await client.query(
                'INSERT INTO likes (user_id, course_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                [students[i], courses[0]]
            );
            console.log(`  ✅ Student ${students[i]} liked course ${courses[0]}`);
        }
        
        // Course 2: 2 likes (students 3, 4)
        console.log(`\n📚 Course ${courses[1]}: Adding 2 likes...`);
        for (let i = 3; i < 5; i++) {
            await client.query(
                'INSERT INTO likes (user_id, course_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                [students[i], courses[1]]
            );
            console.log(`  ✅ Student ${students[i]} liked course ${courses[1]}`);
        }
        
        // Course 3: 1 like (student 5)
        console.log(`\n📚 Course ${courses[2]}: Adding 1 like...`);
        await client.query(
            'INSERT INTO likes (user_id, course_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [students[5], courses[2]]
        );
        console.log(`  ✅ Student ${students[5]} liked course ${courses[2]}`);
        
        console.log('\n🎉 Likes created successfully!');
        
        // Show summary
        const likesResult = await client.query(`
            SELECT 
                c.course_id,
                c.course_title,
                COUNT(l.like_id) as like_count
            FROM courses c
            LEFT JOIN likes l ON c.course_id = l.course_id
            GROUP BY c.course_id, c.course_title
            ORDER BY like_count DESC
            LIMIT 5
        `);
        
        console.log('\n📊 Top Liked Courses:');
        likesResult.rows.forEach(row => {
            console.log(`  ${row.course_title.substring(0, 40)}... - ${row.like_count} likes`);
        });
        
    } catch (error) {
        console.error('❌ Error creating likes:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

createLikes();
