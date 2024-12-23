import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './log.css'; // Optional: Add styling

const Log = () => {
    const [logs, setLogs] = useState([]);
    const [formData, setFormData] = useState({
        bloodSugar: '',
        carbs: '',
        insulin: '',
        exercise: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch logs on page load
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await api.get('/api/logs');
                setLogs(response.data);
                setError(null); // Clear errors if successful
            } catch (err) {
                console.error('Error fetching logs:', err);
                setError('Failed to fetch logs.');
            }
        };

        fetchLogs();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/logs', formData);
            setLogs([...logs, response.data]); // Add new log to the list
            setFormData({ bloodSugar: '', carbs: '', insulin: '', exercise: '' }); // Reset form
            setSuccess('Log added successfully!');
            setError(null);
        } catch (err) {
            console.error('Error adding log:', err);
            setError('Failed to add log. Please try again.');
            setSuccess(null);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="log-page">
            <h1>Log Page</h1>

            <form onSubmit={handleSubmit} className="log-form">
                <h2>Add a New Log</h2>
                <label>
                    Blood Sugar:
                    <input
                        type="number"
                        name="bloodSugar"
                        value={formData.bloodSugar}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Carbs (g):
                    <input
                        type="number"
                        name="carbs"
                        value={formData.carbs}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Insulin (units):
                    <input
                        type="number"
                        name="insulin"
                        value={formData.insulin}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Exercise:
                    <input
                        type="text"
                        name="exercise"
                        value={formData.exercise}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Add Log</button>
            </form>

            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}

            <div className="log-list">
                <h2>Your Logs</h2>
                {logs.length > 0 ? (
                    <ul>
                        {logs.map((log, index) => (
                            <li key={index}>
                                <p><strong>Blood Sugar:</strong> {log.bloodSugar} mg/dL</p>
                                <p><strong>Carbs:</strong> {log.carbs} g</p>
                                <p><strong>Insulin:</strong> {log.insulin} units</p>
                                <p><strong>Exercise:</strong> {log.exercise}</p>
                                <p><strong>Date:</strong> {new Date(log.timestamp).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No logs available. Add your first log!</p>
                )}
            </div>
        </div>
    );
};

export default Log;