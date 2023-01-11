import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { MdOutlineInfo } from 'react-icons/md'

const Info = ({ info }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return info?.length > 1 ? (
    <>
      <Button size="sm" leftIcon={<Icon boxSize={5} as={MdOutlineInfo} />} onClick={onOpen} variant="outline">
        info
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={10}>{info}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  ) : null
}

export default Info
