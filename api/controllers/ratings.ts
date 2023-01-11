import { UserGigs } from '../models/user-gigs'

// Rate gig
export const apiCreateGigRating = async ({ id, rating }) => {
  try {
    await UserGigs.updateOne({ gig: id }, { rating }, { upsert: true })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}
