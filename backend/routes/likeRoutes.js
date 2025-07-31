const express = require('express')
const router = express.Router()
const { addLike, removeLike, getUserLikes, getTopLikedCourses } = require('../controllers/likeController')

//POST /likes -> like a course
router.post('/', addLike)

//DELETE /likes -> unlike a course 
router.delete('/', removeLike)

//GET /likes/top -> Top 3 liked courses
router.get('/top', getTopLikedCourses)

//GET /likes -> Fetch likes
router.get('/:user_id', getUserLikes)


module.exports = router