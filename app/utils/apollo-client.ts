import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from '@apollo/client'

import { tokenVar } from '../pages/_app'

export const client = new ApolloClient({
  link: new ApolloLink(operation => {
    return new HttpLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: `Bearer ${tokenVar().token}`,
      },
    }).request(operation)
  }),
  cache: new InMemoryCache(),
})

export default client
