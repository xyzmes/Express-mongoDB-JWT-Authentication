const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({error: true, message: "Access denied"})

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error) {
        console.log(error);
        res.status(400).json({error: true, message: "Invalid token"})
        
    }

}

module.exports = auth