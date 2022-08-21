import type { AppProps } from "next/app";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/globals.css";
import { DAppProvider, Hardhat } from "@usedapp/core";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Header } from "../component/Header";

const config = {
  multicallAddresses: {
    [Hardhat.chainId]: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
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
