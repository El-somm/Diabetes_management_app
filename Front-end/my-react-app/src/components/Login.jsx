import React from 'react';

const Login = ({ onLogin }) => {
    const handleLogin = () => {
        // Redirect to backend login route
        window.location.href = 'http://localhost:3000/auth/google';
    };

    return (
        <div className="login">
            <h1>Welcome to the Diabetes Management App</h1>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;

