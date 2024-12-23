const Log = require('../models/Log');
exports.createLog = async (req, res) => {
    try {
        const { bloodSugar, carbs, insulin, exercise } = req.body;

        // Validate required fields
        if (!bloodSugar) {
            return res.status(400).json({ error: 'Blood sugar is required' });
        }

        // Create a new logconst Log = require('../models/Log');

/**
 * Create a new log entry
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createLog = async (req, res) => {
    try {
        const { bloodSugar, carbs, insulin, exercise } = req.body;

        // Validate required fields
        if (!bloodSugar) {
            return res.status(400).json({ error: 'Blood sugar is required' });
        }

        // Create a new log
        const log = new Log({
            userId: req.user.id, // Authenticated user ID
            bloodSugar,
            carbs: carbs || null, // Optional fields
            insulin: insulin || null,
            exercise: exercise || '',
        });

        const savedLog = await log.save();

        // Send success response
        res.status(201).json({ message: 'Log created successfully', log: savedLog });
    } catch (err) {
        console.error('Error creating log:', err.message);
        res.status(500).json({ error: 'Failed to create log. Please try again.' });
    }
};

/**
 * Retrieve all log entries for the authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getLogs = async (req, res) => {
    try {
        const logs = await Log.find({ userId: req.user.id }).sort({ timestamp: -1 });
        res.status(200).json(logs);
    } catch (err) {
        console.error('Error fetching logs:', err.message);
        res.status(500).json({ error: 'Failed to fetch logs', details: err.message });
    }
};

/**
 * Update a log entry by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateLog = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Validation
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'No updates provided' });
        }

        const updatedLog = await Log.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            updates,
            { new: true } // Return the updated document
        );

        if (!updatedLog) {
            return res.status(404).json({ error: 'Log not found' });
        }

        res.status(200).json(updatedLog);
    } catch (err) {
        console.error('Error updating log:', err.message);
        res.status(500).json({ error: 'Failed to update log', details: err.message });
    }
};

/**
 * Delete a log entry by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.deleteLog = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedLog = await Log.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!deletedLog) {
            return res.status(404).json({ error: 'Log not found' });
        }

        res.status(200).json({ message: 'Log deleted successfully' });
    } catch (err) {
        console.error('Error deleting log:', err.message);
        res.status(500).json({ error: 'Failed to delete log', details: err.message });
    }
};
        const log = new Log({
            userId: req.user.id, // Authenticated user ID
            bloodSugar,
            carbs: carbs || null, // Optional fields
            insulin: insulin || null,
            exercise: exercise || '',
        });

        const savedLog = await log.save();

        // Send success response
        res.status(201).json({ message: 'Log created successfully', log: savedLog });
    } catch (err) {
        console.error('Error creating log:', err.message);
        res.status(500).json({ error: 'Failed to create log. Please try again.' });
    }
};

// Read all logs
exports.getLogs = async (req, res) => {
    try {
        const logs = await Log.find({ userId: req.user.id }).sort({ timestamp: -1 });
        res.status(200).json(logs);
    } catch (err) {
        console.error('Error fetching logs:', err.message);
        res.status(500).json({ error: 'Failed to fetch logs', details: err.message });
    }
};

// Update a log by ID
exports.updateLog = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Validation
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'No updates provided' });
        }

        const updatedLog = await Log.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            updates,
            { new: true } // Return the updated document
        );

        if (!updatedLog) {
            return res.status(404).json({ error: 'Log not found' });
        }

        res.status(200).json(updatedLog);
    } catch (err) {
        console.error('Error updating log:', err.message);
        res.status(500).json({ error: 'Failed to update log', details: err.message });
    }
};

// Delete a log by ID
exports.deleteLog = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedLog = await Log.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!deletedLog) {
            return res.status(404).json({ error: 'Log not found' });
        }

        res.status(200).json({ message: 'Log deleted successfully' });
    } catch (err) {
        console.error('Error deleting log:', err.message);
        res.status(500).json({ error: 'Failed to delete log', details: err.message });
    }
};