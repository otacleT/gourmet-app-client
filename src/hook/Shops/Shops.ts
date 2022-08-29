import { useEffect, useState } from "react";
import { getShops } from "src/lib/firebase/shops";
import { Shop } from "src/types/shop";

export type UseShopsOutput = {
  isLoading: boolean;
  shops: Shop[];
};

const DEFAULT_OUTPUT: UseShopsOutput = {
  isLoading: true,
  shops: [],
};

export function useShops(): UseShopsOutput {
  const [output, setOutput] = useState(DEFAULT_OUTPUT);

  useEffect(() => {
    void (async () => {
      const shops = await getShops();
      setOutput({ isLoading: false, shops });
    })();
  }, []);

  return output;
}
