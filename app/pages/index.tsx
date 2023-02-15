import { useContext } from 'react'

import { Box, Flex, Grid } from '@chakra-ui/react'
import DisplayGigs from '@components/display-gigs'
import PastGigs from '@components/display-past-gigs'
import SearchGigs from '@components/search-gigs'
import SkeletonLoader from '@components/ui/skeleton-loader'
import { AppContext } from '@context/app/context'
import { getSession, GetSessionParams } from 'next-auth/react'

import { tokenVar } from './_app'

export default function IndexPage({ session }) {
  const { searchActive, searchLoading } = useContext(AppContext)
  const loop = 12

  tokenVar({ ...session })

  return (
    <Flex direction="column" gap={16}>
      <SearchGigs />
      {!searchActive && !searchLoading && (
        <>
          <Flex direction="column" gap={4}>
            <PastGigs session={session} />
          </Flex>
          <Flex direction="column" gap={4}>
            <DisplayGigs session={session} />
          </Flex>
        </>
      )}
      {searchLoading && (
        <Box bg="GREY4">
          <Grid templateColumns="repeat(5, minmax(0, 1fr))" gap={4} py={4}>
            {[...Array(loop)].map(() => (
              <SkeletonLoader />
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
