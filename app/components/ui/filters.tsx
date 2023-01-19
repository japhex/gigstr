import { getGigs, getGigsFilteredByDate } from '@api/gigs/gigs'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { Flex, Text } from '@chakra-ui/react'
import FilterGroup from '@components/ui/filter-group'
import FilterGroupMonth from '@components/ui/filter-group-month'
import { Gig, GigsDocument, GigsQuery } from '@gql/graphql'
import { getGenreFilters, getGigMonthFilters, getGigYearFilters } from '@utils/gigs'

import client from '../../apollo-client'

interface Props {
  past?: boolean
}

const Filters = ({ past = false }: Props) => {
  const { data } = useQuery<GigsQuery>(GigsDocument, { variables: { past } })
  const [filterGigs] = useLazyQuery(getGigsFilteredByDate)
  const gigs: Gig[] = data?.gigs || []
  const months = getGigMonthFilters(gigs)
  const years = getGigYearFilters(gigs)
  const genres = getGenreFilters(gigs)

  const handleFilter = async (type, value) => {
    if (value === '') {
      client.writeQuery({
        query: getGigs,
        data: { gigs },
      })
    } else {
      const { data } = await filterGigs({ variables: { [type]: value } })
      client.writeQuery({
        query: getGigs,
        data: { gigs: data.filterGigsByDate },
      })
    }
  }

  return (
    <Flex gap={4} align="center">
      <Text>filter by:</Text>
      <FilterGroupMonth
        name="month"
        group={months}
        onClick={async (month: string) => {
          await handleFilter('month', month)
        }}
      />
      <FilterGroup
        name="year"
        group={years}
        onClick={async (year: string) => {
          await handleFilter('year', year)
        }}
      />
      <FilterGroup
        name="genre"
        group={genres}
        onClick={async genre => {
          // Need to filter by property in different filter query
          // const { data } = await filterGigs({ variables: { genre } })
          // client.writeQuery({
          //   query: getGigs,
          //   data: { gigs: data.filterGigsByDate },
          // })
        }}
      />
    </Flex>
  )
}

export default Filters
