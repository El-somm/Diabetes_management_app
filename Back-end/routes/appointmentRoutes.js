
const express = require('express');
const {
    createAppointment,
    getAppointments,
    deleteAppointment,
} = require('../controllers/appointmentController');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const router = express.Router();

router.post('/', ensureAuthenticated, createAppointment); // POST /appointments
router.get('/', ensureAuthenticated, getAppointments);    // GET /appointments
router.delete('/:id', ensureAuthenticated, deleteAppointment); // DELETE /appointments/:id

module.exports = router;