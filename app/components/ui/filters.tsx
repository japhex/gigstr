import { useEffect, useState } from 'react'

import { getGigs, getGigsFilteredByDate, getGigsFilteredByProperty } from '@api/gigs/gigs'
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
  const [filterGigs] = useLazyQuery(getGigsFilteredByDate)
  const [filterGigsByProperty] = useLazyQuery(getGigsFilteredByProperty)
  const [activeFilters, setActiveFilters] = useState<Record<string, any>[]>([])
  const gigs: Gig[] = data?.gigs || []
  const months = getGigMonthFilters(gigs)
  const years = getGigYearFilters(gigs)
  const genres = getGenreFilters(gigs)

  const handleFilter = async (value, filters) => {
    handleFilters(value, filters)
    const { data } = await filterGigs({ variables: { ...filters } })
    client.writeQuery({
      query: getGigs,
      data: { gigs: data.filterGigsByDate },
    })
  }

  const handleFilterByProperty = async (value, filters) => {
    handleFilters(value, filters)
    const { data } = await filterGigsByProperty({ variables: { filters } })
    client.writeQuery({
      query: getGigs,
      data: { gigs: data.filterGigsByProperty },
    })
  }

  const handleFilters = (value, filters) => {
    if (value === '') {
      client.writeQuery({
        query: getGigs,
        data: { gigs },
      })
      return
    }

    const filterExists = activeFilters.some(filter => {
      return Object.keys(filter)[0] === Object.keys(filters)[0]
    })

    if (!filterExists) {
      setActiveFilters([...activeFilters, filters])
    } else {
      const newFilters = activeFilters.filter(filter => {
        return Object.keys(filter)[0] !== Object.keys(filters)[0]
      })
      setActiveFilters([...newFilters, filters])
    }
  }

  useEffect(() => {
    console.log(activeFilters)
  }, [activeFilters])

  return (
    <Flex gap={4} align="center">
      <Text>filter by:</Text>
      <FilterGroupMonth
        name="month"
        group={months}
        onClick={async (month: string) => {
          await handleFilter(month, { month })
        }}
      />
      <FilterGroup
        name="year"
        group={years}
        onClick={async (year: string) => {
          await handleFilter(year, { year })
        }}
      />
      <FilterGroup
        name="genre"
        group={genres}
        onClick={async genre => {
          await handleFilterByProperty(genre, { $or: [{ 'artist.genre': genre }, { 'artist.subGenre': genre }] })
        }}
      />
    </Flex>
  )
}

export default Filters
