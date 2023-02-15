import { useContext } from 'react'

import { useMutation } from '@apollo/react-hooks'
import { Flex, Button, Center } from '@chakra-ui/react'
import Card from '@components/gig/card'
import { AppContext } from '@context/app/context'
import { CreateGigDocument, Gig, GigsDocument } from '@gql/graphql'
import { UseFormSetValue } from 'react-hook-form'

interface Props {
  gig: Gig
  setValue: UseFormSetValue<Record<'artist', string>>
}

const GigResult = ({ gig, setValue }: Props) => {
  const { setSearchActive } = useContext(AppContext)
  const [createGig, { loading }] = useMutation(CreateGigDocument, {
    refetchQueries: [{ query: GigsDocument }],
  })

  const saveGig = async () => {
    await createGig({
      // @ts-ignore
      variables: { ...gig },
    })
    setValue('artist', '')
    setSearchActive(false)
  }

  return (
    <Flex direction="column" h="100%" gap={4}>
      <Card
        gig={gig}
        icons={false}
        footer={
          gig.attending ? (
            <Center p={3}>You're already going!</Center>
          ) : (
            <Button
              aria-label="add gig"
              borderBottomRadius={0}
              isLoading={loading}
              onClick={saveGig}
              mt="auto"
              variant="primary"
            >
              Add gig
            </Button>
          )
        }
      />
    </Flex>
  )
}

export default GigResult
