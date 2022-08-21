import { Drawer } from "@mantine/core";
import { FC, MutableRefObject, useCallback, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useShops } from "src/hook/Shops";

type Marker = {
  map: MutableRefObject<any>;
};
type Info = {
  name: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
};

export const Marked: FC<Marker> = (props) => {
  const { map } = props;
  const [opened, setOpened] = useState<boolean>(false);
  const [info, setInfo] = useState<Info>();
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
  const handleEv = useCallback((e: any) => {
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
          setOpened(true);
        });
      });
    });
  }, [shops]);
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title={info?.name}
      padding="xl"
      size="lg"
      overlayOpacity={0.1}
      position="right"
      className="h-[calc(100vh-70px)] top-auto bottom-0"
    >
      <p>{info?.category}</p>
      <p>{info?.address}</p>
      <div className="flex items-center justify-center rounded-sm bg-[#efefef] py-5 px-3">
        <p className="text-2xl mr-4 leading-[1em] text-[#c9171e]">4.4/5</p>
        <div className="relative w-[5em] h-[1em] text-3xl leading-[1em]">
          <div className="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-[#c9171e] w-[1.4em]">
            ★★★★★
          </div>
          <div className="text-[#aeaeae]">☆☆☆☆☆</div>
        </div>
      </div>
      <ul>
        <li>{info?.latitude}</li>
        <li>{info?.longitude}</li>
      </ul>
    </Drawer>
  );
};
