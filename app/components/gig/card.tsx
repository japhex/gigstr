import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import Delete from '@components/gig/delete'
import Genres from '@components/gig/genres'
import Info from '@components/gig/info'
import Lineup from '@components/gig/lineup'
import Location from '@components/gig/location'
import { Gig } from '@gql/graphql'
import { SHADOWS } from '@theme/shadows'
import { gigStartDate } from '@utils/gigs'
import { format } from 'date-fns'
import { MdOutlineFestival } from 'react-icons/md'

interface Props {
  gig: Gig
}

const Card = ({ gig }: Props) => {
  const { _id: id, artist, date, venue, lineup, festival, info } = gig

  return (
    <Flex key={id} gap={2} position="relative">
      <Flex direction="column" w="100%" color="#cecece" bg="GREYGRAD" boxShadow={SHADOWS.default}>
        <Box h="150px" w="100%" bgImg={artist.image} bgSize="cover" bgPosition="top" />
        <Box p={4}>
          <Flex gap={2}>
            <Info info={info} />
            <Lineup lineup={lineup} />
            <Delete id={id} />
          </Flex>
          <Box py={2} pb={0}>
            <Flex w="100%">
              <Box>
                <Text fontSize="lg" noOfLines={1} color="#fff" fontWeight="bold">
                  {artist.name}
                </Text>
              </Box>
              {festival?.start_date && <Icon as={MdOutlineFestival} ml="auto" />}
            </Flex>
          </Box>
          <Box pb={2}>
            <Text fontSize="sm" color="#888">
              {date?.start && gigStartDate(date)}{' '}
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
  )
}

export default Card
