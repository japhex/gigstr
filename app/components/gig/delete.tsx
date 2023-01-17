import { useRef } from 'react'

import { deleteGigMutation } from '@api/gigs/gigs'
import { useMutation } from '@apollo/react-hooks'
import {
  AlertDialogBody,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogCloseButton,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  AlertDialogContent,
  Flex,
} from '@chakra-ui/react'
import { Gig } from '@gql/graphql'
import { MdOutlineDelete } from 'react-icons/md'

interface Props {
  id: Pick<Gig, '_id'>
}

const Delete = ({ id }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  const [deleteGig] = useMutation(deleteGigMutation)

  const handleDelete = async () => {
    await deleteGig({ variables: { id }, refetchQueries: ['gigs'] })
    onClose()
  }

  return (
    <>
      <Button variant="iconButton" size="sm" onClick={onOpen}>
        <MdOutlineDelete />
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Are you sure you want to discard this gig?</AlertDialogBody>
          <AlertDialogFooter>
            <Flex gap={4}>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button onClick={() => handleDelete()}>Yes</Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Delete