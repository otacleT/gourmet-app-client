import type { AppProps } from "next/app";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/globals.css";
import { DAppProvider } from "@usedapp/core";

const config = {
  multicallAddresses: [
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  ],
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <Component {...pageProps} />
    </DAppProvider>
  );
}

export default MyApp;
