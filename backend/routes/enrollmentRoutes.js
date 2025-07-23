const express = require('express')
const router = express.Router()
const { enrollInCourse, unenrollFromCourse, getStudentCourses } = require('../controllers/enrollmentController')
const authMiddleware = require('../middleware/authMiddleware')

//Route for students to enroll in a course

// >>>>>>>>>>>>>>>>>> AH >>>>>>>>>>>>>>>>> modifique y quite el token
router.post('/', enrollInCourse)

//Unenroll from course
// >>>>>>>>>>>>>>>>>> AH >>>>>>>>>>>>>>>>> modifique y quite el token

router.delete('/:user_course_id', unenrollFromCourse)

//Route to get courses in which student is enrolled in
// >>>>>>>>>>>>>>>>>> AH >>>>>>>>>>>>>>>>> modifique y quite el token
router.get('/my-courses/:id', getStudentCourses)


module.exports = router