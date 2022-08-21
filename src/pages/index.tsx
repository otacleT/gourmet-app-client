import { useCallback, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { FirebaseApp, getApp } from "firebase/app";
import "../lib/firebase/init";
import { Marked } from "src/component/Marked";
import { useShops } from "src/hook/Shops";

export type Info = {
  name: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
};

const Home: NextPage = () => {
  const [info, setInfo] = useState<Info>();
  const [opened, setOpened] = useState<boolean>(false);
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);
  const app: FirebaseApp = getApp();
  const { isLoading, shops } = useShops();
  const geojson = {
    type: "Feature",
    features: shops.map((shop) => ({
      properties: {
        name: shop.name,
        category: shop.category,
        postcode: shop.postcode,
        address: shop.address,
      },
      geometry: {
        type: "Point",
        coordinates: {
          lat: shop.latitude,
          lng: shop.longitude,
        },
      },
    })),
  };
  const handleInfo = useCallback((e: any) => {
    setInfo((prevstate) => {
      return {
        ...prevstate,
        name: e.properties.name,
        category: e.properties.category,
        address: e.properties.address,
        latitude: e.geometry.coordinates.lat,
        longitude: e.geometry.coordinates.lng,
      };
    });
  }, []);
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
      marker: false,
      placeholder: "seach a store",
    });
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });
    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true,
    });
    map.current.addControl(geocoder, "top-left");
    map.current.addControl(geolocate, "top-right");
    map.current.addControl(nav, "top-right");
  }, []);

  useEffect(() => {
    map.current.on("load", () => {
      geojson.features.forEach((marker) => {
        const registedMarker = new mapboxgl.Marker({
          color: "#c9171e",
        })
          .setLngLat(marker.geometry.coordinates)
          .addTo(map.current);
        registedMarker.getElement().addEventListener("click", function () {
          handleInfo(marker);
          setOpened(true);
        });
      });
    });
  }, [shops]);

  return (
    <main>
      <div className="w-screen h-[calc(100vh-70px)]" ref={mapContainer} />
      <Marked info={info} opened={opened} setOpened={setOpened} />
    </main>
  );
};

export default Home;
