import getYear from 'date-fns/getYear'
import parseIso from 'date-fns/parseISO'

import { Gig } from '../../models/gig'
import { apiGetGigs } from '../gigs'

export const returnGigs = async (user, options = {}) => {
  const userGigs = [] // await UserGigs.find({ user: user.id })
  console.log(user)
  const gigs = await Gig.find({
    _id: { $in: userGigs.map(gig => gig.gig) },
    ...options,
  }).sort('date')

  return { userGigs, gigs }
}

export const getUserWithGigs = async user => {
  const { gigs } = await returnGigs(user)

  return {
    id: user._id,
    username: user.username,
    gigs,
  }
}

export const getFilteredByFestivalGigs = async user => {
  return await returnGigs(user, {
    'songKickGig.type': 'Festival',
  })
}

export const getFilteredByMonthGigs = async (user, month) =>
  apiGetGigs({ past: false, startFilter: false }, user, {
    month: parseInt(month),
  })

export const getFilteredByYearGigs = async (user, year) =>
  apiGetGigs({ past: false, startFilter: false }, user, {
    year: parseInt(year),
  })

export const filterYears = (year, gigs) => {
  return gigs.filter(gig => {
    const date = parseIso(gig.songKickGig.start.date)
    return getYear(new Date(date)) === year
  })
}
