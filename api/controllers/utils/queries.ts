import mongoose from 'mongoose'

import { Gig } from '../../models/gig'

import { insertGig } from './cache'

export const gigsWithRatings = async ({ gigId = null, userId }: { gigId?: string; userId: string }) => {
  const gigs = await Gig.aggregate([
    {
      $match: {
        $and: [{ userId, ...(gigId && { _id: new mongoose.Types.ObjectId(gigId) }) }],
      },
    },
    {
      $lookup: {
        from: 'ratings',
        localField: '_id',
        foreignField: 'gigId',
        pipeline: [
          {
            $match: {
              $and: [{ userId: { $eq: userId } }],
            },
          },
        ],
        as: 'ratings',
      },
    },
    { $sort: { date: 1 } },
  ])

  for (const gig of gigs) {
    await insertGig(gig)
  }

  return gigs
}
