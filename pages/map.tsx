import { FC, useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

const Map: FC = () => {
  const [viewState, setViewState] = useState({
    longitude: 130.7159,
    latitude: 33.5663,
    zoom: 15,
  });

  const successCallback = (position: any) => {
    setViewState((prevState) => {
      return {
        ...prevState,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    });
  };
  const errorCallback = (error: any) => {
    alert(error);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  return (
    <ReactMapGL
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN}
      style={{ width: "100vw", height: "100vh" }}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
    />
  );
};

export default Map;
