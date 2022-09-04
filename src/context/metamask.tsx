import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextType = {
  hasMetamask: boolean;
};

const MetamaskContext = createContext<ContextType>({
  hasMetamask: false,
});

export const MetamaskProvider = ({ children }: { children: ReactNode }) => {
  const [hasMetamask, setHasMetamask] = useState<boolean>(false);

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      setHasMetamask(true);
    }
  }, []);
  return (
    <MetamaskContext.Provider value={{ hasMetamask }}>
      {children}
    </MetamaskContext.Provider>
  );
};

export const useMetamask = () => useContext(MetamaskContext);
