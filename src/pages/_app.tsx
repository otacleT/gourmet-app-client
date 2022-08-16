import type { AppProps } from "next/app";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/globals.css";
import { DAppProvider, Hardhat } from "@usedapp/core";
import Head from "next/head";

const config = {
  multicallAddresses: {
    [Hardhat.chainId]: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
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
