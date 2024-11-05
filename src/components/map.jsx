import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const [markerPosition, setMarkerPosition] = useState(null);

  // Component to handle map clicks
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]); // Update marker position on click
        console.log("Clicked at coordinates:", e.latlng.lat, e.latlng.lng); // Logs the coordinates
      }
    });
    return null;
  }

  return (
    <MapContainer center={[50.8503, 4.3517]} zoom={7} style={{ height: '400px', width: '40%', margin: '0 auto', display: 'block' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler /> {/* Add the click handler */}
      {markerPosition && ( // Conditionally render marker if position is set
        <Marker position={markerPosition}>
          <Popup>
            Marker at {markerPosition[0].toFixed(4)}, {markerPosition[1].toFixed(4)}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Map