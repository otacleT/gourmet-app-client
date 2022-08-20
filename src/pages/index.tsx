import { useCallback, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Dialog, Drawer, Text } from "@mantine/core";
import mapboxgl from "mapbox-gl";
import { useMap } from "../hook/Map";
import { useAddMap } from "../hook/AddMap";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useForm } from "@mantine/form";
import { RiMapPinLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { InfuraProvider } from "@ethersproject/providers";

type Marker = {
  name: string;
  latCoord: number;
  longCoord: number;
};

type Info = {
  name: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
};

type Eval = {
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
  const [ev, setEv] = useState<Eval>();
  const [show1, setShow1] = useState<boolean>(true);
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
  const handleSubmit = async (info: Info) => {
    await send(
      info.name,
      Math.round(info.latitude * 100000),
      Math.round(info.longitude * 100000),
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
      console.log(e);

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
          radius={0}
          position={{ left: "20px", bottom: "20px" }}
        >
          <div className="absolute top-0 left-0 -translate-y-full w-full h-[200px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <h3 className="text-xl font-bold">{info.name}</h3>
          <p className="text-sm">{info.category}</p>
          <dl className="flex flex-wrap w-full items-start justify-between mt-3">
            <dt className="w-[30px] h-[22px]">
              <IconContext.Provider value={{ size: "20px" }}>
                <RiMapPinLine />
              </IconContext.Provider>
            </dt>
            <dd className="w-[calc(100%-30px)] text-base leading-snug">
              〒{info.address}
            </dd>
          </dl>
          <div className="flex justify-around mt-5">
            <button
              className="flex w-[calc(50%-10px)] h-[40px] justify-center items-center text-sm font-bold text-[#333] border border-[#333]"
              onClick={() => setShow1(false)}
            >
              CANCEL
            </button>
            <button
              className="flex w-[calc(50%-10px)] h-[40px] justify-center items-center text-sm font-bold bg-[#333] text-white"
              onClick={() => handleSubmit(info)}
            >
              REGISTER
            </button>
          </div>
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
