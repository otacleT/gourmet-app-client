import { useLogs } from "@usedapp/core";
import { useMemo } from "react";
import { contract } from "..";

export type Result = {
  id: number;
  star: number;
};

export const useResult = () => {
  const logs = useLogs({ contract, event: "starLog", args: [null] });

  const results = useMemo(() => {
    return (
      logs?.value?.map((log) => {
        const result: Result = {
          id: Number(log.data.shopId),
          star: Number(log.data.result),
        };
        return result;
      }) || []
    );
  }, [logs?.value]);
  return { results };
};
