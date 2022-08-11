import type { AppProps } from "next/app";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/globals.css";
import { DAppProvider, Hardhat } from "@usedapp/core";

const config = {
  multicallAddresses: {
    [Hardhat.chainId]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
  // multicallAddresses: ["0x5FbDB2315678afecb367f032d93F642f64180aa3"],
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <Component {...pageProps} />
    </DAppProvider>
  );
}

export default MyApp;
