import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";
import MapGL, { Popup } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { NextPage } from "next";
import { mapItem } from "../hook/Map/Map";

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN;

type Test = {
  latitude: number;
  longitude: number;
  zoom: number;
};

const Test: NextPage = () => {
  const [viewport, setViewport] = useState<Test>({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [selected, setSelected] = useState<mapItem>({
    name: "",
    latitude: 0,
    longitude: 0,
    star: 0,
  });
  const [show, setShow] = useState(false);
  const mapRef = useRef(null);
  const handleViewportChange = useCallback(
    (newViewport: Test) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport: Test) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  const handleSet = useCallback(
    (e: any) => {
      setSelected((prevItems) => {
        const newItems = {
          ...prevItems,
          name: e.result.text_ja,
          latitude: e.result.center[1],
          longitude: e.result.center[0],
        };
        return newItems;
      });
      setShow(true);
      console.log(e);
    },
    [show, selected]
  );

  return (
    <div style={{ height: "100vh" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/taisei-m/cl6lh9446000h14pebx8w9o75"
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
          types="poi"
          onResult={handleSet}
        />
        {show && (
          <Popup
            latitude={selected.latitude}
            longitude={selected.longitude}
            anchor="bottom"
            onClose={() => setShow(false)}
          >
            <div className="p-4 ">
              <p className="text-lg font-bold ">{selected.name}</p>
              <p className="text-lg font-bold ">{selected.latitude}</p>
              <p className="text-lg font-bold ">{selected.longitude}</p>
            </div>
          </Popup>
        )}
      </MapGL>
    </div>
  );
};

export default Test;
