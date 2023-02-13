import { ApolloServer, gql } from 'apollo-server-express'
import * as dotenv from 'dotenv'
import express from 'express'
import jwt from 'express-jwt'
import mongoose from 'mongoose'
import { createClient } from 'redis'

import resolvers from './resolvers'
import typeDefs from './schema'
import { RequestWithProps } from './types'
import { getSecrets } from './utils/aws'
import { isProduction } from './utils/constants'

export const redisClient = createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` })
;(async () => {
  await redisClient.connect()
  // for testing
  await redisClient.flushAll()
})()

dotenv.config()
const PORT = process.env.PORT || 3001
const app = express()

// Mongo connection
setTimeout(async () => {
  const secrets = await getSecrets()
  const MONGO_URL = isProduction ? secrets.MONGO_URI : process.env.MONGO_URI

  await mongoose.connect(MONGO_URL)
  mongoose.set('debug', true)
}, 1)

// Set CORS headers
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Create api-routes route
app.use(
  '/api',
  jwt({
    secret: 'gigstr',
    credentialsRequired: false,
  })
)

// Create apollo server
const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: ({ req, res }: { req: RequestWithProps; res: any }) => {
    return {
      user: req.user,
      req,
      res,
    }
  },
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
})

// Apply middleware
server.applyMiddleware({ app, path: '/api' })

// Create app service
app.listen(PORT)

// GraphQL Server
app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`))

module.exports = app
