const bcrypt = require('bcrypt')
const db = require('../models/db')
const jwt = require('jsonwebtoken')


// Register User
const registerUser = async (req, res) => {
    const { user_name, user_first_name, user_last_name, user_email, user_password, user_rol, user_img } = req.body
    try {
        // 1) Validate required fields
        if (!user_name || !user_first_name || !user_last_name || !user_email || !user_password || !user_rol) {
            return res.status(400).json({ error: 'Missing required fields' })
        }
        // 2) Hash the password for security
        const hashedPassword = await bcrypt.hash(user_password, 10)
        // 3) Insert the new user into the database
        const query = `
            INSERT INTO users
                (user_name, user_first_name, user_last_name, user_email, user_password, user_rol, user_img)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7)
            RETURNING user_id, user_name, user_first_name, user_last_name, user_email, user_rol, user_img
        `
        const values = [user_name, user_first_name, user_last_name, user_email, hashedPassword, user_rol, user_img]
        const result = await db.query(query, values)
        // 4) Return the created user details (excluding password)
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error registering user' })
    }
}


// Login User
const loginUser = async (req, res) => {
    const { user_name, user_password } = req.body
    try {
        // 1) Validate input
        if (!user_name || !user_password) {
            return res.status(400).json({ error: 'Username and password are required' })
        }
        // 2) Look up user by email
        const query = 'SELECT * FROM users WHERE user_name = $1'
        const result = await db.query(query, [user_name])
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const user = result.rows[0]
        // 3) Compare password with hashed password
        const validPassword = await bcrypt.compare(user_password, user.user_password)
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        // 4) Create JWT token
        const tokenPayload = { userId: user.user_id, role: user.user_rol }
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '2h' })
        // 5) Return token and basic user info
        res.json({
            token,
            user: {
                user_id: user.user_id,
                user_name: user.user_name,
                user_email: user.user_email,
                user_rol: user.user_rol,
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error logging in' })
    }
}


// Update User
const updateUser = async(req, res) => {
    const { id } = req.params
    const { user_name, user_first_name, user_last_name, user_email, user_password, user_img } = req.body

    try {
        // 1) Make sure user making request matches profile being updated
        if (parseInt(id) !== req.user.userId) {
            return res.status(403).json({ error: 'Unauthroized to update this profile' })
        }
        // 2) Check for existing username (if changed)
        if (user_name) {
            const usernameQuery = 'SELECT * FROM users WHERE user_name = $1 AND user_id != $2'
            const usernameResult = await db.query(usernameQuery, [user_name, id])
            if (usernameResult.rows.length > 0) {
                return res.status(400).json({ error: 'Username already taken' })
            }
        }
        // 3) Check for existing email (if changed)
        if (user_email) {
            const emailQuery = 'SELECT * FROM users WHERE user_email = $1 and user_id != $2'
            const emailResult = await db.query(emailQuery, [user_email, id])
            if (emailResult.rows.length > 0) {
                return res.status(400).json({ error: 'Email already taken' })
            }
        }
        // 4) Prepare fields and values to update
        const fields = []
        const values = []
        let idx = 1

        if (user_name) {
            fields.push(`user_name = $${idx++}`)
            values.push(user_name)
        }
        if (user_first_name) {
            fields.push(`user_first_name = $${idx++}`)
            values.push(user_first_name)
        }
        if (user_last_name) {
            fields.push(`user_last_name = $${idx++}`)
            values.push(user_email)
        }
        if (user_email) {
            fields.push(`user_email = $${idx++}`)
            values.push(user_email)
        }
        if (user_password) {
            const hashedPassword = await bcrypt.hash(user_password, 10)
            fields.push(`user_password = $${idx++}`)
            values.push(hashedPassword)
        }
        if (user_img) {
            fields.push(`user_img = $${idx++}`)
            values.push(user_img)
        }
        if (fields.length === 0) {
            return res.status(400).json({ error: 'No fields to update' })
        }
        // 5) Build and run update query
        const query = `UPDATE users SET ${fields.join(', ')} WHERE user_id = $${idx} RETURNING user_id, user_name, user_first_name, user_last_name, user_email, user_rol, user_img`
        values.push(id)

        const result = await db.query(query, values)

        res.json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error updating profile' })
    }
}


module.exports = {
    registerUser,
    loginUser,
    updateUser,
}