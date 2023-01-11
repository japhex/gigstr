import { Badge, Button, Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'

interface Props {
  lineup: Record<string, any>
}

const Lineup = ({ lineup }: Props) => {
  return lineup?.length > 1 ? (
    <Popover>
      <PopoverTrigger>
        <Button size="sm" variant="outline" colorScheme="gray">
          lineup
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
