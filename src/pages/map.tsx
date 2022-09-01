import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { FirebaseApp, getApp } from "firebase/app";
import mapboxgl from "mapbox-gl";
import { NextPage } from "next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ShopInfo } from "src/component/ShopInfo";
import { useResult } from "src/hook/Result";
import { Result } from "src/hook/Result/Result";
import { useShops } from "src/hook/Shops";
import { Info } from "src/types/info";
import "../lib/firebase/init";

const Map: NextPage = () => {
  const [info, setInfo] = useState<Info>();
  const [opened, setOpened] = useState<boolean>(false);
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);
  const app: FirebaseApp = getApp();
  const { shops } = useShops();
  const { results } = useResult();
  const searchId = useCallback((results: Result[], id: number) => {
    let latest = 0;
    for (const x of results) {
      if (x.id == id) {
        latest = x.star / 10;
      }
    }
    return latest;
  }, []);

  const geojson = useMemo(() => {
    return {
      type: "Feature",
      features: shops.map((shop) => ({
        properties: {
          id: shop.id,
          name: shop.name,
          star: searchId(results, shop.id),
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
  }, [shops, results]);

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
  }, [geojson]);
  return (
    <main>
      <div className="w-screen h-[calc(100vh-70px)]" ref={mapContainer} />
      <ShopInfo info={info} opened={opened} setOpened={setOpened} />
    </main>
  );
};

export default Map;
