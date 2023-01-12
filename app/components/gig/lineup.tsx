import { Badge, Button, Flex, Icon, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'

import { LineupIcon } from '../../theme/icons'

interface Props {
  lineup: Record<string, any>
}

const Lineup = ({ lineup }: Props) => {
  return lineup?.length > 1 ? (
    <Popover>
      <PopoverTrigger>
        <Button size="sm">
          <Icon as={LineupIcon} color="#fff" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Flex gap={2} wrap="wrap">
            {/* needs typing properly in api response */}
            {lineup.map(band => (
              <Badge colorScheme="orange" key={band.name}>
                {band.name}
              </Badge>
            ))}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ) : null
}

export default Lineup
