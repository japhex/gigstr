import {
  apiCreateGig,
  apiDeleteGig,
  apiFilterGigsByProperty,
  apiFilterGigsByDate,
  apiGetGigs,
  apiSearchGig,
} from './controllers/gigs'
import { apiCreateGigRating } from './controllers/ratings'
import { apiGetUserByUsername, apiGetUsers, apiSearchUsersByUsername, apiGetGigsByUser } from './controllers/users'

export default {
  User: {
    gigs: parent => parent.getGigs(),
  },
  Query: {
    users: () => apiGetUsers(),
    user: (_parent, { username }) => apiGetUserByUsername(username),
    userGigs: (_parent, { userId }) => apiGetGigsByUser(userId),
    searchUsers: (_parent, { username }) => apiSearchUsersByUsername(username),
    searchGig: (_parent, args, { user }) => apiSearchGig(args, user),
    gigs: (_parent, args, { user }) => apiGetGigs(args, user),
    filterGigsByDate: (_parent, args, { user }) => apiFilterGigsByDate(args, user),
    filterGigsByProperty: (_parent, { property }, { user }) => apiFilterGigsByProperty(property, user),
  },
  Mutation: {
    createGig: (_parent, args, { user }) => apiCreateGig(args, user),
    deleteGig: (_parent, args, { user }) => apiDeleteGig(args, user),
    rateGig: (_parent, args, { user }) => apiCreateGigRating(args, user),
  },
}
