import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ setGyms }) => {
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
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>
            Marker at {markerPosition[0].toFixed(4)}, {markerPosition[1].toFixed(4)}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
