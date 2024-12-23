import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';const Navigation = ({ isAuthenticated, onLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-logo">Diabetes App</h1>
                {isAuthenticated ? (
                    <ul className="navbar-links">
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/nutrition">Nutrition</Link>
                        </li>
                        <li>
                            <Link to="/calendar">Calendar</Link>
                        </li>
                        <li>
                            <button onClick={onLogout} className="logout-button">
                                Logout
                            </button>
                        </li>
                    </ul>
                ) : (
                    <div className="navbar-login-message">
                        <p>Please log in to access the application.</p>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;