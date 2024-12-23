

import React, { useState } from 'react';
import api from '../services/api';
import '../styles/nutrition.css';

const Nutrition = () => {
    const [query, setQuery] = useState('');
    const [nutritionData, setNutritionData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await api.get(`/nutrition/search`, {
                params: { food: query },
            });
            setNutritionData(response.data.foods); // Nutritionix returns data in `foods`
            setError(null);
        } catch (error) {
            console.error('Error fetching nutrition data:', error.response || error.message);
            setError('Failed to fetch nutrition data. Please try again.');
        }
    };

    return (
        <div className="nutrition">
            <h1>Nutrition Search</h1>
            <input
                type="text"
                placeholder="Enter food name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p className="error">{error}</p>}

            {nutritionData && (
                <div className="nutrition-results">
                    <h2>Results for: {query}</h2>
                    <ul>
                        {nutritionData.map((food, index) => (
                            <li key={index} className="nutrition-item">
                                <h3>{food.food_name}</h3>
                                <p>Calories: {food.nf_calories} kcal</p>
                                <p>Protein: {food.nf_protein} g</p>
                                <p>Fat: {food.nf_total_fat} g</p>
                                <p>Carbohydrates: {food.nf_total_carbohydrate} g</p>
                                <p>Serving Size: {food.serving_weight_grams} g</p>
                                {food.photo && <img src={food.photo.thumb} alt={food.food_name} />}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Nutrition;

