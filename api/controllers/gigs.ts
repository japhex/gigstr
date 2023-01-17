import { format } from 'date-fns'

import { ticketmasterApi } from '../apis/ticketmaster'
import { Gig } from '../models/gig'
import { API } from '../types'

import { getFilteredByFestivalGigs, getFilteredByMonthGigs, getFilteredByYearGigs } from './utils'
import { formatTicketmasterArtistData, formatTicketmasterGigData } from './utils/format'

export const apiGetGigs = async ({ past = false }, user) => {
  const today = new Date()
  const dateFormatted = format(today, 'yyyy-MM-dd')
  const filter = past ? { $lt: dateFormatted } : { $gte: dateFormatted }
  // const gigstrUser = await User.findOne({ providerId: user.id })

  try {
    return await Gig.aggregate([
      { $match: { 'date.start': filter, userId: user.id } },
      {
        $lookup: {
          from: 'ratings',
          localField: '_id',
          foreignField: 'gigId',
          pipeline: [
            {
              $match: {
                // $and: [{ userId: { $eq: new mongoose.Types.ObjectId(gigstrUser.id) } }],
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

export const apiGetFestivalFilteredGigs = async user => {
  try {
    return await getFilteredByFestivalGigs(user)
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

export const apiGetMonthFilteredGigs = async (user, month) => {
  try {
    return await getFilteredByMonthGigs(user, month)
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

export const apiGetYearFilteredGigs = async (user, year) => {
  try {
    return await getFilteredByYearGigs(user, year)
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
