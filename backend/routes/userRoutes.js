const express = require('express')
const router = express.Router()
const { registerUser, loginUser, updateUser } = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

//Route to register a new user
router.post('/', registerUser)

//Route to log in user
router.post('/login', loginUser)

//Route to update a user profile
router.put('/:id', authMiddleware, updateUser)


module.exports = router