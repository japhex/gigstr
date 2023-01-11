import { useContext } from 'react'

import { Flex, Text } from '@chakra-ui/react'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

import DisplayGigs from '../components/display-gigs'
import PastGigs from '../components/display-past-gigs'
import Layout from '../components/layout'
import SearchGigs from '../components/search-gigs'
import { AppContext } from '../context/app/context'

export default function IndexPage() {
  const { searchActive } = useContext(AppContext)

  return (
    <Layout>
      <Head>
        <title>Gigstr</title>
      </Head>
      <Flex direction="column" gap={8}>
        <Flex direction="column" gap={4}>
          <Text fontSize="xl" noOfLines={1} color="#fff" fontWeight="bold">
            find gigs
          </Text>
          <SearchGigs />
        </Flex>
        {!searchActive && (
          <>
            <Flex direction="column" gap={4}>
              <Text fontSize="xl" noOfLines={1} color="#fff" fontWeight="bold">
                past gigs
              </Text>
              <PastGigs />
            </Flex>
            <Flex direction="column" gap={4}>
              <Text fontSize="xl" noOfLines={1} color="#fff" fontWeight="bold">
                upcoming gigs
              </Text>
              <DisplayGigs />
            </Flex>
          </>
        )}
      </Flex>
    </Layout>
  )
}

export async function getServerSideProps(context) {
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
