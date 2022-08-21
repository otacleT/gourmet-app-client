import { useCallback, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { RegistInfo } from "src/component/RegistInfo";
import { FirebaseApp, getApp } from "firebase/app";
import "../lib/firebase/init";
import { Marked } from "src/component/Marked";

type Marker = {
  name: string;
  latCoord: number;
  longCoord: number;
};

export type Info = {
  name: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
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
  const [info, setInfo] = useState<Info>();
  const [regist, setRegist] = useState<boolean>(false);
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);
  const app: FirebaseApp = getApp();

  const handleInfo = useCallback((e: any) => {
    setInfo((prevstate) => {
      return {
        ...prevstate,
        name: e.result.text_ja,
        category: e.result.properties.category,
        address:
          e.result.context[0].text_ja +
          " " +
          e.result.context[3].text_ja +
          e.result.context[2].text_ja +
          e.result.context[1].text_ja +
          e.result.properties.address,
        latitude: e.result.geometry.coordinates[1],
        longitude: e.result.geometry.coordinates[0],
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
      placeholder: "登録する",
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
    geocoder.on("result", function (e) {
      handleInfo(e);
      setRegist(true);

      var marker1 = new mapboxgl.Marker({ color: "blue" })
        .setLngLat(e.result.center)
        .addTo(map.current);
      map.current.flyTo({
        center: e.result.center,
        zoom: 15,
        speed: 5,
      });

      // new mapboxgl.Popup({ offset: 35, closeOnClick: true })
      //   .setLngLat(e.result.center)
      //   .setHTML("MapBox Coordinate<br/>" + e.result.center)
      //   .addTo(map.current);
      map.current.on("click", function () {
        marker1.remove();
      });
    });
  }, []);

  return (
    <>
      <div className="w-screen h-[calc(100vh-70px)]" ref={mapContainer} />
      {/* {info !== undefined && regist && (
        <RegistInfo info={info} regist setRegist={setRegist} />
      )} */}
      {/* <Marked map={map} /> */}
    </>
  );
};

export default Home;
