import React, { useState, useEffect } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import '../assets/css/locations.css';

const Locations = () => {
    const [gyms, setGyms] = useState([]);

    // Fetch gyms from your API
    useEffect(() => {
        const fetchGyms = async () => {
            try {
                // Update the fetch URL to point to the API endpoint
                const response = await fetch('/api/gyms'); // Adjusted to the relative path
                const data = await response.json();
                setGyms(data); // Assuming the API returns an array of gyms
            } catch (error) {
                console.error('Error fetching gyms:', error);
            }
        };

        fetchGyms();
    }, []);

    return (
        <div className="locations-container">
            {gyms.map(gym => (
                <div key={gym.id} className="card">
                    <div className="card-header">
                        <h3 className="text-xl font-bold">{gym.name}</h3>
                    </div>

                    <div className="card-body">
                        <div className="mb-5">
                            {gym.description}
                        </div>
                        <div className="border border-gray-100 mb-5"></div>
                    </div>

                    <div className="card-footer">
                        <div className="location-icon flex items-center">
                            <FaMapMarker className='inline mb-1 mr-1' />
                            <span className="location-text">{`${gym.latitude} - ${gym.longitude}`}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Locations;
