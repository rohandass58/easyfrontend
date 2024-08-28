
// src/App.js

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import IncidentPage from './components/AddIncidentPage';
import EditIncidentPage from './components/EditIncidentPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                     <Route path="/" element={<LoginPage />} />
                    {/* <Route path="/register" element={<RegistrationPage />} /> */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/add-incident" element={<IncidentPage />} />
                    <Route path="/incidents" element={<IncidentPage />} />
                    <Route path="/edit-incident/:id" element={<EditIncidentPage />} />

                {/* Add additional routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;
