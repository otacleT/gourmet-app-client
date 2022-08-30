import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NextPage } from "next";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { FirebaseApp, getApp } from "firebase/app";
import "../lib/firebase/init";
import { useShops } from "src/hook/Shops";
import { AddStar } from "src/component/AddStar";
import { useStar } from "src/hook/Star";
import { logItem } from "src/hook/Star/Star";
import { Info } from "src/types/info";
import { useAuth } from "src/context/auth";
import { useRouter } from "next/router";

const Map: NextPage = () => {
  const [info, setInfo] = useState<Info>();
  const [opened, setOpened] = useState<boolean>(false);
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);
  const app: FirebaseApp = getApp();
  const { shops } = useShops();
  const { stars } = useStar();
  const [point, setPoint] = useState<number>(1);
  const { user } = useAuth();
  const router = useRouter();
  const searchId = useCallback((stars: logItem[], id: number) => {
    for (const x of stars) {
      if (x.id == id) {
        return x.star;
      }
    }
    return 0;
  }, []);
  const geojson = useMemo(() => {
    return {
      type: "Feature",
      features: shops.map((shop) => ({
        properties: {
          id: shop.id,
          name: shop.name,
          star: searchId(stars, shop.id),
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
  }, [shops, stars]);

  const handleInfo = useCallback((e: any) => {
    setInfo((prevstate) => {
      return {
        ...prevstate,
        id: e.properties.id,
        name: e.properties.name,
        category: e.properties.category,
        address: e.properties.address,
        latitude: e.geometry.coordinates.lat,
        longitude: e.geometry.coordinates.lng,
        star: e.properties.star,
      };
    });
  }, []);
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? "";
    map.current = new mapboxgl.Map({
      logoPosition: "bottom-left",
      attributionControl: false,
      container: mapContainer.current,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
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
          color: "#fe553e",
        })
          .setLngLat(marker.geometry.coordinates)
          .addTo(map.current);
        registedMarker.getElement().addEventListener("click", function () {
          handleInfo(marker);
          setOpened(true);
        });
      });
    });

    if (user) {
      const array = Object.values(user);

      for (const x of array) {
        if (x == "") {
          setPoint((prevstate) => {
            return prevstate - 1;
          });
        }
      }
    }
  }, [shops, geojson]);
  return (
    <main>
      <div className="w-screen h-[calc(100vh-70px)]" ref={mapContainer} />
      <AddStar info={info} opened={opened} setOpened={setOpened} />
    </main>
  );
};

export default Map;
