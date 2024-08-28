// src/components/AddIncidentPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Make sure `api` is configured to include base URL and handle auth headers
import './AddIncidentPage.css'; // Import the CSS file

function AddIncidentPage() {
    const [details, setDetails] = useState('');
    const [priority, setPriority] = useState('Low');
    const [status, setStatus] = useState('Open'); // New state for incident status
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await api.post('/incidents/', {
                details,
                priority,
                status,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log('Incident added:', response.data);

            // Redirect to home page after adding the incident
            navigate('/home');
        } catch (error) {
            console.error('Error adding incident:', error);
            // Optionally, handle errors by showing a message to the user
        }
    };

    return (
        <div className="add-incident-page">
            <h1>Add New Incident</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Incident Details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                </select>
                <button type="submit">Add Incident</button>
            </form>
        </div>
    );
}

export default AddIncidentPage;
