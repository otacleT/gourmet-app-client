import { useEffect, useRef } from "react";
import { NextPage } from "next";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useEthers } from "@usedapp/core";
import { Drawer } from "@mantine/core";
import mapboxgl from "mapbox-gl";
import { useMap } from "../hook/Map";
import { useAddMap } from "../hook/AddMap";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

type Marker = {
  name: string;
  latCoord: number;
  longCoord: number;
};

export const markers: Marker[] = [
  {
    name: "天神駅",
    latCoord: 33.5914,
    longCoord: 130.3989,
  },
  {
    name: "博多駅",
    latCoord: 33.5897,
    longCoord: 130.4207,
  },
];

const Home: NextPage = () => {
  const { activateBrowserWallet, account } = useEthers();
  const { loading, success, error, send } = useAddMap();
  const { maps } = useMap();
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);
  const geojson = {
    type: "Feature",
    features: markers.map((marker) => ({
      properties: {
        name: marker.name,
      },
      geometry: {
        type: "Point",
        coordinates: {
          lat: marker.latCoord,
          lng: marker.longCoord,
        },
      },
    })),
  };
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? "";
    map.current = new mapboxgl.Map({
      logoPosition: "bottom-left",
      attributionControl: false,
      container: mapContainer.current,
      style: "mapbox://styles/taisei-m/cl6lh9446000h14pebx8w9o75",
      center: [139.6503, 35.6762], // center map on Chad
      zoom: 10,
    });
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl as any,
      types: "poi",
    });
    map.current.addControl(geocoder, "top-left");
    map.current.on("load", () => {
      geojson.features.forEach((marker) => {
        new mapboxgl.Marker({
          color: "#FF3333",
        })
          .setLngLat(marker.geometry.coordinates)
          .setPopup(
            // add pop out to map
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<p style="font-size: 15px; ">Name: ${marker.properties.name}</p>
              <button style="font-size: 15px; color: #fff; background-color: #000; width: 100%; padding: 10px; margin-top: 20px; border-radius: 10px;">Evaluate</button>
              `
            )
          )
          .addTo(map.current);
      });
    });
    geocoder.on("result", function (e) {
      console.log(e);
    });
  }, []);
  return (
    <div>
      <div className="w-screen h-screen" ref={mapContainer} />
      {/* <Drawer
        opened={open}
        onClose={() => setOpen(false)}
        title={search.name}
        padding="xl"
        size="lg"
      >
        <p>{search.star}</p>
        <ul>
          <li>{search.latitude}</li>
          <li>{search.longitude}</li>
        </ul>
        <button
          className="w-full p-2 text-lg text-white bg-black"
          onClick={handleAdd}
        >
          Add blockchain
        </button>
      </Drawer> */}
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
