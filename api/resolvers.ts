import { apiCreateGig, apiDeleteGig, apiGetGigs, apiSearchGig, apiFilterGigs } from './controllers/gigs'
import { apiCreateGigRating } from './controllers/ratings'

export default {
  User: {
    gigs: parent => parent.getGigs(),
  },
  Query: {
    searchGig: (_parent, args, { user }) => apiSearchGig(args, user),
    gigs: (_parent, args, { user }) => apiGetGigs(args, user),
    filterGigs: (_parent, args, { user }) => apiFilterGigs(args, user),
  },
  Mutation: {
    createGig: (_parent, args, { user }) => apiCreateGig(args, user),
    deleteGig: (_parent, args, { user }) => apiDeleteGig(args, user),
    rateGig: (_parent, args, { user }) => apiCreateGigRating(args, user),
  },
}
