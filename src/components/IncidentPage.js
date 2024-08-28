// src/components/IncidentPage.js

import React, { useEffect, useState } from 'react';
import api from '../api';

function IncidentPage() {
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await api.get('incidents/');
                setIncidents(response.data);
            } catch (error) {
                console.error('Error fetching incidents:', error);
            }
        };
        fetchIncidents();
    }, []);

    return (
        <div>
            <h1>Incidents</h1>
            <ul>
                {incidents.map((incident) => (
                    <li key={incident.id}>{incident.incident_details}</li>
                ))}
            </ul>
        </div>
    );
}

export default IncidentPage;
