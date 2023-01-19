import { Flex, Text } from '@chakra-ui/react'
import Filters from '@components/ui/filters'

interface Props {
  title: string
  filter?: boolean
  past?: boolean
}

const Title = ({ title, filter = true, past }: Props) => (
  <Flex align="center" gap={4}>
    <Text fontSize="xl" noOfLines={1} color="WHITE" fontWeight="bold">
      {title}
    </Text>
    {filter && <Filters past={past} />}
  </Flex>
)

export default Title
