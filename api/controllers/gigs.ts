import { ticketmasterApi } from '../apis/ticketmaster'
import { Gig } from '../models/gig'
import { API } from '../types'

import { formatTicketmasterArtistData, formatTicketmasterGigData } from './utils/format'

export const apiGetGigs = async ({ past = false }, user, params = null) => {
  const today = new Date()
  const filter = past ? { $lt: today } : { $gte: today }

  try {
    return await Gig.aggregate([
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
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// TODO: Write generic filter method that just accepts ALL filters from the FE, fucking banging.

export const apiFilterGigsByDate = async ({ month, year }, user) => {
  try {
    if (year) {
      return apiGetGigs({ past: false }, user, {
        year: parseInt(year),
      })
    }
    if (month) {
      return apiGetGigs({ past: false }, user, {
        month: parseInt(month),
      })
    }
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

export const apiFilterGigsByProperty = async (filters, user) => {
  try {
    return await apiGetGigs({ past: false }, user, filters)
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

export const apiCreateGig = async (gig, user) => {
  try {
    return await Gig.create({ ...gig, userId: user.id, festival: gig.festival || {} })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

export const apiDeleteGig = async ({ id }, user) => {
  try {
    return await Gig.deleteOne({ userId: user.id, _id: id })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

export const apiSearchGig = async ({ artist, type = 'Ticketmaster' }, user) => {
  if (type === API.TICKET_MASTER) {
    return apiSearchGigTicketmaster({ artist }, user)
  }
}

export const apiSearchGigTicketmaster = async ({ artist }, user) => {
  try {
    const gigs = await Gig.find({ userId: user.id }, 'ticketmasterId -_id')
    const gigIds = gigs.map(gig => gig.ticketmasterId || '').filter(gig => gig !== '')
    const { data } = await ticketmasterApi.eventSearch(artist)
    const apiArtist = await formatTicketmasterArtistData(data)

    return data?._embedded?.events?.map(event => formatTicketmasterGigData(apiArtist, event, gigIds))
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}
