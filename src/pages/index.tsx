import { useEthers } from "@usedapp/core";
import type { NextPage } from "next";
import { useCallback, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useAddMap } from "../hook/AddMap";
import { useMap } from "../hook/Map";
import { mapItem } from "../hook/Map/Map";

const Home: NextPage = () => {
  const { activateBrowserWallet, account } = useEthers();
  const { maps } = useMap();
  const [selected, setSelected] = useState<mapItem | null>(null);
  const { loading, success, error, send } = useAddMap();
  const [viewport, setViewport] = useState({
    latitude: 35.6762,
    longitude: 139.6503,
    zoom: 10,
  });
  const handleAdd = useCallback(async () => {
    await send("足立区", 35775, 1398044, 5);
  }, [account]);

  return (
    <div className="relative">
      <ReactMapGL
        {...viewport}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/taisei-m/cl6lh9446000h14pebx8w9o75"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN}
        onMove={(evt) => setViewport(evt.viewState)}
      >
        {maps.map((item) => (
          <Marker
            key={Math.random()}
            latitude={item.latitude / 1000}
            longitude={item.longitude / 10000}
            anchor="top"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelected(item);
            }}
          >
            <button className="w-[20px] h-[20px] rounded-full bg-pink-600"></button>
          </Marker>
        ))}
        {selected && (
          <Popup
            latitude={selected.latitude / 1000}
            longitude={selected.longitude / 10000}
            anchor="bottom"
            onClose={() => setSelected(null)}
          >
            You are here
          </Popup>
        )}
      </ReactMapGL>
      {account ? (
        <div className="absolute top-2 right-2 px-4 py-2 bg-black text-white text-lg">
          Connected
        </div>
      ) : (
        <button
          className="absolute top-2 right-2 px-4 py-2 bg-black text-white text-lg"
          onClick={activateBrowserWallet}
        >
          Connect wallet
        </button>
      )}
      {account && (
        <button
          className="absolute bottom-6 right-2 px-4 py-2 bg-black text-white text-lg mt-4"
          onClick={handleAdd}
        >
          add shop
        </button>
      )}
    </div>
  );
};

export default Home;
