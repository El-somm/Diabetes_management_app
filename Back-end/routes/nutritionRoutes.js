

const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables

const router = express.Router();

// Nutrition search route
router.get('/search', async (req, res) => {
    const query = req.query.food; // Get the 'food' query parameter
    const appId = process.env.NUTRITIONIX_APP_ID;
    const apiKey = process.env.NUTRITIONIX_API_KEY;

    if (!query) {
        return res.status(400).json({ error: 'Food query parameter is required' });
    }

    try {
        const response = await axios.post(
            `https://trackapi.nutritionix.com/v2/natural/nutrients`,
            { query }, // Send the query as the body
            {
                headers: {
                    'x-app-id': appId,
                    'x-app-key': apiKey,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Send back the nutrition data
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching nutrition data:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch nutrition data' });
    }
});

module.exports = router; // Export the router for use in server.js

