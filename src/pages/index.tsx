import { useEthers } from "@usedapp/core";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { useAddMap } from "../hook/AddMap";
import { useMap } from "../hook/Map";

const Home: NextPage = () => {
  const { activateBrowserWallet, account } = useEthers();
  const { maps } = useMap();
  const { loading, success, error, send } = useAddMap();
  const [viewport, setViewport] = useState({
    latitude: 35.6762,
    longitude: 139.6503,
    zoom: 10,
  });
  const handleAdd = async () => {
    await send(
      "足立区",
      ethers.BigNumber.from(35.775),
      ethers.BigNumber.from(139.8044),
      5
    );
  };

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
            key={item.latitude}
            latitude={ethers.BigNumber.from(item.latitude).toNumber()}
            longitude={ethers.BigNumber.from(item.longitude).toNumber()}
          >
            {/* <h2>{item.name}</h2>
            <ul>
              <li>{String(item.latitude)}</li>
              <li>{String(item.longitude)}</li>
            </ul>
            <p>評価：{String(item.star)}</p> */}
            <button className="w-[20px] h-[20px] rounded-full bg-pink-600"></button>
          </Marker>
        ))}
      </ReactMapGL>
      {account ? (
        <div className="absolute top-2 right-2">
          <p className="px-4 py-2 bg-black text-white text-lg">Connected</p>
          <button
            className="px-4 py-2 bg-black text-white text-lg mt-4"
            onClick={() => handleAdd()}
          >
            add shop
          </button>
        </div>
      ) : (
        <button
          className="absolute top-2 right-2 px-4 py-2 bg-black text-white text-lg"
          onClick={activateBrowserWallet}
        >
          Connect wallet
        </button>
      )}
    </div>
  );
};

export default Home;
