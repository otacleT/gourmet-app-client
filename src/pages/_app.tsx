import type { AppProps } from "next/app";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/globals.css";
import { DAppProvider, Hardhat } from "@usedapp/core";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Header } from "../component/Header";

const config = {
  multicallAddresses: {
    [Hardhat.chainId]: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
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
      <Header />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </DAppProvider>
  );
}

export default MyApp;
