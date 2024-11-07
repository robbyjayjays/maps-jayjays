import React, { useState, useEffect } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import '../assets/css/locations.css';
import Map from './map';
import { Link } from 'react-router-dom';

const Locations = () => {
  const [gyms, setGyms] = useState([]);
  const [showUserMarker, setShowUserMarker] = useState(true);
  const [markerPosition, setMarkerPosition] = useState(null);

  const fetchAllGyms = async () => {
    try {
      const response = await fetch('/api/gyms');
      const data = await response.json();
      setGyms(data);
      setShowUserMarker(true);
    } catch (error) {
      console.error('Error fetching all gyms:', error);
    }
  };

  useEffect(() => {
    fetchAllGyms();
  }, []);

  const resetGyms = () => {
    fetchAllGyms();
    setShowUserMarker(false);
    setMarkerPosition(null);
  };

  return (
    <div className="locations-page">
      <div className="map-container">
        <Map
          setGyms={setGyms}
          gyms={gyms}
          showUserMarker={showUserMarker}
          markerPosition={markerPosition}
          setMarkerPosition={setMarkerPosition}
        />
      <div className="button-container">
        <button onClick={resetGyms} className="reset-button">
          Show All Locations
        </button>
        <Link to="/gym" className="reset-button">
          Don't see your gym? Add it here!
        </Link>
      </div>
      </div>
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
                <span className="location-text">{`${gym.location_name}`}</span>
              </div>
              <span className="location-text">{`${gym.latitude} - ${gym.longitude}`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
