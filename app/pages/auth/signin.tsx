import { ReactElement } from 'react'

import { Box, Button, Center } from '@chakra-ui/react'
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react'
import { BsGoogle, BsSpotify } from 'react-icons/bs'

interface Props {
  providers: ClientSafeProvider[]
}

const getLogo: Record<string, ReactElement> = {
  spotify: <BsSpotify />,
  google: <BsGoogle />,
}

export default function SignIn({ providers }: Props) {
  return (
    <Center top="0" left="0" position="absolute" flexDir="column" w="100vw" h="100vh" gap={4}>
      {Object.values(providers).map(provider => (
        <Box key={provider.name}>
          <Button leftIcon={getLogo[provider.name.toLowerCase()]} onClick={() => signIn(provider.id)}>
            Login with {provider.name}
          </Button>
        </Box>
      ))}
    </Center>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
