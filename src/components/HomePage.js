import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './HomePage.css';

function HomePage() {
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await api.get('/incidents/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setIncidents(response.data);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      }
    };
    fetchIncidents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await api.delete(`/incidents/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      console.error('Error deleting incident:', error);
    }
  };

  const handleAddIncident = () => {
    navigate('/add-incident');
  };

  const handleEdit = (id) => {
    navigate(`/edit-incident/${id}`);
  };

  return (
    <div className="home-page">
      <h1>Incident List</h1>
      <ul className="incident-list">
        {incidents.map(incident => (
          <li key={incident.id} className="incident-item">
            <div className="incident-details">
              <span>{incident.details}</span>
              <span>Status: {incident.status}</span>
            </div>
            <div className="incident-actions">
              {incident.status !== "Closed" && (
                <button onClick={() => handleEdit(incident.id)}>Edit</button>
              )}
              <button onClick={() => handleDelete(incident.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="add-incident-button" onClick={handleAddIncident}>Add New Incident</button>
    </div>
  );
}

export default HomePage;