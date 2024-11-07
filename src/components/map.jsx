import React from 'react';
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
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Create a custom DivIcon for the clicked marker
const customClickedIcon = new L.DivIcon({
  html: `<div style="
    background-color: red;
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
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const Map = ({ setGyms, gyms, showUserMarker, markerPosition, setMarkerPosition }) => {
  function MapClickHandler() {
    useMapEvents({
      click: async (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        setMarkerPosition([lat, lng]);
        console.log("Clicked at coordinates:", lat, lng);

        try {
          const response = await fetch(`/api/gyms?lat=${lat}&lng=${lng}`);
          const data = await response.json();
          setGyms(data);
        } catch (error) {
          console.error('Error fetching closest gyms:', error);
        }
      },
    });
    return null;
  }

  return (
    <>
      <MapContainer center={[50.8503, 4.3517]} zoom={7} style={{ height: '400px', width: '40%', margin: '0 auto', display: 'block' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />

        {/* Render the 'YOU' marker only if showUserMarker is true */}
        {showUserMarker && markerPosition && (
          <Marker position={markerPosition} icon={customClickedIcon}>
            <Popup>
              Marker at {markerPosition[0].toFixed(4)}, {markerPosition[1].toFixed(4)}
            </Popup>
          </Marker>
        )}

        {/* Render markers for each gym */}
        {gyms.map((gym, index) => (
          (gym.latitude && gym.longitude) && (
            <Marker
              key={index}
              position={[Number(gym.latitude), Number(gym.longitude)]}
              icon={customGymIcon}
            >
              <Popup>
                {gym.name}<br />
                Location: {gym.location_name}<br />
                Coordinates: {Number(gym.latitude).toFixed(4)}, {Number(gym.longitude).toFixed(4)}
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
      <div className='forgot-gym-card'>
        forgot a gym this is the card for u!
      </div>
    </>
  );
};

export default Map;
