const db = require('../models/db')
const { pool } = require('../models/db')


const createCourse = async (req, res) => {
    console.log('<>>>>><<<<>>>><><>><<<>>', req.body)

    ">>>>>>> MODIFIQUE EL USER ROLE VALIDACION 1 "

    try {
        const { course_title, course_category, course_description, course_price, course_start_date, course_img, course_professor_id, course_professor_rol } = req.body
        // 1) Check if the logged-in user is a teacher
        /////// (req.user.role !== 'teacher')
        if (course_professor_rol !== 'professor') {
            return res.status(403).json({ error: 'Only teachers can create courses' })
        }
        // 2) Get course details from the request body

        // 3) Validate required fields
        if (!course_title || !course_description || !course_price) {
            return res.status(400).json({ error: 'Missing course fields' })
        }
        // 4) Insert new course into the database
        const query = `
            INSERT INTO courses
                (course_title, course_professor, course_category, course_description, course_price, course_start_date, course_img)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `
        const values = [
            course_title,
            course_professor_id,    // >>>>>>>>>>>>>>> AH course_professor: ID of the teacher creating the course
            course_category,
            course_description,
            course_price,
            course_start_date,
            course_img
        ]

        const result = await db.query(query, values)

        // 5) Return the created course details
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error creating course' })
    }
}

const getAllCourses = async (req, res) => {
    try {
        const query = `
            SELECT 
                c.course_id,
                c.course_title,
                c.course_category,
                c.course_description,
                c.course_price,
                c.course_start_date,
                c.course_img,
                c.course_professor,

                u.user_first_name AS professor_first_name,
                u.user_last_name AS professor_last_name

            FROM courses c
            LEFT JOIN users u ON c.course_professor = u.user_id
            ORDER BY c.course_id DESC
        `;
        const result = await db.query(query);
        res.json(result.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error retrieving courses' })
    }
}

const getCourseById = async (req, res) => {
    const { id } = req.params

    try {
        const query = `
            SELECT 
                c.course_id,
                c.course_title,
                c.course_category,
                c.course_description,
                c.course_price,
                c.course_start_date,
                c.course_img,
                c.course_professor,

                u.user_first_name AS professor_first_name,
                u.user_last_name AS professor_last_name

        FROM courses c
        LEFT JOIN users u ON c.course_professor = u.user_id
        WHERE c.course_id = $1
    `;
        const result = await db.query(query, [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Course not found' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error retrieving course' })
    }
}

const getCoursesByIdProfessor = async (req, res) => {
    const { id } = req.params
    try {
        const query = `
            SELECT 
                c.course_id,
                c.course_title,
                c.course_category,
                c.course_description,
                c.course_price,
                c.course_start_date,
                c.course_img,
                c.course_professor AS professor_id,

                u.user_first_name AS professor_first_name,
                u.user_last_name AS professor_last_name

            FROM courses c
            LEFT JOIN users u ON c.course_professor = u.user_id
            WHERE c.course_professor = $1
            ORDER BY c.course_id DESC
        `

        const result = await db.query(query, [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Courses not found' })
        }

        res.json(result.rows); // Return all courses with full info
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error retrieving courses' })
    }
}


const deleteCourse = async (req, res) => {
    const { id } = req.params

    try {
        // 1) Get the course and check if it exists
        const courseQuery = 'SELECT * FROM courses WHERE course_id = $1'
        const courseResult = await db.query(courseQuery, [id])

        if (courseResult.rows.length === 0) {
            return res.status(404).json({ error: 'Course not found' })
        }

        const course = courseResult.rows[0]

        // 2) Only the teacher who owns the course can delete it
        if (course.course_professor != req.user.user_id) {
            return res.status(403).json({ error: 'Unauthorized: you can only delete your own courses' })
        }

        // 3) Delete the course
        const deleteQuery = 'DELETE FROM courses WHERE course_id = $1'
        await db.query(deleteQuery, [id])

        res.json({ message: 'Course deleted succesfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error deleting course' })
    }
}


//Get filtered & paginated courses
const getFilteredCourses = async (req, res) => {
	try {
		const client = await pool.connect();
		console.log("🔥 Connected to DB");

		const {
			category,
			min_price,
			max_price,
			page = 1,
			limit = 3,
		} = req.query;

		console.log("📦 Query params:", req.query);

		const conditions = [];
		const values = [];

        if (category && category !== "") {
            values.push(category);
            conditions.push(`LOWER(course_category) = LOWER($${values.length})`);
        }

		if (min_price) {
			values.push(parseFloat(min_price));
			conditions.push(`course_price >= $${values.length}`);
		}

		if (max_price) {
			values.push(parseFloat(max_price));
			conditions.push(`course_price <= $${values.length}`);
		}

		const whereClause =
			conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";

		const offset = (parseInt(page) - 1) * parseInt(limit);
		values.push(parseInt(limit));
		values.push(offset);

        const courseQuery = `
            SELECT 
                c.*, 
                u.user_first_name AS professor_first_name,
                u.user_last_name AS professor_last_name
            FROM courses c
            LEFT JOIN users u ON c.course_professor = u.user_id
            ${whereClause}
            ORDER BY c.course_id
            LIMIT $${values.length - 1} OFFSET $${values.length};
        `;

            console.log("🟡 Final WHERE clause:", whereClause);
            console.log("🔵 Filter values:", values);
            console.log("🧠 Final SQL:", courseQuery);



        const totalQuery = `
            SELECT COUNT(*) FROM courses c
            LEFT JOIN users u ON c.course_professor = u.user_id
            ${whereClause};
        `;


		console.log("🧠 Final SQL:", courseQuery);
		console.log("🧠 Final values:", values);

		let courseResult, totalResult;

		try {
			[courseResult, totalResult] = await Promise.all([
				client.query(courseQuery, values),
				client.query(totalQuery, values.slice(0, values.length - 2)),
			]);
            console.log("📘 Course results:", courseResult.rows);
            
		} catch (sqlError) {
			console.error("❌ SQL EXECUTION ERROR:", sqlError);
			return res.status(500).json({ error: "SQL query failed" });
		}

		client.release();
		console.log("✅ Queries executed, returning result");

		res.json({
			courses: courseResult.rows,
			total: parseInt(totalResult.rows[0].count),
		});
	} catch (err) {
		console.error("❌ OUTER ERROR:", err);
		res.status(500).json({ error: "Server error fetching courses" });
	}
};




module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    deleteCourse,
    getCoursesByIdProfessor,
    getFilteredCourses
}