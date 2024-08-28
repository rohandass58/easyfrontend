import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './HomePage.css';

function HomePage() {
  const [incidents, setIncidents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filter incidents based on search query
  const filteredIncidents = incidents.filter(incident =>
    incident.incident_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <h1>Incident List</h1>
      <input
        type="text"
        placeholder="Search by Incident ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <ul className="incident-list">
        {filteredIncidents.length > 0 ? (
          filteredIncidents.map(incident => (
            <li key={incident.id} className="incident-item">
              <div className="incident-details">
                <h3>Incident ID: {incident.incident_id}</h3>
                <p>Details: {incident.details}</p>
                <p>Status: {incident.status}</p>
                <p>Priority: {incident.priority}</p>
                <p>Entity Type: {incident.entity_type}</p>
                <p>Reporter Type: {incident.reporter_user_type}</p>
                <p>Reported Date: {new Date(incident.reported_date).toLocaleString()}</p>
                <p>Reporter Name: {incident.reporter_first_name}</p>

              </div>
              <div className="incident-actions">
                {incident.status !== "Closed" && (
                  <button onClick={() => handleEdit(incident.id)}>Edit</button>
                )}
                <button onClick={() => handleDelete(incident.id)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <li>No incidents found.</li>
        )}
      </ul>
      <button className="add-incident-button" onClick={handleAddIncident}>Add New Incident</button>
    </div>
  );
}

export default HomePage;
