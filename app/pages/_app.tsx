import { ApolloProvider, makeVar } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import AppProvider from '@context/app/context'
import { theme } from '@theme/index'
import client from '@utils/apollo-client'
// @ts-ignore
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import Main from '../layouts/main'

export const tokenVar = makeVar<Session | {}>({})

export default function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <AppProvider>
            <Main auth={pageProps.session}>
              <Head>
                <title>Gigstr</title>
                <desc>Gigstr</desc>
                <link
                  rel="icon"
                  href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎧</text></svg>"
                />
              </Head>
              <Component {...pageProps} />
            </Main>
          </AppProvider>
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  )
}
