import { isAfter, isBefore } from 'date-fns'

import { ticketmasterApi } from '../apis/ticketmaster'
import { redisClient } from '../app'
import { Gig } from '../models/gig'
import { today } from '../utils/constants'

import { createGigsIndex, getValue, insertGig } from './utils/cache'
import { formatTicketmasterArtistData, formatTicketmasterGigData } from './utils/format'
import { gigsWithRatings } from './utils/queries'

export const apiGetGigs = async ({ past = false }, user, params = null) => {
  await createGigsIndex()
  const index = await redisClient.ft.search(`idx:gigs`, `@userId:(${user.id})`)

  if (index?.total > 0 && params === null) {
    const cachedGigs = getValue({ index })

    return past
      ? cachedGigs
          .filter(gig => isBefore(gig.date.timestamp, today))
          .sort((a, b) => a.date.timestamp - b.date.timestamp)
      : cachedGigs.filter(gig => isAfter(gig.date.timestamp, today)).sort((a, b) => a.date.timestamp - b.date.timestamp)
  }

  const dbGigs = await gigsWithRatings({ userId: user.id })

  return past
    ? dbGigs.filter(gig => isBefore(gig.date.timestamp, today)).sort((a, b) => a.date.timestamp - b.date.timestamp)
    : dbGigs.filter(gig => isAfter(gig.date.timestamp, today)).sort((a, b) => a.date.timestamp - b.date.timestamp)
}

export const apiFilterGigs = async ({ filters }, user) => {
  const filterObject = Object.assign(
    {},
    ...filters.map(item => {
      return item
    })
  )
  let filterString = ''

  Object.values(filterObject).forEach(value => {
    filterString += ` ${value}`
  })

  const index = await redisClient.ft.search(`idx:gigs`, `@userId:(${user.id}) ${filterString}`)
  const cachedGigs = getValue({ index })

  // Need to add param for past/future filtering
  return cachedGigs.filter(gig => isAfter(gig.date.timestamp, today))
}

export const apiCreateGig = async (gig, user) => {
  try {
    const newGig = await Gig.create({ ...gig, userId: user.id, festival: gig.festival || {} })
    // @ts-ignore
    await insertGig(newGig._doc)
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
