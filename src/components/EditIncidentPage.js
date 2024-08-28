import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api'; // Ensure `api` is configured correctly
import './EditIncidentPage.css'; // Import the CSS file for styling

function EditIncidentPage() {
    const { id } = useParams(); // Get the incident ID from the URL
    const [incident, setIncident] = useState({
        details: '',
        priority: 'Low',
        status: 'Open',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the incident data when the component mounts
        const fetchIncident = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const response = await api.get(`/incidents/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setIncident(response.data);
            } catch (error) {
                console.error('Error fetching incident:', error);
                // Optionally, handle errors (e.g., redirect to a 404 page if not found)
            }
        };

        fetchIncident();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncident((prevIncident) => ({
            ...prevIncident,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            await api.put(`/incidents/${id}/`, incident, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('Incident updated successfully');
            navigate('/home'); // Redirect to home page after updating
        } catch (error) {
            console.error('Error updating incident:', error);
            // Optionally, handle errors by showing a message to the user
        }
    };

    return (
        <div className="edit-incident-page">
            <h1>Edit Incident</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    name="details"
                    placeholder="Incident Details"
                    value={incident.details}
                    onChange={handleChange}
                    required
                />
                <select
                    name="priority"
                    value={incident.priority}
                    onChange={handleChange}
                    required
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select
                    name="status"
                    value={incident.status}
                    onChange={handleChange}
                    required
                >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                </select>
                <button type="submit">Update Incident</button>
            </form>
        </div>
    );
}

export default EditIncidentPage;
