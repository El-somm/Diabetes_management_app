
const express = require('express');
const {
    createLog,
    getLogs,
    updateLog,
    deleteLog,
} = require('../controllers/logController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const router = express.Router();

// Log routes
router.get('/', ensureAuthenticated, getLogs);
router.post('/', ensureAuthenticated, createLog);
router.put('/:id', ensureAuthenticated, updateLog);
router.delete('/:id', ensureAuthenticated, deleteLog);

module.exports = router;