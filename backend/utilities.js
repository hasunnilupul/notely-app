require("dotenv").config();
const jwt = require("jsonwebtoken");

/** 
 * Generates an access token for a given user using a secret key and a specified expiration time 
 */
const generateToken = (user) => {
    return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
}

/**
 * Middleware function that authenticates incoming requests by verifying the provided token
 */
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
}

module.exports = { generateToken, authenticateToken };