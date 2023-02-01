import { useContext } from 'react'

import { useMutation } from '@apollo/react-hooks'
import { Flex, Box, Text, Icon, Button, Center } from '@chakra-ui/react'
import { AppContext } from '@context/app/context'
import { CreateGigDocument, Gig, GigsDocument } from '@gql/graphql'
import { format, parseISO } from 'date-fns'
import { MdAddCircleOutline, MdOutlineCalendarToday, MdOutlineLocationOn } from 'react-icons/md'

interface Props {
  gig: Gig
}

const GigResult = ({ gig }: Props) => {
  const { setSearchActive } = useContext(AppContext)
  const [createGig] = useMutation(CreateGigDocument, {
    refetchQueries: [{ query: GigsDocument }],
  })

  const saveGig = async () => {
    await createGig({
      // @ts-ignore
      variables: { ...gig },
    })
    setSearchActive(false)
  }

  return (
    <Flex direction="column" bg="GREY3" p={4} borderRadius={4}>
      <Flex align="center" gap={4}>
        <Flex
          basis="100px"
          grow={0}
          shrink={0}
          h="100px"
          w="100px"
          bgImg={gig.artist.image || ''}
          bgSize="cover"
          bgPosition="top"
          borderRadius="50px"
        />
        <Flex direction="column" gap={2}>
          <Text fontSize="xl">{gig.artist.name}</Text>
          <Text fontSize="sm">
            <Flex direction="column" gap={2}>
              <Flex gap={2} align="center">
                <Icon as={MdOutlineCalendarToday} boxSize={4} />
                <Box>
                  {gig?.date?.start && format(parseISO(gig.date.start), 'MMMM do yyyy')}
                  {gig?.date?.end && `- ${format(parseISO(gig.date.end), 'MMMM do yyyy')}`}
                </Box>
              </Flex>
              {gig.venue && (
                <Flex gap={2} align="center">
                  <Icon as={MdOutlineLocationOn} boxSize={4} />
                  <Box>{gig.venue.name}</Box>
                </Flex>
              )}
            </Flex>
          </Text>
        </Flex>
      </Flex>
      {gig.attending ? (
        <Center p={4}>You're already going!</Center>
      ) : (
        <Button leftIcon={<MdAddCircleOutline />} onClick={saveGig} mt="auto" variant="primary">
          Add gig
        </Button>
      )}
    </Flex>
  )
}

export default GigResult
