const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./models/db')
const userRoutes = require('./routes/userRoutes')
const courseRoutes = require('./routes/courseRoutes')
const enrollmentRoutes = require('./routes/enrollmentRoutes')
const authMiddleware = require('./middleware/authMiddleware')
const likeRoutes = require('./routes/likeRoutes')

const cookieParser = require("cookie-parser");

dotenv.config()

// Initialize Express app
const app = express()

app.use(cookieParser());

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173', 
        'http://localhost:5174', 
        'https://coursemarketplace.netlify.app',
        /\.vercel\.app$/,  // Allow all Vercel preview deployments
        process.env.FRONTEND_URL  // Allow custom frontend URL from env
    ].filter(Boolean),
    credentials: true
}));                   // Habilitar CORS para que se comuniquen el front con el back

app.use(morgan('dev'))      // HTTP request logger
app.use(express.json())      // Parse incoming JSON payloads

// Keep-warm and health endpoints (no auth, no DB for /health; minimal DB for /warm)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.get('/warm', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        console.error('Warm check DB error:', err.message);
        res.status(503).json({ error: 'Service temporarily unavailable' });
    }
});

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enroll', enrollmentRoutes);
app.use('/api/likes', likeRoutes)

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

module.exports = app;