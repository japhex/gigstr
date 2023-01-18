import { Ratings } from '../models/ratings'

// Rate gig
export const apiCreateGigRating = async ({ id, rating }, user) => {
  try {
    await Ratings.updateOne({ gigId: id }, { rating, userId: user.id }, { upsert: true })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}
