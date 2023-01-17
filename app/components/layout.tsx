import type { ReactNode } from 'react'

import { Box, Flex, Text } from '@chakra-ui/react'

import Header from './header'
import { useQuery } from '@apollo/react-hooks'
import { GigsDocument, GigsQuery } from '../gql/graphql'
import QueryHandler from './query-handler'
import { gigStartDate } from '../utils/gigs'
import Location from './gig/location'

export default function Layout({ children }: { children: ReactNode }) {
  const { loading, error, data } = useQuery<GigsQuery>(GigsDocument)
  const gigs = data?.gigs || []

  return (
    <Box w="100vw" minH="100vh" p={4} bg="GREY4" color="GREY2">
      <Flex>
        <Flex
          pr={4}
          direction="column"
          h="calc(100vh - 32px)"
          position="sticky"
          top={4}
          w={{ base: '100vw', lg: '25vw' }}
        >
          <Box>
            <Text fontSize="3xl" noOfLines={1} color="#fff" fontWeight="bold">
              Gigstr
            </Text>
          </Box>
          <Flex direction="column" mt={4} gap={4}>
            <Text fontSize="xl" noOfLines={1} color="#fff" fontWeight="bold">
              next gig
            </Text>
            {loading || error ? (
              <QueryHandler loading={loading} error={error} />
            ) : (
              <Box bg="GREYGRAD">
                <Flex direction="column">
                  <Box h="200px" w="100%" bgImg={gigs[0]?.artist.image} bgSize="cover" bgPosition="top" />
                  <Flex direction="column" gap={4} p={4}>
                    <Text fontSize="lg" noOfLines={1} color="#fff" fontWeight="bold">
                      {gigs[0]?.artist.name}
                    </Text>
                    <Text fontSize="sm" color="#888">
                      {gigs[0]?.date?.start && gigStartDate(gigs[0]?.date)}{' '}
                    </Text>
                    <Location venue={gigs[0]?.venue} />
                  </Flex>
                </Flex>
              </Box>
            )}
          </Flex>
          <Header />
        </Flex>
        <Box w={{ base: '100vw', lg: '75vw' }}>{children}</Box>
      </Flex>
    </Box>
  )
}
