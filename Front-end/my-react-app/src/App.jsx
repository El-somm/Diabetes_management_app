import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Nutrition from './components/Nutrition';
import CalendarPage from './components/CalendarPage'; // Import CalendarPage

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated
        const urlParams = new URLSearchParams(window.location.search);
        const authParam = urlParams.get('auth');

        if (authParam === 'true') {
            // Set authentication state and persist it
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
            // Remove query parameters from the URL
            window.history.replaceState(null, '', window.location.pathname);
        } else {
            // Restore authentication state from localStorage
            const storedAuthState = localStorage.getItem('isAuthenticated') === 'true';
            setIsAuthenticated(storedAuthState);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true'); // Persist login state
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated'); // Clear login state
    };

    return (
        <Router>
            <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<Login onLogin={handleLogin} />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
                />
                <Route
                    path="/nutrition"
                    element={isAuthenticated ? <Nutrition /> : <Navigate to="/" />}
                />
                <Route
                    path="/calendar"
                    element={isAuthenticated ? <CalendarPage /> : <Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
};

export default App;


