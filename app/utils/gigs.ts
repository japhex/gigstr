import { Gig } from '@gql/graphql'
import { format, getMonth, getYear } from 'date-fns'

import { MONTHS } from '../types/gig'

export const gigStartDate = (date: Pick<Gig, 'date'>) => format(new Date(date?.start), 'MMM do yyyy')

export const getGigMonthFilters = (gigs: Gig[]) => {
  const months = gigs
    .map(gig => {
      return MONTHS[getMonth(new Date(gig.date.start))]
    })
    .filter(month => !!month)

  return [...new Set(months)]
}

export const getGigYearFilters = (gigs: Gig[]) => {
  const years = gigs.map(gig => {
    return getYear(new Date(gig.date.start))
  })

  return [...new Set(years)]
}

export const getGenreFilters = (gigs: Gig[]) => {
  const genres = gigs.flatMap(gig => {
    return [gig.artist.genre, gig.artist.subGenre]
  })
  return [...new Set(genres)]
}
