
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
require('./config/passport'); // Load Passport configuration

// Initialize Express app
const app = express();

// Enable CORS
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Allow requests from frontend
        credentials: true, // Include credentials (cookies)
    })
);

// Middleware to parse JSON
app.use(express.json());

// Configure Sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'your_secret_key', // Secure this in production
        resave: false,
        saveUninitialized: false, // Do not save uninitialized sessions
        cookie: {
            secure: false, // Set `true` in production with HTTPS
            httpOnly: true, // Helps prevent XSS attacks
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        },
    })
);

// Initialize Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process on failure
    }
})();

// Routes
app.use('/auth', require('./routes/authRoutes')); // OAuth2.0 authentication routes

// Log Route
const logRoutes = require('./routes/logRoutes');
app.use('/api/logs', logRoutes); // Prefix the routes with '/api/logs'

// Test Database Route
app.get('/test-db', async (req, res) => {
    try {
        res.json({ message: 'Database connection successful!' });
    } catch (error) {
        res.status(500).json({ error: 'Error testing database connection' });
    }
});

// Appointment Route
app.use('/api/appointments', require('./routes/appointmentRoutes'));

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Diabetes Management App API!');
});

// Nutrition route
const nutritionRoutes = require('./routes/nutritionRoutes');
app.use('/api/nutrition', nutritionRoutes);

// Protected Route Example
app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
    res.json({ message: 'Welcome to the dashboard!', user: req.user });
});

// 404 Fallback Route
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));