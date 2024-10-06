require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers("Authorization");
    const token = authHeader && authHeader.split("")[1];

    if (!token) return res.status(401).json({ message: "Token is not provided" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
}

module.exports = { generateToken, authenticateToken };