import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { MdInfoOutline } from 'react-icons/md'

interface Props {
  info: string
}

const Info = ({ info }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return info?.length > 1 ? (
    <>
      <Button size="sm" onClick={onOpen} color="#fff">
        <MdInfoOutline />
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
