import { ticketmasterApi } from '../apis/ticketmaster'
import { redisClient } from '../app'
import { Gig } from '../models/gig'

import { formatTicketmasterArtistData, formatTicketmasterGigData } from './utils/format'

export const apiGetGigs = async ({ past = false }, user, params = null) => {
  const cacheKey = `${user.id}|gigs|${past ? 'past' : 'upcoming'}`
  const cachedGigs = await redisClient.json.get(cacheKey)

  if (cachedGigs && params === null) return cachedGigs

  const today = new Date()
  const filter = past ? { $lt: today } : { $gte: today }

  try {
    const gigs = await Gig.aggregate([
      { $addFields: { month: { $month: '$date.start' } } },
      { $addFields: { year: { $year: '$date.start' } } },
      {
        $match: {
          $and: [{ 'date.start': filter, userId: user.id, ...params }],
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
                $and: [{ userId: { $eq: user.id } }],
              },
            },
          ],
          as: 'ratings',
        },
      },
      { $sort: { date: 1 } },
    ])

    if (params === null) await redisClient.json.set(cacheKey, '$', gigs)

    return gigs
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

export const apiFilterGigs = async ({ filters }, user) => {
  const filterObject = Object.assign(
    {},
    ...filters.map(item => {
      return item
    })
  )

  // At this point it would be nice to just query the cache instead of making a DB request
  try {
    return await apiGetGigs({ past: false }, user, filterObject)
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

export const apiCreateGig = async (gig, user) => {
  const cacheKey = `${user.id}|gigs|upcoming`
  const cachedGigs = await redisClient.get(cacheKey)

  try {
    const newGig = await Gig.create({ ...gig, userId: user.id, festival: gig.festival || {} })

    if (cachedGigs) {
      const gigs = JSON.parse(cachedGigs)
      gigs.push(newGig)
      await redisClient.set(cacheKey, JSON.stringify(gigs))
    }

    return newGig
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

export const apiDeleteGig = async ({ id }, user) => {
  const cacheKey = `${user.id}|gigs|upcoming`
  const cachedGigs = await redisClient.get(cacheKey)

  try {
    const deletedGig = await Gig.deleteOne({ userId: user.id, _id: id })

    if (cachedGigs) {
      const gigs = JSON.parse(cachedGigs)
      const newGigs = gigs.filter(gig => gig._id !== id)
      await redisClient.set(cacheKey, JSON.stringify(newGigs))
    }

    return deletedGig
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

export const apiSearchGig = async ({ artist, page }, user) => apiSearchGigTicketmaster({ artist, page }, user)

export const apiSearchGigTicketmaster = async ({ artist, page }, user) => {
  try {
    const gigs = await Gig.find({ userId: user.id }, 'ticketmasterId -_id')
    const gigIds = gigs.map(gig => gig.ticketmasterId || '').filter(gig => gig !== '')
    const { data } = await ticketmasterApi.eventSearch(artist, page)
    const apiArtist = await formatTicketmasterArtistData(data)

    return data?._embedded?.events?.map(event => formatTicketmasterGigData(apiArtist, event, gigIds))
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}
