// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

function Navbar() {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        // Remove tokens from localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Redirect to login page
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">Incident Management</Link>
                <div className="navbar-links">
                    <Link to="/">Home</Link>
                    <Link to="/add-incident">Add Incident</Link>
                    <Link to="/login">Login</Link>
                    {/* Instead of using a Link component, use a button or an anchor tag for logout */}
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
