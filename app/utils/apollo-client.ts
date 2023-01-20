import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { getSession } from 'next-auth/react'

const api = createHttpLink({
  uri: 'http://localhost:4000/api',
})

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession()

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${session?.token}`,
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(api),
  cache: new InMemoryCache(),
})

export default client
