import type { ReactNode } from 'react'

import { Box, Flex, Text } from '@chakra-ui/react'

import Header from './header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box w="100vw" minH="100vh" p={4} bg="GREY4" color="GREY2">
      <Flex>
        <Flex direction="column" h="calc(100vh - 32px)" position="sticky" top={4} w={{ base: '100vw', lg: '25vw' }}>
          <Text fontSize="3xl" noOfLines={1} color="#fff" fontWeight="bold">
            Gigstr
          </Text>
          <Header />
        </Flex>
        <Box w={{ base: '100vw', lg: '75vw' }}>{children}</Box>
      </Flex>
    </Box>
  )
}
