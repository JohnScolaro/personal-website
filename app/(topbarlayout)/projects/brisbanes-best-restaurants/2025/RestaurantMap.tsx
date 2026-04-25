"use client";

import React, { useState } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";
import Link from "next/link";

type Restaurant = {
  name: string;
  lat: number;
  lng: number;
  address: string;
};

type Props = {
  restaurants: Restaurant[];
};

const RestaurantMap: React.FC<Props> = ({ restaurants }) => {
  const [activeRes, setActiveRes] = useState<Restaurant | null>(null);

  const center: [number, number] =
    restaurants.length > 0
      ? [restaurants[0].lat, restaurants[0].lng]
      : [-27.47, 153.03];

  return (
    <div
      style={{ height: "500px", width: "100%" }}
      className="pigeon-map-container"
    >
      <style jsx global>{`
        .pigeon-map-container img {
          max-width: none !important;
          max-height: none !important;
          width: 256px !important;
          height: 256px !important;
          transition: none !important;
          display: block !important;
          box-sizing: content-box !important;
        }
        .pigeon-map-container .pigeon-overlays,
        .pigeon-map-container .pigeon-layers {
          box-sizing: content-box !important;
        }
      `}</style>

      <Map
        height={500}
        center={center}
        defaultZoom={11}
        onClick={() => setActiveRes(null)}
        attribution={false}
      >
        {restaurants.map((r, i) => (
          <Marker
            key={`${r.lat}-${r.lng}-${i}`}
            width={35}
            anchor={[r.lat, r.lng]}
            color={activeRes?.name === r.name ? "#ef4444" : "#3b82f6"}
            onClick={() => setActiveRes(r)}
          />
        ))}

        {activeRes && (
          <Overlay anchor={[activeRes.lat, activeRes.lng]} offset={[0, 45]}>
            <div className="bg-white p-3 rounded shadow-xl border border-gray-200 min-w-[180px] z-50">
              <div className="flex justify-between items-start mb-1">
                <strong className="text-sm font-bold text-gray-900">
                  {activeRes.name}
                </strong>
                <button
                  onClick={() => setActiveRes(null)}
                  className="text-gray-400 ml-2"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-gray-600">{activeRes.address}</p>
            </div>
          </Overlay>
        )}
      </Map>

      {/* Reverted to your original attribution style */}
      <div className="text-xs text-gray-400 text-center pt-4 pb-4">
        I would like to thank{" "}
        <Link href="https://www.openstreetmap.org/">OpenStreetMap</Link> for
        letting me use their free maps ❤️
      </div>
    </div>
  );
};

export default RestaurantMap;
