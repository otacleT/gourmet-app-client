import { useCallback, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useEthers } from "@usedapp/core";
import { Button, Dialog, Group, Space, Text, TextInput } from "@mantine/core";
import mapboxgl from "mapbox-gl";
import { useMap } from "../hook/Map";
import { useAddMap } from "../hook/AddMap";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useForm } from "@mantine/form";

type Marker = {
  name: string;
  latCoord: number;
  longCoord: number;
};

type Info = {
  name: string;
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
  const { loading, success, error, send } = useAddMap();
  const { maps } = useMap();
  const [info, setInfo] = useState<Info>();
  const [show, setShow] = useState<boolean>(false);
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | any>(null);
  const form = useForm({
    initialValues: {
      name: "",
      latitude: 35.6762,
      longitude: 139.6503,
      star: 3,
    },
  });
  const geojson = {
    type: "Feature",
    features: maps.map((marker) => ({
      properties: {
        name: marker.name,
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
        latitude: e.result.geometry.coordinates[1],
        longitude: e.result.geometry.coordinates[0],
      };
    });
  }, []);
  const handleSubmit = async (values: typeof form.values) => {
    await send(
      values.name,
      Math.round(values.latitude * 100000),
      Math.round(values.longitude * 100000),
      3
    );
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
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    });
    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true,
    });
    map.current.addControl(geocoder, "top-left");
    map.current.addControl(geolocate, "top-right");
    map.current.addControl(nav, "top-right");
    geocoder.on("result", function (e) {
      console.log(e);
      handleInfo(e);
      setShow(true);
    });
  }, []);
  useEffect(() => {
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
  }, [maps]);

  return (
    <div>
      <div className="w-screen h-[calc(100vh-70px)]" ref={mapContainer} />
      {info !== undefined && (
        <div className="w-[300px] py-2 px-3 bg-white absolute bottom-4 right-4">
          <h3 className="text-lg ">店舗情報</h3>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              required
              label="Owner name"
              placeholder={info.name}
              {...form.getInputProps("name")}
            />
            <Space h="md" />
            <TextInput
              label="Latitude"
              placeholder={info.latitude}
              {...form.getInputProps("latitude")}
            />
            <Space h="md" />
            <TextInput
              label="Longitude"
              placeholder={info.longitude}
              {...form.getInputProps("longitude")}
            />
            {!!error && (
              <>
                <Space h="md" />
                <Text color="red">An error occured...</Text>
              </>
            )}
            <Space h="md" />
            <button className="w-full border-t border-[#ED1C24] bg-inherit">
              Add location
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
