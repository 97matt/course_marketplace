const db = require('../models/db')

const enrollInCourse = async (req, res) => {
    const user_id = req.body.user_id;
    const course_id = req.body.course_id;

    try {
        // 1) Ensure only students can enroll
        /*if (user_rol !== 'student') return res.status(403).json({ error: 'Only students can enroll in courses' })*/

        // 2) Check if course exists
        const courseQuery = 'SELECT * FROM courses WHERE course_id = $1'
        const courseResult = await db.query(courseQuery, [course_id])

        if (courseResult.rows.length === 0) return res.status(404).json({ error: 'Course not found' })

        // 3) Check if already enrolled
        const existingQuery = 'SELECT * FROM user_course WHERE user_id = $1 AND course_id = $2'
        const existingResult = await db.query(existingQuery, [user_id, course_id])

        if (existingResult.rows.length > 0) return res.status(404).json({ error: 'Already enrolled in this course' })

        // 4) Insert enrollment
        const enrollQuery = 'INSERT INTO user_course (user_id, course_id) VALUES ($1, $2) RETURNING *'
        const enrollResult = await db.query(enrollQuery, [user_id, course_id])

        res.status(201).json({
            message: 'Enrolled succesfully',
            enrollment: enrollResult.rows[0],
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error enrolling in course' })
    }
}

const unenrollFromCourse = async (req, res) => {
    const userCourseId = req.params.user_course_id;
    console.log('estor en unenrollment')

    try {
        const deleteQuery = 'DELETE FROM user_course WHERE user_course_id = $1';
        await db.query(deleteQuery, [userCourseId]);

        res.json({ message: 'Unenrolled successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error unenrolling from course' });
    }
};


// Obtener todos los cursos en los que un estudiante esta inscrito
const getStudentCourses = async (req, res) => {
    const userId = req.params.id;
    try {
        const enrollmentQuery = `
            SELECT *
            FROM user_course
            WHERE user_id = $1
        `;
        const result = await db.query(enrollmentQuery, [userId]);
        res.json({ courses: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching enrolled courses' });
    }
};


module.exports = {
    enrollInCourse,
    unenrollFromCourse,
    getStudentCourses,
}