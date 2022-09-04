import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextType = {
  hasMetamask: boolean;
  isStarting: boolean;
};

const MetamaskContext = createContext<ContextType>({
  hasMetamask: false,
  isStarting: true,
});

export const MetamaskProvider = ({ children }: { children: ReactNode }) => {
  const [hasMetamask, setHasMetamask] = useState<boolean>(false);
  const [isStarting, setIsStarting] = useState<boolean>(true);

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      setHasMetamask(true);
    }
    setIsStarting(false);
  }, []);
  return (
    <MetamaskContext.Provider value={{ hasMetamask, isStarting }}>
      {children}
    </MetamaskContext.Provider>
  );
};

export const useMetamask = () => useContext(MetamaskContext);
