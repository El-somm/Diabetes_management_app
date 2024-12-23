

const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // User ID
    bloodSugar: { type: Number, required: true, min: 0 }, // Allow decimals for blood sugar
    carbs: { type: Number, required: false, min: 0 }, // Optional field
    insulin: { type: Number, required: false, min: 0 }, // Optional field
    exercise: { type: String, default: '' }, // Optional field
    timestamp: { type: Date, default: Date.now }, // Default to current time
});

module.exports = mongoose.model('Log', LogSchema);
