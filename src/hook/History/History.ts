import { useEffect, useState } from "react";
import { useAuth } from "src/context/auth";
import { getHistory } from "src/lib/firebase/history";
import { Item } from "src/lib/firebase/rating";

export type UseHistoryOutput = {
  isLoading: boolean;
  history: Item[];
};

const DEFAULT_OUTPUT: UseHistoryOutput = {
  isLoading: true,
  history: [],
};

export function useHistory(): UseHistoryOutput {
  const [output, setOutput] = useState(DEFAULT_OUTPUT);
  const { fbUser } = useAuth();

  useEffect(() => {
    void (async () => {
      const history = await getHistory(fbUser);
      setOutput({ isLoading: false, history });
    })();
  }, [fbUser]);

  return output;
}
