import { useCallback, useRef, useState } from "react";
import { NextPage } from "next";
import MapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useEthers } from "@usedapp/core";
import { Drawer } from "@mantine/core";
import { useMap } from "../hook/Map";
import { mapItem } from "../hook/Map/Map";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN;

type Test = {
  latitude: number;
  longitude: number;
  zoom: number;
};

const Home: NextPage = () => {
  const { activateBrowserWallet, account } = useEthers();
  const { maps } = useMap();
  const mapRef = useRef(null);
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [viewport, setViewport] = useState<Test>({
    latitude: 35.6762,
    longitude: 139.6503,
    zoom: 8,
  });
  const [search, setSearch] = useState<mapItem>({
    name: "",
    latitude: 0,
    longitude: 0,
    star: 0,
  });
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

  const handleResult = useCallback(
    (e: any) => {
      setSearch((prevItems) => {
        const newItems = {
          ...prevItems,
          name: e.result.text_ja,
          latitude: e.result.center[1],
          longitude: e.result.center[0],
        };
        return newItems;
      });
      setShow(true);
    },
    [show, search]
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
        attributionControl={false}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
          types="poi"
          onResult={handleResult}
          marker={true}
        />
        {show && (
          <Marker
            className="w-[30px] h-[30px] bg-black rounded-full"
            offsetLeft={-15}
            offsetTop={-15}
            latitude={search.latitude}
            longitude={search.longitude}
            onClick={(e: any) => {
              // e.originalEvent.stopPropagation();
              setOpen(true);
            }}
          />
        )}
        {show && (
          <Popup
            latitude={search.latitude}
            longitude={search.longitude}
            className="p-3"
            onClose={() => setShow(false)}
          >
            <button className="p-2 text-sm text-white bg-black rounded-sm">
              この場所を追加する
            </button>
          </Popup>
        )}
        <GeolocateControl label="現在地" className="bottom-24 right-2" />
        <NavigationControl className="bottom-1 right-2" />
      </MapGL>
      <Drawer
        opened={open}
        onClose={() => setOpen(false)}
        title="Register"
        padding="xl"
        size="xl"
      >
        {/* Drawer content */}
      </Drawer>
      {account ? (
        <div className="absolute top-2 right-2 px-4 py-2 bg-black text-white text-lg">
          Connected
        </div>
      ) : (
        <button
          className="absolute top-2 right-2 px-4 py-2 bg-black text-white text-lg"
          onClick={activateBrowserWallet}
        >
          Connect wallet
        </button>
      )}
    </div>
  );
};

export default Home;
