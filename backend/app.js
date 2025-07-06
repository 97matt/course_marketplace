// Import core modules using CommonJS syntax
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./models/db')
const userRoutes = require('./routes/userRoutes')
const courseRoutes = require('./routes/courseRoutes')
const enrollmentRoutes = require('./routes/enrollmentRoutes')
const authMiddleware = require('./middleware/authMiddleware')

// Load environment variables from .env
dotenv.config()

// Initialize Express app
const app = express()

// Middleware
app.use(cors())                    // Habilitar CORS para que se comuniquen el front con el back
app.use(morgan('dev'))      // HTTP request logger
app.use(express.json())      // Parse incoming JSON payloads

app.use('/api/users', userRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/enroll', enrollmentRoutes)

// Test routes
// Test acceso a db
// app.get('/test-db', async (req, res) => {
//     try {
//         const result = await db.query('SELECT NOW()')
//         res.json({ dbTime: result.rows[0] })
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: 'Database connection failed' })
//     }
// })

//Protected route to test middleware token verification
// app.get('/api/protected', authMiddleware, (req, res) => {
//     res.json({
//         message: 'Access granted to protected route!',
//         user: req.user
//     })
// })

app.get('/', (req, res) => {
    res.send('API is running...')
})

// Start Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Sever corriendo en puerto ${PORT}`)
})