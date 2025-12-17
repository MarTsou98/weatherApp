'use client';

import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

type MapClickProps = {
  onSelect: (lat: number, lon: number) => void;
};

function MapClickHandler({ onSelect }: MapClickProps) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onSelect(lat, lng);
    },
  });

  return null;
}

export default function WorldMap({ onSelect }: MapClickProps) {
  return (
  <MapContainer
  center={[20, 0]}
  zoom={2}
  style={{ width: '800px', height: '600px' }}
  worldCopyJump={true}       // disables horizontal repeating
  maxBounds={[
    [-90, -180],             // SW corner (lat, lon)
    [90, 180],               // NE corner
  ]}
>

      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onSelect={onSelect} />
    </MapContainer>
  );
}
