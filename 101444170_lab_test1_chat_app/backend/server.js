const express = require('express'); // Import Express
const mongoose = require('mongoose'); // Import Mongoose
const cors = require('cors'); // Import CORS for frontend communication
require('dotenv').config(); // Load environment variables

const User = require('./models/User'); // ✅ Import User model

const app = express(); // ✅ Define Express app

app.use(express.json()); // Enable JSON parsing
app.use(cors()); // Enable Cross-Origin Resource Sharing

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// ✅ Signup Route
app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // ✅ Save user to MongoDB
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Error registering user", error });
    }
});

// ✅ Test Route to Check if API is Running
app.get('/api/test', (req, res) => {
    res.send("API is working!");
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
