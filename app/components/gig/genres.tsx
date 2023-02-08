import { Flex, Tag } from '@chakra-ui/react'

interface Props {
  artist: Record<string, string>
}

const Genres = ({ artist }: Props) => {
  const { genre, subGenre } = artist

  return (
    <Flex gap={2} justify="center">
      {genre && (
        <Tag size="sm" colorScheme="gray" bg="#000">
          {genre}
        </Tag>
      )}
      {subGenre && subGenre !== genre && (
        <Tag size="sm" colorScheme="gray" bg="#000">
          {subGenre}
        </Tag>
      )}
    </Flex>
  )
}

export default Genres
