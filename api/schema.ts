import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLDate } from 'graphql-iso-date'
import { GraphQLJSONObject } from 'graphql-type-json'

const resolveFunctions = {
  Date: GraphQLDate,
  JSONObject: GraphQLJSONObject,
}

const schemaString = `
  scalar Date
  scalar JSONObject

  type User {
    id: ID!
    username: String!
    gigs: [Gig!]!
  }
  
  type UserWithGigs {
    id: ID!
    username: String!
    gigs: [Gig]
  }
  
  type Artist {
    name: String!
    image: String
    genre: String
    subGenre: String
  }
  
  type Venue {
    location: JSONObject
    name: String
    latitude: String
    longitude: String
    city: String
    country: String
  }
  
  type Festival {
    start_date: String
    end_date: String
  }
  
  type Gig {
    _id: ID
    ticketmasterId: String
    artist: Artist!
    date: JSONObject
    info: String
    venue: Venue
    lineup: [Artist]
    festival: Festival
    userId: String
    ratings: [JSONObject]
    attending: Boolean
  }
  
  type Query {
    users: [User!]!
    user(username: String!): UserWithGigs
    userGigs(userId: ID!): UserWithGigs
    searchUsers(username: String!): [User]
    searchGig(artist: String!, date: String, type: String): JSONObject
    gigs(past: Boolean): [Gig]
    gigsUnfiltered: [Gig]
    gigsFestivalFilter: [Gig]
    gigsMonthFilter(month: Int!): [Gig]
    gigsYearFilter(year: Int!): [Gig] 
    gig(id: ID!): Gig
  }
  
  type Mutation {
    signup(username: String!, password: String!): String
    login(username: String!, password: String!): String
    createGig(id: String!, ticketmasterId: String! artist: JSONObject, info: String, date: JSONObject, venue: JSONObject, lineup: [JSONObject], festival: JSONObject): Gig!
    deleteGig(id: ID!): JSONObject
    rateGig(id: ID!, rating: Int!): Int
  }
`

makeExecutableSchema({ typeDefs: schemaString, resolvers: resolveFunctions })

export default schemaString
