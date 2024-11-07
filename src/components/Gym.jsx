import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import for toast notifications if needed
import { useNavigate } from 'react-router-dom'; // Import for navigation
import '../assets/css/gym.css';

const Gym = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [locationName, setLocationName] = useState('');

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const newGym = {
      name,
      description,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      location_name: locationName,
    };

    try {
      const response = await fetch('/api/add-gym', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGym),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status}, ${errorText}`);
      }

      toast.success('Gym successfully added!');
      // Optionally navigate to a different page after successful submission
      navigate('/');
    } catch (error) {
      console.error('Error adding gym:', error);
      toast.error('Failed to add gym. Please try again.');
    }
  };

  return (
    <div className="gym-form-container">
      <h2>Add Your Gym</h2>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="name">Gym Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter gym name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description"
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter latitude (e.g., 50.133)"
            step="0.000001"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter longitude (e.g., 4.3517)"
            step="0.000001"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location_name">Location Name:</label>
          <input
            type="text"
            id="location_name"
            name="location_name"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Enter location name"
            required
          />
        </div>

        <button type="submit" className="submit-button">Add Gym</button>
      </form>
    </div>
  );
};

export default Gym;
