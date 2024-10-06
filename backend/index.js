// Importing configuration settings
const config = require("./config.json");
// Importing mongoose for MongoDB connections
const mongoose = require("mongoose");
// Connecting to the MongoDB database using the provided connection string
mongoose.connect(config.connectionString);

// Importing the User model
const User = require("./models/user.model");
const Note = require("./models/note.model");

// Importing express and cors for server setup and cross-origin resource sharing
const express = require("express");
const cors = require("cors");
// Creating an express application instance
const app = express();

// Importing utility functions for token management
const { authenticateToken, generateToken } = require("./utilities");

// Middleware for parsing JSON requests
app.use(express.json());

// CORS configuration to allow requests from any origin
app.use(cors({
    origin: "*"
}));

// Route handler for POST requests to create a new user account
app.post("/api/auth/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    // Validation for fullName input
    if (!fullName) {
        return res.status("400").json({ error: true, message: "Full Name is required." });
    }

    // Validation for email input
    if (!email) {
        return res.status("400").json({ error: true, message: "Email is required." });
    }

    // Validation for password input
    if (!password) {
        return res.status("400").json({ error: true, message: "Password is required." });
    }

    // Check if the user already exists in the database
    const userExists = await User.findOne({ email: email });
    if (userExists) {
        return res.json({
            error: true,
            message: "User already exists."
        });
    }

    // Creating a new user instance
    const user = new User({
        fullName,
        email,
        password
    });
    // Saving the new user to the database
    await user.save();

    // Generating an access token for the user
    const accessToken = generateToken(user);

    // Returning a successful response with user data and access token
    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration successful."
    });
});

// Route handler for POST requests to login a user
app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;

    // Validation for email input
    if (!email) {
        return res.status("400").json({ error: true, message: "Email is required." });
    }

    // Validation for password input
    if (!password) {
        return res.status("400").json({ error: true, message: "Password is required." });
    }


    // Check if the user exists in the database
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
        return res.status(400).json({ message: "User not found." });
    }

    if (existingUser.password = password) {
        // Generating an access token for the user
        const accessToken = generateToken(existingUser);
        // Returning a successful response with user data and access token
        return res.json({
            error: false,
            existingUser,
            accessToken,
            message: "Login successful."
        });
    } else {
        // Returning an error response if the password is incorrect
        return res.status(400).json({ error: true, message: "Invalid credentials." });
    }

});

app.post("/api/notes", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required." });
    }

    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required." });
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id
        });
        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note created successfully."
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal server error." });
    }
});

app.listen(8080);

module.exports = app;