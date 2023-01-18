import { Flex, Text } from '@chakra-ui/react'
import Filters from '@components/ui/filters'

interface Props {
  title: string
  filter?: boolean
}

const Title = ({ title, filter = true }: Props) => (
  <Flex align="center" gap={4}>
    <Text fontSize="xl" noOfLines={1} color="WHITE" fontWeight="bold">
      {title}
    </Text>
    {filter && <Filters />}
  </Flex>
)

export default Title
