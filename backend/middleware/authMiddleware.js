const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    console.log(req.headers)
    console.log(">>>>>>>> cookis: ", req.headers.cookie)
    console.log(">>>>>>>> authorization: ", req.headers.authorization)
    const authHeader = req.headers.cookie

    // 1) Check if Authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' })
    }
    // 2) Extract the token from the header
    const token = authHeader.split(' ')[1]

    try {
        // 3) Verify the token with your secret 
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // 4) Attach user info to the request object
        req.user = decoded

        // 5) Continue to the next middleware or route handler
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({ error: 'Invalid or expired token' })
    }
}

module.exports = authMiddleware