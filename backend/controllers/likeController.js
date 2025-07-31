const { pool } = require('../models/db.js')
const { getStudentCourses } = require('./enrollmentController.js')

// POST /likes -> Add a like
const addLike = async (req, res) => {
    const { user_id, course_id } = req.body
    try {
        await pool.query(
            `INSERT INTO likes (user_id, course_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
            [user_id, course_id]
        )
        res.status(201).json({ message: 'Like added succesfully.' })
    } catch (error) {
        console.error('Error adding like:', error)
        res.status(500).json({ error: 'Failed to add like' })
    }
} 

// DELETE /likes -> Remove a like
const removeLike = async (req, res) => {
    const { user_id, course_id } = req.body
    try {
        await pool.query(
            `DELETE FROM likes WHERE user_id = $1 AND course_id =$2`,
            [user_id, course_id]
        )
        res.status(200).json({ message: 'Like removed succesfully.' })
    } catch (error) {
        console.error('Error removing like:', error)
        res.status(500).json({ error: 'Failed to remove like' })
    }
}

// GET /likes -> Fetch likes
const getUserLikes = async (req, res) => {
    const { user_id } = req.params
    try {
        const result = await pool.query(
            `SELECT course_id FROM likes WHERE user_id = $1`,
            [user_id]
        )
        const likedCourses = result.rows.map(row => row.course_id)
        res.status(200).json({ likedCourses })
    } catch (error) {
        console.error('Error fetching user likes:', error)
        res.status(500).json({ error: 'Failed to fetch likes' })
    }
}

// Get Top Likes
const getTopLikedCourses = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                c.course_id,
                c.course_title,
                c.course_category,
                c.course_description,
                c.course_price,
                c.course_start_date,
                c.course_img,

                u.user_id AS professor_id,
                u.user_name AS professor_username,
                u.user_first_name AS professor_first_name,
                u.user_last_name AS professor_last_name,
                u.user_email AS professor_email,
                u.user_img AS professor_img,

                COUNT(l.like_id) AS like_count

            FROM courses c
            LEFT JOIN likes l ON c.course_id = l.course_id
            LEFT JOIN users u ON c.course_professor = u.user_id

            GROUP BY c.course_id, u.user_id

            ORDER BY like_count DESC
            LIMIT 3;
        `);

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching top liked courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { addLike, removeLike, getUserLikes, getTopLikedCourses }