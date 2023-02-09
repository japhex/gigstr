import {
  Badge,
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { Artist } from '@gql/graphql'
import { LineupIcon } from '@theme/utils/icons'

interface Props {
  lineup: Artist[]
}

const Lineup = ({ lineup }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button variant="iconButton" size="sm" onClick={onOpen} isDisabled={lineup === null || lineup.length === 0}>
        <Icon as={LineupIcon} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={10}>
            <Flex gap={2} wrap="wrap">
              {lineup?.map(band => (
                <Badge variant="clear" key={band.name}>
                  {band.name}
                </Badge>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Lineup
