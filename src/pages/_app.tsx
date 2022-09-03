import type { AppProps } from "next/app";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/globals.css";
import { DAppProvider, Goerli } from "@usedapp/core";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Header } from "../component/Header";
import { AuthProvider } from "src/context/auth";
import { Toaster } from "react-hot-toast";

const config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]:
      "https://eth-goerli.g.alchemy.com/v2/OYnMi37YD5FIQHqIFIrbftfKI2DCUwS_",
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
      <AuthProvider>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Header />
          <Toaster position="bottom-right" />
          <Component {...pageProps} />
        </MantineProvider>
      </AuthProvider>
    </DAppProvider>
  );
}

export default MyApp;
