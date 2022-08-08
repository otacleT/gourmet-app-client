import { useLogs } from "@usedapp/core";
import { useMemo } from "react";
import { contract } from "..";

export type mapItem = {
  name: string;
  latitude: number;
  longitude: number;
  star: number;
};

export const useMap = () => {
  const logs = useLogs({ contract, event: "NewMap", args: [null] });

  const maps = useMemo(() => {
    return (
      logs?.value?.map((log) => {
        const floor: mapItem = {
          name: log.data.name,
          latitude: log.data.latitude,
          longitude: log.data.longitude,
          star: log.data.star,
        };
        return floor;
      }) || []
    );
  }, [logs?.value]);
  return { maps };
};
