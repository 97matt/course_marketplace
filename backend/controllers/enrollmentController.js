const db = require('../models/db')

const enrollInCourse = async (req, res) => {
    const userId = req.user.userId      // comes from JWT middleware
    const userRole = req.user.role     // comes from JWT middleware
    const { courseId } = req.params   // courseId from route parameter

    try {
        // 1) Ensure only students can enroll
        if (userRole !== 'student') {
            return res.status(403).json({ error: 'Only students can enroll in courses' })
        }
        // 2) Check if course exists
        const courseQuery = 'SELECT * FROM courses WHERE course_id = $1'
        const courseResult = await db.query(courseQuery, [courseId])

        if (courseResult.rows.length === 0) {
            return res.status(404).json({ error: 'Course not found' })
        }
        // 3) Check if already enrolled
        const existingQuery = 'SELECT * FROM user_course WHERE user_id = $1 AND course_id = $2'
        const existingResult = await db.query(existingQuery, [userId, courseId])

        if (existingResult.rows.length > 0) {
            return res.status(404).json({ error: 'Already enrolled in this course' })
        }
        // 4) Insert enrollment
        const enrollQuery = 'INSERT INTO user_course (user_id, course_id) VALUES ($1, $2) RETURNING *'
        const enrollResult = await db.query(enrollQuery, [userId, courseId])

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
    const userId = req.user.userId
    const userRole = req.user.role
    const { courseId } = req.params

    try {
        // 1) Only students can unenroll
        if (userRole !== 'student') {
            return res.status(403).json({ error: 'Only students can unenroll from courses' })
        }
        // 2) Check if enrollment exists
        const checkQuery = 'SELECT * FROM user_course WHERE user_id = $1 AND course_id = $2'
        const checkResult = await db.query(checkQuery, [userId, courseId])

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ error: 'Enrollment not found' })
        }
        // 3) Delete enrollment 
        const deleteQuery = 'DELETE FROM user_course WHERE user_id = $1 AND course_id = $2'
        await db.query(deleteQuery, [userId, courseId])

        res.json({ message: 'Unenrolled successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error unenrolling from course' })
    }
}



module.exports = {
    enrollInCourse,
    unenrollFromCourse,
}