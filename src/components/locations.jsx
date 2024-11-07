import React, { useState, useEffect } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import '../assets/css/locations.css';
import Map from './map';

const Locations = () => {
  const [gyms, setGyms] = useState([]);
  const [showUserMarker, setShowUserMarker] = useState(true); // State to control 'YOU' marker visibility
  const [markerPosition, setMarkerPosition] = useState(null); // State for marker position

  // Fetch all gyms initially when the component mounts
  const fetchAllGyms = async () => {
    try {
      const response = await fetch('/api/gyms'); // Adjust your API to handle fetching all gyms without coordinates
      const data = await response.json();
      setGyms(data); // Set initial gyms data
      setShowUserMarker(true); // Ensure the 'YOU' marker is shown on initial load
    } catch (error) {
      console.error('Error fetching all gyms:', error);
    }
  };

  useEffect(() => {
    fetchAllGyms();
  }, []);

  // Function to reset the gyms data to show all locations
  const resetGyms = () => {
    fetchAllGyms();
    setShowUserMarker(false); // Hide the 'YOU' marker when resetting
    setMarkerPosition(null); // Clear the marker position
  };

  return (
    <div className="locations-page">
      {/* Pass the gyms data, markerPosition, setMarkerPosition, and 'showUserMarker' prop to the Map component */}
      <Map 
        setGyms={setGyms} 
        gyms={gyms} 
        showUserMarker={showUserMarker} 
        markerPosition={markerPosition} 
        setMarkerPosition={setMarkerPosition}
      />
      <div className="locations-container">
        <button onClick={resetGyms} className="reset-button">
          Show All Locations
        </button>
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
