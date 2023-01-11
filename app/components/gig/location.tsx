import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { MdOutlineLocationOn } from 'react-icons/md'

interface Props {
  venue: Record<string, string>
}

const Location = ({ venue }: Props) => {
  const { name, city, country } = venue

  return (
    <Flex gap={2} ml="auto" align="center" color="#888">
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
