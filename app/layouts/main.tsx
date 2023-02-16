import type { ReactNode } from 'react'

import { Box, Center, Flex, useMediaQuery } from '@chakra-ui/react'
import Header from '@components/header'
import Logo from '@components/shared/logo'
import { theme } from '@theme/index'
// @ts-ignore
import { Session } from 'next-auth'

export default function Main({ auth, children }: { auth: Session; children: ReactNode }) {
  const isTablet = useMediaQuery(theme.breakpoints.tabletDown)

  console.log(isTablet[0])

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
              w={{ base: '100vw', lg: '15vw' }}
            >
              <Box>
                <Logo />
              </Box>
              <Header />
            </Flex>
            <Box w={{ base: '100vw', lg: '85vw' }}>{children}</Box>
          </>
        ) : (
          <Center flexDir="column" w="100vw">
            <Box>{children}</Box>
          </Center>
        )}
      </Flex>
    </Box>
  )
}
