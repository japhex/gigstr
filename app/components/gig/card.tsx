import { ReactNode } from 'react'

import { Box, Flex, Icon, Image, Text } from '@chakra-ui/react'
import Delete from '@components/gig/delete'
import Genres from '@components/gig/genres'
import Info from '@components/gig/info'
import Lineup from '@components/gig/lineup'
import Location from '@components/gig/location'
import Maps from '@components/gig/maps'
import { Gig } from '@gql/graphql'
import { fonts } from '@theme/index'
import { SHADOWS } from '@theme/utils/shadows'
import { gigStartDate } from '@utils/gigs'
import { format } from 'date-fns'
import { MdOutlineFestival } from 'react-icons/md'

interface Props {
  gig: Gig | Record<any, any>
  icons?: boolean
  footer?: ReactNode
}

const Card = ({ gig, icons = true, footer = null }: Props) => {
  const { _id: id, artist, date, venue, lineup, festival, info } = gig

  return (
    <Flex gap={2} position="relative">
      <Flex direction="column" w="100%" color="GREY8" bg="GREYGRAD" boxShadow={SHADOWS.default}>
        <Image
          loading="lazy"
          role="presentation"
          h="150px"
          w="100%"
          src={artist.image}
          objectFit="cover"
          bgPosition="top"
          alt={artist.name}
        />
        <Box p={4}>
          {icons && (
            <Flex gap={2} justify="center">
              <Info info={info} />
              <Lineup lineup={lineup} />
              <Maps lat={venue?.location?.latitude} lng={venue?.location?.longitude} />
              <Delete id={id} />
            </Flex>
          )}
          <Box py={2} pb={0} mt={2}>
            <Flex w="100%" justify={{ base: 'center', md: 'left' }}>
              <Box>
                <Text fontSize="lg" noOfLines={1} color="WHITE" className={fonts.poppins}>
                  {artist.name}
                </Text>
              </Box>
              {festival?.start_date && <Icon as={MdOutlineFestival} ml="auto" />}
            </Flex>
          </Box>
          <Flex pb={6} justify={{ base: 'center', md: 'left' }}>
            <Text fontSize="sm" color="GREY5" className={fonts.poppinsBold}>
              {date?.end && date?.start !== date?.end
                ? `${format(new Date(date?.start), 'MMM do')} - ${format(new Date(date?.end), 'MMM do yyyy')}`
                : gigStartDate(date)}
            </Text>
          </Flex>
          {venue && <Location venue={venue} />}
        </Box>
        <Box p={4} mt="auto">
          <Genres artist={artist} />
        </Box>
        {footer && footer}
      </Flex>
    </Flex>
  )
}

export default Card
