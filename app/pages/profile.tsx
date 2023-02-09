import { Avatar, Flex, Text } from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'
import { useSession } from 'next-auth/react'

import { authOptions } from './api/auth/[...nextauth]'

export default function Profile() {
  const { data } = useSession()

  return (
    <Flex gap={4} align="center">
      <Avatar size="xl" src={data?.user?.image || ''} />
      <Flex direction="column">
        <Text>{data?.user?.name}</Text>
        <Text>{data?.user?.email}</Text>
      </Flex>
    </Flex>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  }
}
