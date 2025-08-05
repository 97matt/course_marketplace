const bcrypt = require('bcrypt')
const db = require('../models/db')
const jwt = require('jsonwebtoken')


// Register User
const registerUser = async (req, res) => {
    const { user_name, user_first_name, user_last_name, user_email, user_password, user_rol, user_img } = req.body
    console.log(user_name, user_first_name, user_last_name, user_email, user_password, user_rol, user_img)
    try {
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

        const user = result.rows[0]
        const tokenPayload = { userId: user.user_id, role: user.user_rol }
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '2h' })

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 1 * 60 * 60 * 1000
        })

        res.status(201).json({
            token,
            user
        })
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


        //>>>>>  agrege esto ALFREDO
        res.cookie("token", token, {
            httpOnly: true,           // 🔒 No accesible desde JS
            secure: false,            // true en producción con HTTPS
            sameSite: "Lax",          // "None" si frontend y backend están en dominios distintos
            maxAge: 2 * 60 * 60 * 1000 // 2 horas
        });

        res.json({
            token,
            user: {
                user_id: user.user_id,
                user_name: user.user_name,
                user_first_name: user.user_first_name,
                user_last_name: user.user_last_name,
                user_email: user.user_email,
                user_rol: user.user_rol,
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error logging in' })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const {
        user_id,
        user_name,
        user_first_name,
        user_last_name,
        user_email,
        user_password,
        new_password,
        user_img
    } = req.body;

    try {
        // 1. Buscar usuario
        const result = await db.query('SELECT * FROM users WHERE user_id = $1', [user_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const user = result.rows[0];

        // 2. Verificar contraseña actual
        const isValidPassword = await bcrypt.compare(user_password, user.user_password);
        console.log("Received current password:", user_password);
        console.log("Actual hash in DB:", user.user_password);
        console.log("Is valid password:", isValidPassword);


        if (!isValidPassword) {
            return res.status(401).json({ error: 'Contraseña actual inválida' });
        }

        // 3. Determinar si se debe actualizar la contraseña
        let hashedPassword = user.user_password; // mantener la actual por defecto

        if (new_password && new_password.trim() !== '') {
            // hashear la nueva contraseña
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(new_password, salt);
        }

        // 4. Ejecutar la actualización
        const updateQuery = `
        UPDATE users SET
        user_name = $1,
        user_first_name = $2,
        user_last_name = $3,
        user_email = $4,
        user_password = $5,
        user_img = $6
        WHERE user_id = $7
        RETURNING *;
        `;

        const values = [
            user_name,
            user_first_name,
            user_last_name,
            user_email,
            hashedPassword,
            user_img,
            user_id
        ];

        const updatedUser = await db.query(updateQuery, values);
        console.log(updatedUser.rows[0])

        res.status(200).json({
            message: 'Perfil actualizado exitosamente',
            user: updatedUser.rows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
};



//GET /users/me
const getProfile = async (req, res) => {
    try {
        //req.user is set by middleware after checking JWT token
        res.status(200).json(req.user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error fetching user profile' })
    }
}



module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getProfile
}