import { useQuery } from '@apollo/react-hooks'
import { Flex } from '@chakra-ui/react'
import FilterGroup from '@components/ui/filter-group'
import { Gig, GigsDocument, GigsQuery } from '@gql/graphql'
import { getGenreFilters, getGigMonthFilters, getGigYearFilters } from '@utils/gigs'

const Filters = () => {
  const { data } = useQuery<GigsQuery>(GigsDocument)
  const gigs: Gig[] = data?.gigs || []
  const months = getGigMonthFilters(gigs)
  const years = getGigYearFilters(gigs)
  const genres = getGenreFilters(gigs)

  return (
    <Flex gap={4}>
      filters:
      <FilterGroup name="month" group={months} onClick={() => {}} />
      <FilterGroup name="year" group={years} onClick={() => {}} />
      <FilterGroup name="genre" group={genres} onClick={() => {}} />
    </Flex>
  )
}

export default Filters
