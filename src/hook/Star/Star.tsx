import { useLogs } from "@usedapp/core";
import { useMemo } from "react";
import { contract } from "..";

export type logItem = {
  id: number;
  star: number;
};

export const useStar = () => {
  const logs = useLogs({ contract, event: "starLog", args: [null] });

  const stars = useMemo(() => {
    return (
      logs?.value?.map((log) => {
        const star: logItem = {
          id: Number(log.data.shopId),
          star: Number(log.data.result),
        };
        return star;
      }) || []
    );
  }, [logs?.value]);
  return { stars };
};
