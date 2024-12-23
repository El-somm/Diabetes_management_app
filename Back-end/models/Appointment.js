const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Authenticated user ID
    title: { type: String, required: true }, // Appointment title
    date: { type: Date, required: true }, // Appointment date
    description: { type: String }, // Optional description
    createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model('Appointment', AppointmentSchema);