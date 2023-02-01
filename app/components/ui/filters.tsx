import { useEffect, useState } from 'react'

import { getFilteredGigs, getGigs } from '@api/gigs/gigs'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { Flex } from '@chakra-ui/react'
import FilterGroup from '@components/ui/filter-group'
import FilterGroupMonth from '@components/ui/filter-group-month'
import { GigsDocument, GigsQuery } from '@gql/graphql'
import client from '@utils/apollo-client'
import { getGenreFilters, getGigMonthFilters, getGigYearFilters } from '@utils/gigs'

interface Props {
  past?: boolean
}

const Filters = ({ past = false }: Props) => {
  const { data } = useQuery<GigsQuery>(GigsDocument, { variables: { past } })
  const [filterGigs, { called }] = useLazyQuery(getFilteredGigs)
  const [activeFilters, setActiveFilters] = useState<Record<string, any>[]>([])
  const gigs = data?.gigs || []
  const months = getGigMonthFilters(gigs)
  const years = getGigYearFilters(gigs)
  const genres = getGenreFilters(gigs)

  const handleFilters = (value: string, filters: Record<any, any>) => {
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
      <FilterGroupMonth
        name="month"
        group={months as string[]}
        onClick={async (month: string) => {
          await handleFilters(month, { month: parseInt(month) })
        }}
      />
      <FilterGroup
        name="year"
        group={years as string[]}
        onClick={async (year: string) => {
          await handleFilters(year, { year: parseInt(year) })
        }}
      />
      <FilterGroup
        name="genre"
        group={genres as string[]}
        onClick={async genre => {
          await handleFilters(genre, { $or: [{ 'artist.genre': genre }, { 'artist.subGenre': genre }] })
        }}
      />
    </Flex>
  )
}

export default Filters
