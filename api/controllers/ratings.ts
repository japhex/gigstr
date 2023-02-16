import { Ratings } from '../models/ratings'

import { gigsWithRatings } from './utils/queries'

export const apiCreateGigRating = async ({ id, rating }, user) => {
  try {
    await Ratings.updateOne({ gigId: id }, { rating, userId: user.id }, { upsert: true })
    await gigsWithRatings({ gigId: id, userId: user.id })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}
