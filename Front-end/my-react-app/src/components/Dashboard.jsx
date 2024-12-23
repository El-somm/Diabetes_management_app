

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Graph from './Graph';
import '../styles/dashboard.css';

const Dashboard = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for form inputs
    const [formData, setFormData] = useState({
        bloodSugar: '',
        carbs: '',
        insulin: '',
        exercise: '',
    });

    // Fetch logs on component mount
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await api.get('/logs');
                const sortedLogs = response.data.sort(
                    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
                ); // Sort logs from oldest to newest
                setLogs(sortedLogs);
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error('Error fetching logs:', err);
                setError('Failed to fetch logs. Please try again.');
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };

        fetchLogs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            // Send form data to the backend
            const response = await api.post('/logs', {
                bloodSugar: parseFloat(formData.bloodSugar), // Ensure numeric
                carbs: formData.carbs ? parseInt(formData.carbs, 10) : undefined,
                insulin: formData.insulin ? parseFloat(formData.insulin) : undefined,
                exercise: formData.exercise || '',
            });

            // Add the newly created log to the logs list
            setLogs((prevLogs) => {
                const updatedLogs = [...prevLogs, response.data.log]; // Add the new log
                return updatedLogs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)); // Sort again
            });

            // Clear the form and error state
            setFormData({ bloodSugar: '', carbs: '', insulin: '', exercise: '' });
            setError(null);
        } catch (err) {
            console.error('Error adding log:', err);
            setError(err.response?.data?.error || 'An unexpected error occurred');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="dashboard">
            <h1>Your Dashboard</h1>

            {/* Loading State */}
            {loading && <p>Loading your logs...</p>}

            {/* Error Message */}
            {error && <p className="error">{error}</p>}

            {/* Graph */}
            {!loading && logs.length > 0 && (
                <div className="dashboard-graph">
                    <Graph logs={logs} />
                </div>
            )}

            {/* Empty State */}
            {!loading && logs.length === 0 && (
                <div className="empty-state">
                    <p>No logs found. Start tracking your blood sugar, meals, and activities!</p>
                </div>
            )}

            {/* Log Form */}
            <form className="log-form" onSubmit={handleSubmit}>
                <h2>Add New Log</h2>
                <label>
                    Blood Sugar:
                    <input
                        type="number"
                        name="bloodSugar"
                        step="0.1"
                        value={formData.bloodSugar}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Carbs (Optional):
                    <input
                        type="number"
                        name="carbs"
                        value={formData.carbs}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Insulin (Optional):
                    <input
                        type="number"
                        name="insulin"
                        step="0.1"
                        value={formData.insulin}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Exercise (Optional):
                    <input
                        type="text"
                        name="exercise"
                        value={formData.exercise}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Add Log</button>
            </form>
        </div>
    );
};

export default Dashboard;