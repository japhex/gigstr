import { useContext } from 'react'

import { Flex } from '@chakra-ui/react'
import DisplayGigs from '@components/display-gigs'
import PastGigs from '@components/display-past-gigs'
import SearchGigs from '@components/search-gigs'
import Title from '@components/ui/title'
import { AppContext } from '@context/app/context'
import { getSession, GetSessionParams } from 'next-auth/react'

export default function IndexPage() {
  const { searchActive } = useContext(AppContext)

  return (
    <Flex direction="column" gap={8}>
      <Flex direction="column" gap={4}>
        <Title title="find gigs" filter={false} />
        <SearchGigs />
      </Flex>
      {!searchActive && (
        <>
          <Flex direction="column" gap={4}>
            <PastGigs />
          </Flex>
          <Flex direction="column" gap={4}>
            <DisplayGigs />
          </Flex>
        </>
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
