const Appointment = require('../models/Appointment');

// Create an appointment
exports.createAppointment = async (req, res) => {
    try {
        const { title, date, description } = req.body;

        if (!title || !date) {
            return res.status(400).json({ error: 'Title and date are required.' });
        }

        const appointment = new Appointment({
            userId: req.user.id,
            title,
            date,
            description,
        });

        const savedAppointment = await appointment.save();
        res.status(201).json(savedAppointment);
    } catch (err) {
        console.error('Error creating appointment:', err.message);
        res.status(500).json({ error: 'Failed to create appointment.' });
    }
};

// Get all appointments for a user
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.user.id }).sort({ date: 1 });
        res.status(200).json(appointments);
    } catch (err) {
        console.error('Error fetching appointments:', err.message);
        res.status(500).json({ error: 'Failed to fetch appointments.' });
    }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAppointment = await Appointment.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!deletedAppointment) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully.' });
    } catch (err) {
        console.error('Error deleting appointment:', err.message);
        res.status(500).json({ error: 'Failed to delete appointment.' });
    }
};