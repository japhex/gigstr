import { Gig, GigDate } from '@gql/graphql'
import { format, getMonth, getYear } from 'date-fns'

export const gigStartDate = (date: GigDate) => format(new Date(date?.start), 'MMM do yyyy')

export const getGigMonthFilters = (gigs: Gig[] | Record<any, any>) => {
  const months = gigs
    .map((gig: Gig) => {
      return getMonth(new Date(gig?.date?.start)) + 1
    })
    .filter((month: number) => !!month)

  return [...new Set(months)]
}

export const getGigYearFilters = (gigs: Gig[] | Record<any, any>) => {
  const years = gigs.map((gig: Gig) => {
    return getYear(new Date(gig?.date?.start))
  })

  return [...new Set(years)]
}

export const getGenreFilters = (gigs: Gig[] | Record<any, any>) => {
  const genres = gigs.flatMap((gig: Gig) => {
    return [gig.artist.genre, gig.artist.subGenre]
  })
  return [...new Set(genres)]
}
