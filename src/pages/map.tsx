import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { FirebaseApp, getApp } from "firebase/app";
import { NextPage } from "next";
import { useCallback, useMemo, useState } from "react";
import ReactMap, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { ShopInfo } from "src/component/ShopInfo";
import { Result, useResult } from "src/hook/Result/Result";
import { useShops } from "src/hook/Shops";
import GeocoderControl from "src/lib/mapbox/geocoder";
import { Info } from "src/types/info";
import "../lib/firebase/init";

const Map: NextPage = () => {
  const [info, setInfo] = useState<Info>();
  const [opened, setOpened] = useState<boolean>(false);
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
  const handleMarker = useCallback((item: any) => {
    handleInfo(item);
    setOpened(true);
  }, []);
  return (
    <main className="h-[calc(100vh-70px)]">
      <ReactMap
        initialViewState={{
          longitude: 139.6503,
          latitude: 35.6762,
          zoom: 10,
        }}
        mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN}
        attributionControl={false}
      >
        <GeocoderControl
          mapboxAccessToken={
            process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? ""
          }
          position="top-left"
          placeholder="search a store"
        />
        {geojson.features.map((marker) => (
          <Marker
            latitude={marker.geometry.coordinates.lat}
            longitude={marker.geometry.coordinates.lng}
            onClick={() => handleMarker(marker)}
            color="#fe553e"
            key={Math.round(Math.random() * 10000)}
          />
        ))}
        <GeolocateControl />
        <NavigationControl />
      </ReactMap>
      <ShopInfo info={info} opened={opened} setOpened={setOpened} />
    </main>
  );
};

export default Map;
