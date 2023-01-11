import { useQuery } from '@apollo/react-hooks'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { MdOutlineFestival } from 'react-icons/md'

import { GigsDocument, GigsQuery } from '../gql/graphql'
import { SHADOWS } from '../theme/shadows'

import Genres from './gig/genres'
import Lineup from './gig/lineup'
import Location from './gig/location'
import Rating from './gig/rating'
import QueryHandler from './query-handler'

const PastGigs = () => {
  const { loading, error, data } = useQuery<GigsQuery>(GigsDocument, { variables: { past: true } })
  const gigs = data?.gigs || []

  if (loading || error) return <QueryHandler loading={loading} error={error} />

  return (
    <Box w="100%" overflowX="scroll">
      <Flex gap={4} w="100%">
        {gigs.map(({ id, artist, date, venue, lineup, festival, ratings }) => (
          <Flex key={id} gap={2} bg="GREYGRAD" flex="0 0 calc(400px + 16px)" h="150px" boxShadow={SHADOWS.default}>
            <Box h="100%" w="200px" bgImg={artist.image} bgSize="cover" bgPosition="top" filter="grayscale(80%)" />
            <Flex direction="column" w="100%" color="#cecece" p={4}>
              <Box>
                <Box>
                  <Flex>
                    <Flex w="100%">
                      <Box>
                        <Text fontSize="lg" noOfLines={1} color="#fff" fontWeight="bold">
                          {artist.name}
                        </Text>
                      </Box>
                      <Flex ml="auto" gap={2}>
                        <Lineup lineup={lineup} />
                      </Flex>
                      {festival?.start_date && <Icon as={MdOutlineFestival} ml="auto" />}
                    </Flex>
                    <Box pb={2}>
                      <Text fontSize="sm">
                        {date?.start && format(new Date(date?.start), 'MMM do yyyy')}{' '}
                        {date?.end && date?.start !== date?.end && `- ${format(new Date(date?.end), 'MMM do yyyy')}`}
                      </Text>
                    </Box>
                    <Rating id={id} ratings={ratings} />
                  </Flex>
                </Box>
                <Location venue={venue} />
              </Box>
              <Genres artist={artist} />
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

export default PastGigs
