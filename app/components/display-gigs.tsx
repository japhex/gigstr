import { useQuery } from '@apollo/react-hooks'
import { Box, Flex, Grid, Icon, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { MdOutlineFestival } from 'react-icons/md'

import { GigsDocument, GigsQuery } from '../gql/graphql'

import Genres from './gig/genres'
import Info from './gig/info'
import Lineup from './gig/lineup'
import Location from './gig/location'
import QueryHandler from './query-handler'

const Gigs = () => {
  const { loading, error, data } = useQuery<GigsQuery>(GigsDocument)
  const gigs = data?.gigs || []

  if (loading || error) return <QueryHandler loading={loading} error={error} />

  return (
    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr 1fr' }} gridGap={6} w="100%">
      {gigs.map(({ id, artist, date, venue, lineup, festival, info }) => (
        <Flex key={id} gap={2}>
          <Flex direction="column" w="100%" color="#cecece" bg="GREYGRAD">
            <Box h="150px" w="100%" bgImg={artist.image} bgSize="cover" bgPosition="top" />
            <Box p={4}>
              <Box py={2} pb={0}>
                <Flex w="100%">
                  <Box>
                    <Text fontSize="lg" noOfLines={1} color="#fff" fontWeight="bold">
                      {artist.name}
                    </Text>
                  </Box>
                  <Flex ml="auto" gap={2}>
                    <Info info={info} />
                    <Lineup lineup={lineup} />
                  </Flex>
                  {festival?.start_date && <Icon as={MdOutlineFestival} ml="auto" />}
                </Flex>
              </Box>
              <Box pb={2}>
                <Text fontSize="sm" color="#888">
                  {date?.start && format(new Date(date?.start), 'MMM do yyyy')}{' '}
                  {date?.end && date?.start !== date?.end && `- ${format(new Date(date?.end), 'MMM do yyyy')}`}
                </Text>
              </Box>
              <Location venue={venue} />
            </Box>
            <Box p={4}>
              <Genres artist={artist} />
            </Box>
          </Flex>
        </Flex>
      ))}
    </Grid>
  )
}

export default Gigs
