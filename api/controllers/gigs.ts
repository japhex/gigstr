import { getUnixTime, isAfter, isBefore } from 'date-fns'

import { ticketmasterApi } from '../apis/ticketmaster'
import { redisClient } from '../app'
import { Gig } from '../models/gig'

import { createGigsIndex, getValue } from './utils/cache'
import { formatTicketmasterArtistData, formatTicketmasterGigData } from './utils/format'
import { gigsWithRatings } from './utils/queries'

export const apiGetGigs = async ({ past = false }, user, params = null) => {
  await createGigsIndex()
  const today = getUnixTime(new Date())
  const index = await redisClient.ft.search(`idx:gigs`, `@userId:(${user.id})`)

  console.log(await redisClient.ft.search(`idx:gigs`, `@genre:(Pop)`))
  console.log(await redisClient.ft.search(`idx:gigs`, `@userId:(${user.id}) @genre:(Pop)`))

  if (index?.total > 0 && params === null) {
    const cachedGigs = getValue({ index })

    return past
      ? cachedGigs.filter(gig => isBefore(gig.date.timestamp, today))
      : cachedGigs.filter(gig => isAfter(gig.date.timestamp, today))
  }

  const dbGigs = await gigsWithRatings(user.id)

  return past
    ? dbGigs.filter(gig => isBefore(gig.date.timestamp, today))
    : dbGigs.filter(gig => isAfter(gig.date.timestamp, today))
}

export const apiFilterGigs = async ({ filters }, user) => {
  const filterObject = Object.assign(
    {},
    ...filters.map(item => {
      return item
    })
  )

  // try {
  //  const searchResult = await redisClient.ft.search(`idx:gigs`, '@genre:(Rock)')
  //  console.log(searchResult?.documents[0]?.value)
  // } catch (e) {
  // 	console.log(e)
  // }

  // At this point it would be nice to just query the cache instead of making a DB request
  try {
    return await apiGetGigs({ past: false }, user, filterObject)
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

export const apiCreateGig = async (gig, user) => {
  try {
    const newGig = await Gig.create({ ...gig, userId: user.id, festival: gig.festival || {} })
    await redisClient.json.set(`GIGS:${gig._id}`, '$', gig)
    return newGig
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

export const apiDeleteGig = async ({ id }, user) => {
  try {
    const deletedGig = await Gig.deleteOne({ userId: user.id, _id: id })
    await redisClient.json.del(`GIGS:${id}`, '$')
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
