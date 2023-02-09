import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import Genres from '@components/gig/genres'
import Lineup from '@components/gig/lineup'
import Location from '@components/gig/location'
import Rating from '@components/gig/rating'
import { Gig } from '@gql/graphql'
import { SHADOWS } from '@theme/utils/shadows'
import { format } from 'date-fns'
import { MdOutlineFestival } from 'react-icons/md'

interface Props {
  gig: Gig | Record<any, any>
}

const PastCard = ({ gig }: Props) => {
  const { _id, artist, date, venue, lineup, festival, ratings } = gig

  return (
    <Flex key={_id} gap={2} bg="GREYGRAD" flex="0 0 calc(400px + 16px)" h="150px" boxShadow={SHADOWS.default}>
      <Box h="100%" w="200px" bgImg={artist.image} bgSize="cover" bgPosition="top" filter="grayscale(80%)">
        <Flex ml="auto" gap={2}>
          <Lineup lineup={lineup} />
        </Flex>
        {festival?.start_date && <Icon as={MdOutlineFestival} ml="auto" />}
      </Box>
      <Flex direction="column" w="100%" color="#cecece" p={4}>
        <Box>
          <Box>
            <Flex direction="column">
              <Flex>
                <Box>
                  <Text fontSize="lg" noOfLines={1} color="#fff" fontWeight="bold">
                    {artist.name}
                  </Text>

                  <Box pb={2}>
                    <Text fontSize="sm">
                      {date?.start && format(new Date(date?.start), 'MMM do yyyy')}{' '}
                      {date?.end && date?.start !== date?.end && `- ${format(new Date(date?.end), 'MMM do yyyy')}`}
                    </Text>
                  </Box>
                </Box>
              </Flex>
              <Rating id={_id} ratings={ratings} />
            </Flex>
          </Box>
          <Location venue={venue} />
        </Box>
        <Genres artist={artist} />
      </Flex>
    </Flex>
  )
}

export default PastCard
