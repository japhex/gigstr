import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'

export default function Header() {
  const { data } = useSession()

  return (
    <Box mt="auto">
      {data?.user && (
        <Flex gap={4}>
          {data?.user.image && <Avatar src={data?.user.image} borderRadius={6} w="60px" />}
          <Flex direction="column" justify="center">
            <Text size="sm">{data?.user.name || data?.user.email}</Text>
            <Box
              onClick={async () => {
                await signOut()
              }}
            >
              <small>Sign out</small>
            </Box>
          </Flex>
        </Flex>
      )}
    </Box>
  )
}
