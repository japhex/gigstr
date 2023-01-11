import { Ratings } from '../models/ratings'
import { User } from '../models/user'

// Rate gig
export const apiCreateGigRating = async ({ id, rating }, user) => {
  try {
    const dbUser = await User.findOne({ providerId: user.id })
    await Ratings.updateOne({ gigId: id }, { rating, userId: dbUser.id }, { upsert: true })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}
