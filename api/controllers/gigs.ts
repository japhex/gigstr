import axios from 'axios'
import { format } from 'date-fns'

import { Gig } from '../models/gig'
import { API } from '../types'

import { getFilteredByFestivalGigs, getFilteredByMonthGigs, getFilteredByYearGigs } from './utils'
import { formatBandsInTownGigData, formatTicketmasterGigData } from './utils/format'

// Get all gigs for user
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

// Get all gigs for user filtered by type=Festival
export const apiGetFestivalFilteredGigs = async user => {
  try {
    return await getFilteredByFestivalGigs(user)
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// Get all gigs for user filtered by month
export const apiGetMonthFilteredGigs = async (user, month) => {
  try {
    return await getFilteredByMonthGigs(user, month)
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// Get all gigs for user filtered by year
export const apiGetYearFilteredGigs = async (user, year) => {
  try {
    return await getFilteredByYearGigs(user, year)
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// Create gig
export const apiCreateGig = async (gig, user) => {
  try {
    return await Gig.create({ ...gig, userId: user.id, festival: gig.festival || {} })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// Delete gig
// export const apiDeleteGig = async ({ id }, user) => {
//   try {
//     await UserGigs.deleteOne({ user: user.id, gig: id })
//     return { success: true }
//   } catch (err) {
//     throw new Error(`Error: ${err}`)
//   }
// }

export const apiSearchGig = async ({ artist, type = 'Ticketmaster', date }, user) => {
  if (type === API.TICKET_MASTER) {
    return apiSearchGigTicketmaster({ artist }, user)
  }
  if (type === API.BANDS_IN_TOWN) {
    return apiSearchGigBandsInTown({ artist, date })
  }
}

export const apiSearchGigBandsInTown = async ({ artist, date = 'upcoming' }) => {
  try {
    const { data } = await axios.get(
      `https://rest.bandsintown.com/artists/${artist}/events?app_id=${process.env.BANDS_IN_TOWN_API_KEY}&date=${date}`
    )
    const apiArtist = {
      name: data[0].artist.name,
      image: data[0].artist.image_url,
    }

    return data.map(event => formatBandsInTownGigData(apiArtist, event))
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

export const apiSearchGigTicketmaster = async ({ artist }, user) => {
  try {
    const gigs = await Gig.find({ userId: user.id }, 'ticketmasterId -_id')
    const gigIds = gigs.map(gig => gig.ticketmasterId || '').filter(gig => gig !== '')

    console.log(gigIds)

    // move to API function in 'third-parties'
    const { data } = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.TICKET_MASTER_API_KEY}&locale=*&keyword=${artist}&segmentName=music`
    )

    // move to format function
    const sortedImages =
      data?._embedded?.events[0]?.images?.sort((a, b) => {
        return a.width > b.width ? -1 : 1
      }) || []

    // move to format function
    const apiArtist = {
      name: data?._embedded?.events[0]?.name,
      image: sortedImages[0]?.url,
      genre:
        data?._embedded?.events[0]?.classifications[0]?.genre?.name === 'Undefined'
          ? ''
          : data?._embedded?.events[0]?.classifications[0]?.genre?.name,
      subGenre:
        data?._embedded?.events[0]?.classifications[0]?.subGenre?.name === 'Undefined'
          ? ''
          : data?._embedded?.events[0]?.classifications[0]?.subGenre?.name,
    }

    return data?._embedded?.events.map(event => formatTicketmasterGigData(apiArtist, event, gigIds))
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}
