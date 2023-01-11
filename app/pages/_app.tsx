import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

import client from '../apollo-client'
import AppProvider from '../context/app/context'
import { theme } from '../theme'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <AppProvider>
            <Component {...pageProps} />
          </AppProvider>
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  )
}