import { UserGigs } from '../models/user-gigs'

// Rate gig
export const apiCreateGigRating = async ({ id, rating }) => {
  try {
    await UserGigs.findOneAndUpdate({ gig: id }, { rating })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}
