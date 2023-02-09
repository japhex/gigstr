import { useRef } from 'react'

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

import { deleteGigMutation } from '../../api-routes/gigs/gigs'

interface Props {
  id: Pick<Gig, '_id'>
}

const Delete = ({ id }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  const [deleteGig, { loading }] = useMutation(deleteGigMutation)

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
          <AlertDialogHeader>Delete did?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Are you sure you want to delete this gig?</AlertDialogBody>
          <AlertDialogFooter>
            <Flex gap={4}>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button onClick={() => handleDelete()} isLoading={loading}>
                Yes
              </Button>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Delete
