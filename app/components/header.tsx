import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { HiOutlineTicket, HiOutlineUser } from 'react-icons/hi'
import { IoIosStats } from 'react-icons/io'

export default function Header() {
  const { data } = useSession()

  return (
    <Flex direction="column" h="100vh">
      <Box as="nav" pt={6} pl={4}>
        <Flex direction="column" gap={4}>
          <Link href="/">
            <Flex align="center" gap={2}>
              <HiOutlineTicket size={30} />
              <Text>Gigs</Text>
            </Flex>
          </Link>
          <Link href="/profile">
            <Flex align="center" gap={2}>
              <HiOutlineUser size={30} />
              <Text>Profile</Text>
            </Flex>
          </Link>
          <Link href="/stats">
            <Flex align="center" gap={2}>
              <IoIosStats size={30} />
              <Text>Stats</Text>
            </Flex>
          </Link>
        </Flex>
      </Box>
      <Box mt="auto">
        {data?.user && (
          <Flex gap={4}>
            {data?.user.image && (
              <Image src={data?.user.image} alt={data?.user.name || data?.user.email || ''} borderRadius={6} w="60px" />
            )}
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
    </Flex>
  )
}
