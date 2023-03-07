import 'mapbox-gl/dist/mapbox-gl.css'
import '../styles/globals.css'

import {MantineProvider} from '@mantine/core'
import {NotificationsProvider} from '@mantine/notifications'
import {DAppProvider, Goerli} from '@usedapp/core'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {AuthProvider} from 'src/context/auth'
import {MetamaskProvider} from 'src/context/metamask'
import {Layout} from 'src/layout'

const config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: 'https://eth-goerli.g.alchemy.com/v2/OYnMi37YD5FIQHqIFIrbftfKI2DCUwS_',
  },
}

function MyApp({Component, pageProps}: AppProps) {
  return (
    <DAppProvider config={config}>
      <Head>
        <title>Gourmet App</title>
        <meta name='description' content='Gourmet App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AuthProvider>
        <MetamaskProvider>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <NotificationsProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </NotificationsProvider>
          </MantineProvider>
        </MetamaskProvider>
      </AuthProvider>
    </DAppProvider>
  )
}

export default MyApp
