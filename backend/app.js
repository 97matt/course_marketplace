const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./models/db')
const userRoutes = require('./routes/userRoutes')
const courseRoutes = require('./routes/courseRoutes')
const enrollmentRoutes = require('./routes/enrollmentRoutes')
const authMiddleware = require('./middleware/authMiddleware')

const cookieParser = require("cookie-parser");

dotenv.config()

// Initialize Express app
const app = express()

app.use(cookieParser());

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));                   // Habilitar CORS para que se comuniquen el front con el back
app.use(morgan('dev'))      // HTTP request logger
app.use(express.json())      // Parse incoming JSON payloads

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enroll', enrollmentRoutes);

app.get('/test-db', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()');
        res.json(result.rows[0]);
    } catch (err) {
        console.error('❌ DB error:', err.message);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

app.get('/', (req, res) => {
    res.send('API is running...')
})

// Start Server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server corriendo en puerto ${PORT}`)
})