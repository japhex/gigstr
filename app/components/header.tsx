import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'

export default function Header() {
  const {
    data: { user },
  } = useSession()

  return (
    <Box mt="auto">
      {user && (
        <Flex gap={4}>
          {user.image && <Image alt={user.name} src={user.image} borderRadius={6} w="60px" />}
          <Flex direction="column" justify="center">
            <Text size="sm">{user.name || user.email}</Text>
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
