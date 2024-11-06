import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Create a custom DivIcon for gym markers
const customGymIcon = new L.DivIcon({
  html: `<div style="
    background-color: blue;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
  ">GYM</div>`,
  className: 'custom-gym-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 30], // Center bottom anchor
  popupAnchor: [0, -30], // Above the icon
});

// Create a custom DivIcon for the clicked marker
const customClickedIcon = new L.DivIcon({
  html: `<div style="
    background-color: red; /* Change color for clicked marker */
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
  ">YOU</div>`,
  className: 'custom-clicked-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 30], // Center bottom anchor
  popupAnchor: [0, -30], // Above the icon
});

const Map = ({ setGyms, gyms }) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  function MapClickHandler() {
    useMapEvents({
      click: async (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        setMarkerPosition([lat, lng]);
        console.log("Clicked at coordinates:", lat, lng);

        try {
          // Fetch the 3 closest gyms from the API
          const response = await fetch(`/api/gyms?lat=${lat}&lng=${lng}`);
          const data = await response.json();
          setGyms(data); // Update the gyms state with the closest gyms
        } catch (error) {
          console.error('Error fetching closest gyms:', error);
        }
      },
    });
    return null;
  }

  return (
    <MapContainer center={[50.8503, 4.3517]} zoom={7} style={{ height: '400px', width: '40%', margin: '0 auto', display: 'block' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />

      {/* Render a marker at the clicked position with a different color */}
      {markerPosition && (
        <Marker position={markerPosition} icon={customClickedIcon}>
          <Popup>
            Marker at {markerPosition[0].toFixed(4)}, {markerPosition[1].toFixed(4)}
          </Popup>
        </Marker>
      )}

      {/* Render markers for each of the 3 closest gyms */}
      {gyms.map((gym, index) => (
        (gym.latitude && gym.longitude) && // Ensure latitude and longitude exist
        <Marker
          key={index}
          position={[Number(gym.latitude), Number(gym.longitude)]} // Convert to numbers
          icon={customGymIcon} // Use the gym icon for other markers
        >
          <Popup>
            {gym.name}<br />
            Location: {gym.location_name}<br />
            Coordinates: {Number(gym.latitude).toFixed(4)}, {Number(gym.longitude).toFixed(4)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
