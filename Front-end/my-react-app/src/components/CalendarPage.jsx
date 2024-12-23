import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import api from '../services/api';
import '../styles/calendar.css';

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '' });

    // Fetch appointments on mount
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await api.get('/appointments');
                setAppointments(response.data);
            } catch (err) {
                console.error('Error fetching appointments:', err);
            }
        };

        fetchAppointments();
    }, []);

    // Handle date selection
    const handleDateChange = (date) => setSelectedDate(date);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/appointments', {
                ...formData,
                date: selectedDate,
            });

            setAppointments((prev) => [...prev, response.data]);
            setFormData({ title: '', description: '' }); // Reset form
        } catch (err) {
            console.error('Error creating appointment:', err);
        }
    };

    // Delete an appointment
    const handleDelete = async (id) => {
        try {
            await api.delete(`/appointments/${id}`);
            setAppointments((prev) => prev.filter((appointment) => appointment._id !== id));
        } catch (err) {
            console.error('Error deleting appointment:', err);
        }
    };

    return (
        <div className="calendar-page">
            <h1>Appointments</h1>
            <Calendar onChange={handleDateChange} value={selectedDate} />
            <form onSubmit={handleSubmit}>
                <h2>Schedule an Appointment</h2>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Description (Optional):
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                </label>
                <button type="submit">Add Appointment</button>
            </form>
            <ul>
                {appointments
                    .filter((appointment) => new Date(appointment.date).toDateString() === selectedDate.toDateString())
                    .map((appointment) => (
                        <li key={appointment._id}>
                            <strong>{appointment.title}</strong>: {appointment.description || 'No description'}
                            <button onClick={() => handleDelete(appointment._id)}>Delete</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default CalendarPage;