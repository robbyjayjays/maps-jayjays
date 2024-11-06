import React, { useState, useEffect } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import '../assets/css/locations.css';
import Map from './map';

const Locations = () => {
  const [gyms, setGyms] = useState([]);

  // Fetch all gyms initially when the component mounts
  useEffect(() => {
    const fetchAllGyms = async () => {
      try {
        const response = await fetch('/api/gyms'); // You would need to adjust your API to handle fetching all gyms without coordinates
        const data = await response.json();
        setGyms(data); // Set initial gyms data
      } catch (error) {
        console.error('Error fetching all gyms:', error);
      }
    };

    fetchAllGyms();
  }, []);

  return (
    <div className="locations-page">
      <Map setGyms={setGyms} />
      <div className="locations-container">
        {gyms.map((gym) => (
          <div key={gym.id} className="card">
            <div className="card-header">
              <h3 className="text-xl font-bold">{gym.name}</h3>
            </div>
            <div className="card-body">
              <div className="mb-5">{gym.description}</div>
              <div className="border border-gray-100 mb-5"></div>
            </div>
            <div className="card-footer">
              <div className="location-icon flex items-center">
                <FaMapMarker className="inline mb-1 mr-1" />
                <span className="location-text">{`${gym.latitude} - ${gym.longitude}`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
