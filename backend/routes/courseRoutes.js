const express = require('express')
const router = express.Router()
const { createCourse, getAllCourses, getCourseById, deleteCourse } = require('../controllers/courseController')
const authMiddleware = require('../middleware/authMiddleware')

// Route for teachers to create a new course
router.post('/', authMiddleware, createCourse)

// Route to get all courses
router.get('/', getAllCourses)

// Route to get details of a specific course
router.get('/:id', getCourseById)

// Route to delete course
router.delete('/:id', authMiddleware, deleteCourse)

module.exports = router