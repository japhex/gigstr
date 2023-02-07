import type { ReactNode } from 'react'

import { Box, Center, Flex, Text } from '@chakra-ui/react'
import Header from '@components/header'
// @ts-ignore
import { Session } from 'next-auth'

export default function Layout({ auth, children }: { auth: Session; children: ReactNode }) {
  return (
    <Box w="100vw" minH="100vh" p={4} bg="GREY4" color="GREY2">
      <Flex>
        {auth ? (
          <>
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
              <Header />
            </Flex>
            <Box w={{ base: '100vw', lg: '75vw' }}>{children}</Box>
          </>
        ) : (
          <Center flexDir="column" w="100vw">
            <Text fontSize="3xl" color="#fff" fontWeight="bold">
              Gigstr
            </Text>
            <Box>{children}</Box>
          </Center>
        )}
      </Flex>
    </Box>
  )
}
