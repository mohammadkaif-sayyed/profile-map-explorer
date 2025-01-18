import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function Map({ selectedProfile }) {
  const position = [selectedProfile.lat, selectedProfile.lng];
  const zoom = 13;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      {/* Title Section with different background */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{selectedProfile.name}'s Location</h2>
      </div>

      {/* Map Container */}
      <MapContainer center={position} zoom={zoom} style={{ height: '100%', minHeight: '400px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <div>
              <h3 className="font-semibold">{selectedProfile.name}</h3>
              <p>{selectedProfile.address}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
