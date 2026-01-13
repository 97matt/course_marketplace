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

// Courses for all categories - at least 1 per category
// Different prices and assigned to different professors
const courses = [
    // web_development
    { title: 'Desarrollo Web Completo con React y Node.js', category: 'web_development', description: 'Aprende a crear aplicaciones web modernas desde cero usando React para el frontend y Node.js para el backend. Incluye proyectos prácticos.', price: 89.99, professor_id: 1, start_date: '2025-02-15', img: 'default_course.png' },
    { title: 'HTML5, CSS3 y JavaScript Avanzado', category: 'web_development', description: 'Domina las tecnologías fundamentales del desarrollo web con técnicas modernas y mejores prácticas.', price: 49.99, professor_id: 2, start_date: '2025-02-20', img: 'default_course.png' },
    
    // programming
    { title: 'Python para Principiantes y Avanzados', category: 'programming', description: 'Curso completo de Python desde lo básico hasta programación orientada a objetos y manejo de datos.', price: 79.99, professor_id: 3, start_date: '2025-02-10', img: 'default_course.png' },
    { title: 'Java: Fundamentos y Desarrollo de Aplicaciones', category: 'programming', description: 'Aprende Java desde cero y desarrolla aplicaciones robustas y escalables.', price: 94.99, professor_id: 4, start_date: '2025-02-25', img: 'default_course.png' },
    
    // graphic_design
    { title: 'Diseño Gráfico con Adobe Photoshop e Illustrator', category: 'graphic_design', description: 'Domina las herramientas esenciales de diseño gráfico y crea diseños profesionales.', price: 69.99, professor_id: 5, start_date: '2025-03-01', img: 'default_course.png' },
    
    // digital_marketing
    { title: 'Marketing Digital: SEO, SEM y Redes Sociales', category: 'digital_marketing', description: 'Estrategias completas de marketing digital para hacer crecer tu negocio online.', price: 84.99, professor_id: 1, start_date: '2025-03-05', img: 'default_course.png' },
    
    // cybersecurity
    { title: 'Ciberseguridad: Protección de Datos y Sistemas', category: 'cybersecurity', description: 'Aprende a proteger sistemas, redes y datos contra amenazas cibernéticas.', price: 119.99, professor_id: 2, start_date: '2025-03-10', img: 'default_course.png' },
    
    // data_science
    { title: 'Ciencia de Datos con Python y Machine Learning', category: 'data_science', description: 'Análisis de datos, visualización y machine learning para tomar decisiones basadas en datos.', price: 99.99, professor_id: 3, start_date: '2025-03-15', img: 'default_course.png' },
    
    // finance
    { title: 'Finanzas Personales y Contabilidad Básica', category: 'finance', description: 'Gestiona tus finanzas personales y aprende los fundamentos de la contabilidad.', price: 59.99, professor_id: 4, start_date: '2025-03-20', img: 'default_course.png' },
    
    // languages
    { title: 'Inglés para Negocios y Comunicación Profesional', category: 'languages', description: 'Mejora tu inglés para el entorno profesional y de negocios.', price: 74.99, professor_id: 5, start_date: '2025-03-25', img: 'default_course.png' },
    
    // photography
    { title: 'Fotografía Digital: Técnicas y Composición', category: 'photography', description: 'Domina la fotografía digital, desde conceptos básicos hasta técnicas avanzadas de composición.', price: 64.99, professor_id: 1, start_date: '2025-04-01', img: 'default_course.png' },
    
    // music
    { title: 'Producción Musical con Ableton Live', category: 'music', description: 'Aprende a producir música electrónica y crear tus propias composiciones.', price: 89.99, professor_id: 2, start_date: '2025-04-05', img: 'default_course.png' },
    
    // business
    { title: 'Emprendimiento: De la Idea al Negocio', category: 'business', description: 'Guía completa para iniciar y hacer crecer tu propio negocio desde cero.', price: 79.99, professor_id: 3, start_date: '2025-04-10', img: 'default_course.png' },
    
    // health
    { title: 'Bienestar y Salud Mental: Mindfulness y Estrés', category: 'health', description: 'Técnicas prácticas para mejorar tu bienestar mental y físico en la vida diaria.', price: 54.99, professor_id: 4, start_date: '2025-04-15', img: 'default_course.png' },
    
    // other
    { title: 'Habilidades Blandas: Liderazgo y Comunicación', category: 'other', description: 'Desarrolla habilidades esenciales para el éxito profesional y personal.', price: 69.99, professor_id: 5, start_date: '2025-04-20', img: 'default_course.png' }
];

async function createCourses() {
    const client = await pool.connect();
    
    try {
        console.log('📚 Creating courses for all categories...\n');
        
        for (const course of courses) {
            await client.query(
                `INSERT INTO courses (course_title, course_professor, course_category, course_description, course_price, course_start_date, course_img)
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [course.title, course.professor_id, course.category, course.description, course.price, course.start_date, course.img]
            );
            
            console.log(`✅ Created: ${course.title} (${course.category}) - $${course.price}`);
        }
        
        console.log('\n🎉 All courses created successfully!');
        
        // Show summary by category
        const result = await client.query(
            'SELECT course_category, COUNT(*) as count FROM courses GROUP BY course_category ORDER BY course_category'
        );
        console.log('\n📊 Courses by Category:');
        result.rows.forEach(row => {
            console.log(`  ${row.course_category}: ${row.count} course(s)`);
        });
        
    } catch (error) {
        console.error('❌ Error creating courses:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

createCourses();
