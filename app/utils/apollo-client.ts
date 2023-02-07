import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { getSession } from 'next-auth/react'

const api = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
})

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession()

  return {
    headers: {
      ...headers,
      // @ts-ignore
      Authorization: `Bearer ${session?.token}`,
    },
  }
})

export const client = new ApolloClient({
  // @ts-ignore
  link: authLink.concat(api),
  cache: new InMemoryCache(),
})

export default client
