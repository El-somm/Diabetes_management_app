const axios = require('axios');

// Fetch nutrition data from Nutritionix API
exports.getNutritionData = async (req, res) => {
    const query = req.query.food; // Get the 'food' query parameter
    const appId = process.env.NUTRITIONIX_APP_ID; // Nutritionix App ID
    const apiKey = process.env.NUTRITIONIX_API_KEY; // Nutritionix API Key

    if (!query) {
        return res.status(400).json({ error: 'Food query parameter is required' });
    }

    try {
        const response = await axios.post(
            `https://trackapi.nutritionix.com/v2/natural/nutrients`,
            { query }, // Query sent in the request body
            {
                headers: {
                    'x-app-id': appId,
                    'x-app-key': apiKey,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Send back the API response
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching nutrition data:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch nutrition data' });
    }
};