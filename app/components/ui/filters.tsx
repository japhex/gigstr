import { useEffect, useState } from 'react'

import { getFilteredGigs, getGigs } from '@api/gigs/gigs'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { Flex, Text } from '@chakra-ui/react'
import FilterGroup from '@components/ui/filter-group'
import { Gig, GigsDocument, GigsQuery } from '@gql/graphql'
import { getGenreFilters, getGigMonthFilters, getGigYearFilters } from '@utils/gigs'

import client from '../../apollo-client'

import FilterGroupMonth from './filter-group-month'

interface Props {
  past?: boolean
}

const Filters = ({ past = false }: Props) => {
  const { data } = useQuery<GigsQuery>(GigsDocument, { variables: { past } })
  const [filterGigs, { called }] = useLazyQuery(getFilteredGigs)
  const [activeFilters, setActiveFilters] = useState<Record<string, any>[]>([])
  const gigs: Gig[] = data?.gigs || []
  const months = getGigMonthFilters(gigs)
  const years = getGigYearFilters(gigs)
  const genres = getGenreFilters(gigs)

  const handleFilters = (value, filters) => {
    const filterExists = activeFilters.some(filter => {
      return Object.keys(filter)[0] === Object.keys(filters)[0]
    })

    if (!filterExists) {
      setActiveFilters([...activeFilters, filters])
    } else if (value !== '') {
      const newFilters = activeFilters.filter(filter => {
        return Object.keys(filter)[0] !== Object.keys(filters)[0]
      })
      setActiveFilters([...newFilters, filters])
    } else {
      const newFilters = activeFilters.filter(filter => {
        return Object.keys(filter)[0] !== Object.keys(filters)[0]
      })
      setActiveFilters([...newFilters])
    }
  }

  useEffect(() => {
    const activateFilters = async () => {
      if (activeFilters.length > 0) {
        const { data } = await filterGigs({ variables: { filters: activeFilters } })
        client.writeQuery({
          query: getGigs,
          data: { gigs: data.filterGigs },
        })
      } else {
        if (called) {
          client.writeQuery({
            query: getGigs,
            data: { gigs },
          })
        }
      }
    }

    activateFilters()
  }, [activeFilters])

  return (
    <Flex gap={4} align="center">
      <Text>filter by:</Text>
      <FilterGroupMonth
        name="month"
        group={months}
        onClick={async (month: string) => {
          await handleFilters(month, { month: parseInt(month) })
        }}
      />
      <FilterGroup
        name="year"
        group={years}
        onClick={async (year: string) => {
          await handleFilters(year, { year: parseInt(year) })
        }}
      />
      <FilterGroup
        name="genre"
        group={genres}
        onClick={async genre => {
          await handleFilters(genre, { $or: [{ 'artist.genre': genre }, { 'artist.subGenre': genre }] })
        }}
      />
    </Flex>
  )
}

export default Filters
