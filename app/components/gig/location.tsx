import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { Gig } from '@gql/graphql'
import { MdOutlineLocationOn } from 'react-icons/md'

interface Props {
  venue: Pick<Gig, 'venue'>
}

const Location = ({ venue }: Props) => {
  const { name, city, country } = venue

  return (
    <Flex gap={2} align="center" color="#888">
      <Icon as={MdOutlineLocationOn} boxSize={5} />
      <Box>
        <Text fontSize="sm">{name}</Text>
        <Text fontSize="xs">
          {city}, {country}
        </Text>
      </Box>
    </Flex>
  )
}

export default Location
