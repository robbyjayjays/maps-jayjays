import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Create a custom DivIcon
const customDivIcon = new L.DivIcon({
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
  className: 'custom-div-icon',
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

      {/* Render a marker at the clicked position */}
      {markerPosition && (
        <Marker position={markerPosition} icon={customDivIcon}>
          <Popup>
            Marker at {markerPosition[0].toFixed(4)}, {markerPosition[1].toFixed(4)}
          </Popup>
        </Marker>
      )}

      {/* Render markers for each of the 3 closest gyms */}
      {gyms.map((gym, index) => (
        <Marker key={index} position={[gym.latitude, gym.longitude]} icon={customDivIcon}>
          <Popup>
            {gym.name}<br />
            Location: {gym.location_name}<br />
            Coordinates: {gym.latitude.toFixed(4)}, {gym.longitude.toFixed(4)}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
