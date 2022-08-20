import { useCallback, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Drawer } from "@mantine/core";
import mapboxgl from "mapbox-gl";
import { useMap } from "../hook/Map";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { RegistInfo } from "src/component/RegistInfo";
import { Evaluate } from "src/component/Evaluate";

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

export type Eval = {
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
  const { maps } = useMap();
  const [info, setInfo] = useState<Info>();
  const [ev, setEv] = useState<Eval>();
  const [regist, setRegist] = useState<boolean>(false);
  const [elt, setElt] = useState<boolean>(false);
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);
  const geojson = {
    type: "Feature",
    features: maps.map((marker) => ({
      properties: {
        name: marker.name,
        category: marker.category,
        address: marker.address,
      },
      geometry: {
        type: "Point",
        coordinates: {
          lat: marker.latitude / 100000,
          lng: marker.longitude / 100000,
        },
      },
    })),
  };

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
  const handleEv = useCallback((e: any) => {
    setEv((prevstate) => {
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
  const handleEval = useCallback(() => {
    setElt(true);
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
  useEffect(() => {
    map.current.on("load", () => {
      geojson.features.forEach((marker) => {
        const registedMarker = new mapboxgl.Marker({
          color: "#c9171e",
        })
          .setLngLat(marker.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 40 }).setHTML(
              `<p style="font-size: 15px; font-weight: bold; color: #c9171e;">${marker.properties.name}</p>
              <p style="font-size: 13px; line-height: 1.3;">category</p>
              <div style="position: relative; width: 5em; height: 1em; font-size: 15px;">
                <div style="position: absolute; top:0; left: 0; overflow: hidden; white-space: nowrap; color: #c9171e; width: 1.4em;">★★★★★</div>
                <div style="color: #aeaeae;">☆☆☆☆☆</div>
              </div>
              `
            )
          )
          .addTo(map.current);
        registedMarker.getElement().addEventListener("click", function () {
          handleEv(marker);
          setElt(true);
        });
      });
    });
  }, [maps]);

  return (
    <>
      <div className="w-screen h-[calc(100vh-70px)]" ref={mapContainer} />
      {info !== undefined && regist && (
        <RegistInfo info={info} regist setRegist={setRegist} />
      )}
      {ev !== undefined && <Evaluate ev={ev} elt setElt={setElt} />}
    </>
  );
};

export default Home;
