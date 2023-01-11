import {
  apiCreateGig,
  apiGetFestivalFilteredGigs,
  apiGetGigs,
  apiGetMonthFilteredGigs,
  apiGetYearFilteredGigs,
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
    searchGig: (_parent, args) => apiSearchGig(args),
    gigs: (_parent, args, { user }) => apiGetGigs(args, user),
    gigsUnfiltered: (_parent, args, { user }) => apiGetGigs(args, user),
    gigsFestivalFilter: (_parent, _args, { user }) => apiGetFestivalFilteredGigs(user),
    gigsMonthFilter: (_parent, { month }, { user }) => apiGetMonthFilteredGigs(user, month),
    gigsYearFilter: (_parent, { year }, { user }) => apiGetYearFilteredGigs(user, year),
  },
  Mutation: {
    createGig: (_parent, gig, { user }) => apiCreateGig(gig, user),
    // deleteGig: (_parent, gig, { user }) => apiDeleteGig(gig, user),
    rateGig: (_parent, rating, { user }) => apiCreateGigRating(rating, user),
  },
}
