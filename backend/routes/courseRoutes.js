const express = require('express')
const router = express.Router()
const { createCourse, getAllCourses, getCourseById, deleteCourse, getCoursesByIdProfessor, getFilteredCourses } = require('../controllers/courseController')
const authMiddleware = require('../middleware/authMiddleware')

// Route for teachers to create a new course
//////>>>>>>>>>>>>>     QUITE EL TOKEN
router.post('/', createCourse)

//Route to get filtered & paginated courses
router.get('/filtered', getFilteredCourses)

// Route to get all courses
router.get('/', getAllCourses)

// Route to get details of a specific course
router.get('/:id', getCourseById)

// Route to delete course
router.delete('/:id', authMiddleware, deleteCourse)

//////// AH >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.get('/professor/:id', getCoursesByIdProfessor)


module.exports = router