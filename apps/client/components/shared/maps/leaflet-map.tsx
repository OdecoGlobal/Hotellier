'use client';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

type Props = {
  onSelect?: (lat: number, lng: number) => void;
};

function LocationPicker({ onSelect }: Props) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPosition(coords);
      onSelect?.(coords[0], coords[1]);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function LeafletMap({ onSelect }: Props) {
  return (
    <MapContainer
      center={[6.5244, 3.3792]} // Default: Lagos, Nigeria
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationPicker onSelect={onSelect} />
    </MapContainer>
  );
}
