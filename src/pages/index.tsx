import { useCallback, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useEthers } from "@usedapp/core";
import {
  Button,
  Dialog,
  Drawer,
  Group,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
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
  const [ev, setEv] = useState<Info>();
  const [show1, setShow1] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
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
    form.setValues({
      name: e.result.text_ja,
      latitude: e.result.geometry.coordinates[1],
      longitude: e.result.geometry.coordinates[0],
      star: 3,
    });
  }, []);
  const handleEv = useCallback((e: any) => {
    setEv((prevstate) => {
      return {
        ...prevstate,
        name: e.properties.name,
        latitude: e.geometry.coordinates.lat,
        longitude: e.geometry.coordinates.lng,
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
      setShow1(true);

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
      // map.current.on("click", function () {
      //   marker1.remove();
      // });
    });
  }, []);
  useEffect(() => {
    map.current.on("load", () => {
      geojson.features.forEach((marker) => {
        const registedMarker = new mapboxgl.Marker({
          color: "#FF3333",
        })
          .setLngLat(marker.geometry.coordinates)
          // .setPopup(
          //   new mapboxgl.Popup({ offset: 25 }).setHTML(
          //     `<p style="font-size: 15px; ">Name: ${marker.properties.name}</p>
          //     <button style="font-size: 15px; color: #fff; background-color: #000; width: 100%; padding: 10px; margin-top: 20px; border-radius: 10px;">Evaluate</button>
          //     `
          //   )
          // )
          .addTo(map.current);
        registedMarker.getElement().addEventListener("click", function () {
          setShow2(true);
          handleEv(marker);
        });
      });
    });
  }, [maps, show1]);

  return (
    <>
      <div className="w-screen h-[calc(100vh-70px)]" ref={mapContainer} />
      {info !== undefined && (
        <Dialog
          opened={show1}
          withCloseButton
          onClose={() => setShow1(false)}
          size="lg"
          radius="md"
          position={{ left: "20px", bottom: "20px" }}
          // className="w-[300px] py-2 px-3 bg-white absolute bottom-4 right-4"
        >
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
        </Dialog>
      )}
      <Drawer
        opened={show2}
        onClose={() => setShow2(false)}
        title="評価を行う"
        padding="xl"
        size="lg"
        overlayOpacity={0.1}
        position="right"
        className="h-[calc(100vh-70px)] top-auto bottom-0"
      >
        <h3>{ev?.name}</h3>
        <ul>
          <li>{ev?.latitude}</li>
          <li>{ev?.longitude}</li>
        </ul>
      </Drawer>
    </>
  );
};

export default Home;
