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

// Endpoint to retrieve user notes
// This route is protected by the authenticateToken middleware to ensure only authenticated users can view their notes
app.get("/api/notes", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
        return res.json({
            error: false,
            notes,
            message: "Notes retrieved successfully."
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal server error." });
    }
});

// Route handler for POST requests to processes the request to save the note in the database
// This route is protected by the authenticateToken middleware to ensure only authenticated users can create notes
app.post("/api/notes", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    // Check if title is provided, respond with an error if missing.
    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required." });
    }

    // Check if content is provided, respond with an error if missing.
    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required." });
    }

    try {
        // Create a new note instance with the provided data.
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id
        });
        // Save the note to the database.
        await note.save();

        // Respond with the created note and a success message.
        return res.json({
            error: false,
            note,
            message: "Note created successfully."
        });
    } catch (error) {
        // Handle any errors that occur during the note creation process.
        return res.status(500).json({ error: true, message: "Internal server error." });
    }
});

// PATCH endpoint for updating a specific note by its ID
// This route is protected by the authenticateToken middleware to ensure only authenticated users can update note details
app.patch("/api/notes/:id", authenticateToken, async (req, res) => {
    const noteId = req.params.id;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        return res.status(400).json({ error: true, message: "At least one field is required to update the note." });
    }

    try {
        const note = await Note.findById(noteId);
        if (!note || note?.userId?.toString() !== user?._id?.toString()) {
            return res.status(404).json({ error: true, message: "Note not found." });
        }

        if (title && note.title !== title) note.title = title;
        if (content && note.content !== content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned && note.isPinned !== isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully."
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal server error." });
    }
});

// Deletes a note specified by its ID from the database.
// This route is protected by the authenticateToken middleware to ensure only authenticated users can delete notes
app.delete("/api/notes/:id", authenticateToken, async (req, res) => {
    const noteId = req.params.id;
    const { user } = req.user;

    try {
        const note = await Note.findById(noteId);
        if (!note || note?.userId?.toString() !== user?._id?.toString()) {
            return res.status(404).json({ error: true, message: "Note not found." });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id });

        return res.json({
            error: false,
            message: "Note deleted successfully."
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal server error." });
    }
});

// Express route handler to pin a note specified by its ID
// ensures the note belongs to the user, updates the pin status and returns the updated note.
app.patch("/api/notes/:id/pin", authenticateToken, async (req, res) => {
    const noteId = req.params.id;
    const { isPinned } = req.body;
    const { user } = req.user;

    if (!isPinned) {
        return res.status(400).json({ error: true, message: "No changes provided." });
    }

    try {
        const note = await Note.findById(noteId);
        if (!note || note?.userId?.toString() !== user?._id?.toString()) {
            return res.status(404).json({ error: true, message: "Note not found." });
        }

        if (isPinned && note.isPinned !== isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully."
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal server error." });
    }
});

app.listen(8080);

module.exports = app;