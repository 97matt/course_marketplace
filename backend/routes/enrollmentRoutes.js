const express = require('express')
const router = express.Router()
const { enrollInCourse, unenrollFromCourse, getStudentCourses } = require('../controllers/enrollmentController')
const authMiddleware = require('../middleware/authMiddleware')

//Route for students to enroll in a course
router.post('/:courseId', authMiddleware, enrollInCourse)

//Unenroll from course
router.delete('/:courseId', authMiddleware, unenrollFromCourse)

//Route to get courses in which student is enrolled in
router.get('/my-courses', authMiddleware, getStudentCourses)


module.exports = router