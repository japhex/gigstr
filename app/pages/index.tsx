import { useContext } from 'react'

import { Box, Flex, Grid, Skeleton } from '@chakra-ui/react'
import DisplayGigs from '@components/display-gigs'
import PastGigs from '@components/display-past-gigs'
import SearchGigs from '@components/search-gigs'
import { AppContext } from '@context/app/context'
import { getSession, GetSessionParams } from 'next-auth/react'

export default function IndexPage() {
  const { searchActive, searchLoading } = useContext(AppContext)
  const loop = 12

  return (
    <Flex direction="column" gap={16}>
      <SearchGigs />
      {!searchActive && !searchLoading && (
        <>
          <Flex direction="column" gap={4}>
            <PastGigs />
          </Flex>
          <Flex direction="column" gap={4}>
            <DisplayGigs />
          </Flex>
        </>
      )}
      {searchLoading && (
        <Box bg="GREY4">
          <Grid templateColumns="repeat(5, minmax(0, 1fr))" gap={4} py={4}>
            {[...Array(loop)].map(() => (
              <Flex bg="GREY3" borderRadius={4} gap={4} w="100%" direction="column">
                <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="150px" />
                <Flex direction="column" gap={2} p={4}>
                  <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="20px" />
                  <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="10px" />
                  <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="5px" />
                  <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="5px" />
                  <Skeleton startColor="GREY3" endColor="GREY4" width="100%" height="30px" borderRadius="10px" />
                </Flex>
              </Flex>
            ))}
          </Grid>
        </Box>
      )}
    </Flex>
  )
}

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
