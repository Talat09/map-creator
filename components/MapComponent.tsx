"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Polygon,
  Marker,
  Tooltip,
} from "react-leaflet";
import type { LeafletMouseEvent } from "leaflet";

import { EditControl } from "react-leaflet-draw";
import { useDispatch, useSelector } from "react-redux";
import {
  addPolygon,
  updatePolygon,
  deletePolygon,
} from "../store/polygonSlice";
import type { RootState } from "../store/store";
import type { LatLngTuple } from "leaflet";
import type * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

// Fix for missing marker icons
const customIcon = new L.Icon({
  iconUrl:
    "https://static.vecteezy.com/system/resources/thumbnails/019/897/155/small/location-pin-icon-map-pin-place-marker-png.png", // Ensure this file is in the `public/` folder

  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const MapComponent = () => {
  const dispatch = useDispatch();
  const polygons = useSelector((state: RootState) => state.polygons.polygons);
  const [map, setMap] = useState<L.Map | null>(null);

  const onCreated = (e: any) => {
    const { layer } = e;
    const coordinates = layer
      .getLatLngs()[0]
      .map((latlng: L.LatLng) => [latlng.lat, latlng.lng] as LatLngTuple);
    const newPolygon = {
      id: Date.now().toString(),
      coordinates,
      fillColor: "#3388ff",
      borderColor: "#3388ff",
      label: `Polygon ${polygons.length + 1}`,
    };
    dispatch(addPolygon(newPolygon));
  };

  const onEdited = (e: any) => {
    const { layers } = e;
    layers.eachLayer((layer: L.Layer) => {
      const id = (layer as any).options.id;
      const coordinates = (layer as L.Polygon)
        .getLatLngs()[0]
        .map((latlng: L.LatLng) => [latlng.lat, latlng.lng] as LatLngTuple);
      console.log((layer as L.Polygon).getLatLngs()[0]);
      const updatedPolygon = polygons.find((p) => p.id === id);
      if (updatedPolygon) {
        dispatch(updatePolygon({ ...updatedPolygon, coordinates }));
      }
    });
  };

  const onDeleted = (e: any) => {
    const { layers } = e;
    layers.eachLayer((layer: L.Layer) => {
      const id = (layer as any).options.id;
      dispatch(deletePolygon(id));
    });
  };

  const calculateCenter = (coordinates: LatLngTuple[]): LatLngTuple => {
    const lat =
      coordinates.reduce((sum, coord) => sum + coord[0], 0) /
      coordinates.length;
    const lng =
      coordinates.reduce((sum, coord) => sum + coord[1], 0) /
      coordinates.length;
    return [lat, lng];
  };

  const calculateArea = (coordinates: LatLngTuple[]): number => {
    if (coordinates.length < 3) return 0;
    let area = 0;
    for (let i = 0; i < coordinates.length; i++) {
      const j = (i + 1) % coordinates.length;
      area += coordinates[i][0] * coordinates[j][1];
      area -= coordinates[j][0] * coordinates[i][1];
    }
    return Math.abs(area) / 2;
  };

  useEffect(() => {
    if (!map) return;
    map.on("click", (e: LeafletMouseEvent) => {
      console.log(`Clicked at ${e.latlng.lat}, ${e.latlng.lng}`);
    });
  }, [map]);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{
        height: "500px",
        width: "100%",
        backgroundColor: "gray",
        position: "relative",
        zIndex: "-100px",
      }}
      whenReady={() => setMap}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={onCreated}
          onEdited={onEdited}
          onDeleted={onDeleted}
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
          }}
        />
        {polygons.map((polygon) => (
          <Polygon
            key={polygon.id}
            positions={polygon.coordinates}
            pathOptions={{
              color: polygon.borderColor,
              fillColor: polygon.fillColor,
            }}
          >
            <Marker position={calculateCenter(polygon.coordinates)} icon={customIcon}>
              <Tooltip permanent>
                {polygon.label}
                <br />
                Area: {calculateArea(polygon.coordinates).toFixed(2)} sq km
              </Tooltip>
            </Marker>
          </Polygon>
        ))}
      </FeatureGroup>
    </MapContainer>
  );
};

export default MapComponent;
