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

// Image URLs from Unsplash (free, reliable, high quality)
// Each image matches the course category/topic
const courseImages = {
    1: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop', // web development
    2: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop', // HTML/CSS/JS
    3: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop', // Python
    4: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop', // Java
    5: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop', // Graphic Design
    6: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', // Digital Marketing
    7: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop', // Cybersecurity
    8: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', // Data Science
    9: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop', // Finance
    10: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop', // Languages
    11: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop', // Photography
    12: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop', // Music
    13: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop', // Business
    14: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop', // Health
    15: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop' // Other/Skills
};

async function updateCourseImages() {
    const client = await pool.connect();
    
    try {
        console.log('🖼️  Updating course images with online URLs...\n');
        
        // Get all courses
        const coursesResult = await client.query('SELECT course_id, course_title FROM courses ORDER BY course_id');
        
        for (const course of coursesResult.rows) {
            const imageUrl = courseImages[course.course_id];
            if (imageUrl) {
                await client.query(
                    'UPDATE courses SET course_img = $1 WHERE course_id = $2',
                    [imageUrl, course.course_id]
                );
                console.log(`✅ Updated: ${course.course_title.substring(0, 40)}...`);
            }
        }
        
        console.log('\n🎉 All course images updated!');
        console.log('\n💡 Images are now using Unsplash URLs (free, reliable, high quality)');
        console.log('   You can always change these later to your own images if needed.');
        
    } catch (error) {
        console.error('❌ Error updating images:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

updateCourseImages();
