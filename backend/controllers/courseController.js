const db = require('../models/db')


const createCourse = async (req, res) => {
    try {
        // 1) Check if the logged-in user is a teacher
        if (req.user.role !== 'teacher') {
            return res.status(403).json({ error: 'Only teachers can create courses' })
        }
        // 2) Get course details from the request body
        const { course_title, course_category, course_description, course_price, course_start_date, course_img } = req.body
        // 3) Validate required fields
        if (!course_title || !course_description || !course_price) {
            return res.status(400).json({ error: 'Missing course fields' })
        }
        // 4) Insert new course into the database
        const query = `
            INSERT INTO courses
                (course_title, course_professor, course_category, course_description, course_price, course_start_date, course_img)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `
        const values = [
            course_title,
            req.user.userId,    // course_professor: ID of the teacher creating the course
            course_category,
            course_description,
            course_price,
            course_start_date,
            course_img
        ]

        const result = await db.query(query, values)

        // 5) Return the created course details
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error creating course' })
    }
}



const getAllCourses = async (req,res) => {
    try {
        const query = 'SELECT * FROM courses ORDER BY course_id DESC'
        const result = await db.query(query)

        res.json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error retrieving courses' })
    }
}



const getCourseById = async (req, res) => {
    const { id } = req.params

    try {
        const query = 'SELECT * FROM courses WHERE course_id = $1'
        const result = await db.query(query, [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Course not found' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error retrieving course' })
    }
}



const deleteCourse = async (req, res) => {
    const { id } = req.params

    try {
        // 1) Get the course and check if it exists
        const courseQuery = 'SELECT * FROM courses WHERE course_id = $1'
        const courseResult = await db.query(courseQuery, [id])

        if (courseResult.rows.length === 0) {
            return res.status(404).json({ error: 'Course not found' })
        }

        const course = courseResult.rows[0]

        // 2) Only the teacher who owns the course can delete it
        if (course.course_professor != req.user.userId) {
            return res.status(403).json({ error: 'Unauthorized: you can only delete your own courses' })
        }

        // 3) Delete the course
        const deleteQuery = 'DELETE FROM courses WHERE course_id = $1'
        await db.query(deleteQuery, [id])

        res.json({ message: 'Course deleted succesfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error deleting course' })
    }
}



module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    deleteCourse,
}