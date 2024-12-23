const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
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
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
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
        console.log('Connecting to MongoDB...');
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
app.use('/api/logs', require('./routes/logRoutes')); // Prefix the routes with '/api/logs'

// Appointment Route
app.use('/api/appointments', require('./routes/appointmentRoutes'));

// Nutrition route
app.use('/api/nutrition', require('./routes/nutritionRoutes'));

// Test Database Route
app.get('/test-db', async (req, res) => {
    try {
        res.json({ message: 'Database connection successful!' });
    } catch (error) {
        res.status(500).json({ error: 'Error testing database connection' });
    }
});

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Diabetes Management App API!');
});

// Protected Route Example
app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
    res.json({ message: 'Welcome to the dashboard!', user: req.user });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

// 404 Fallback Route
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Server running on ${process.env.BACKEND_URL || `http://localhost:${PORT}`}`)
);