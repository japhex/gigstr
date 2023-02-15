import { ReactElement } from 'react'

import { Box, Button, Center } from '@chakra-ui/react'
import Logo from '@components/shared/logo'
import { fonts } from '@theme/index'
import { SHADOWS } from '@theme/utils/shadows'
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
    <Center w="100vw" h="100vh">
      <Center w="50vw" h="50vh" bg="GREY3" flexDir="column" gap={4} boxShadow={SHADOWS.default} position="relative">
        <Logo />
        {Object.values(providers).map(provider => (
          <Box key={provider.name}>
            <Button
              aria-label={`login with ${provider.name}`}
              leftIcon={getLogo[provider.name.toLowerCase()]}
              onClick={() => signIn(provider.id)}
              className={fonts.poppins}
              boxShadow={SHADOWS.default}
            >
              Login with {provider.name}
            </Button>
          </Box>
        ))}
      </Center>
    </Center>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
