"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { FC } from "react";
import Link from "next/link";

// Fix missing marker icons (Leaflet CSS doesn't load these automatically in some bundlers)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Restaurant = {
  name: string;
  lat: number;
  lng: number;
  address: string;
};

type Props = {
  restaurants: Restaurant[];
};

const RestaurantMap: FC<Props> = ({ restaurants }) => {
  const center: [number, number] =
    restaurants.length > 0
      ? [restaurants[0].lat, restaurants[0].lng]
      : [-27.47, 153.03]; // Fallback to Brisbane

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={11}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {restaurants.map((r, i) => (
          <Marker key={i} position={[r.lat, r.lng]}>
            <Popup>
              <strong>{r.name}</strong>
              <br />
              {r.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="text-xs text-gray-400 text-center pt-4 pb-4">
        I would like to thank{" "}
        <Link href="https://www.openstreetmap.org/">OpenStreetMap</Link> for
        letting me use their free maps ❤️
      </div>
    </div>
  );
};

export default RestaurantMap;
