import type { AppProps } from "next/app";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/globals.css";
import { DAppProvider, Hardhat } from "@usedapp/core";
import Head from "next/head";

const config = {
  multicallAddresses: {
    [Hardhat.chainId]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <Head>
        <title>Gourmet App</title>
        <meta name="description" content="Gourmet App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </DAppProvider>
  );
}

export default MyApp;
