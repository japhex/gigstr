import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { Venue } from '@gql/graphql'
import { fonts } from '@theme/index'
import { MdOutlineLocationOn } from 'react-icons/md'

interface Props {
  venue: Venue
}

const Location = ({ venue }: Props) => (
  <Flex gap={2} align="center" color="#888" className={fonts.poppinsLight}>
    <Icon as={MdOutlineLocationOn} boxSize={5} />
    <Box>
      <Text fontSize="sm" noOfLines={1}>
        {venue?.name}
      </Text>
      <Text fontSize="xs" noOfLines={1}>
        {venue?.city}, {venue?.country}
      </Text>
    </Box>
  </Flex>
)

export default Location
