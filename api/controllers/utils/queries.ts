import { getMonth, getYear } from 'date-fns'

import { redisClient } from '../../app'
import { Gig } from '../../models/gig'

export const gigsWithRatings = async userId => {
  const gigs = await Gig.aggregate([
    {
      $match: {
        $and: [{ userId }],
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
    await redisClient.json.set(`GIGS:${gig._id}`, '$', {
      ...gig,
      gigMonth: `${getMonth(gig.date.start)}`,
      gigYear: `${getYear(gig.date.start)}`,
    })
  }

  return gigs
}
