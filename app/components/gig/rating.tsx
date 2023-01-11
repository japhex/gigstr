import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { Flex, Icon } from '@chakra-ui/react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

import { rateGigMutation } from '../../api/ratings/ratings'

interface Props {
  id: string
  ratings: Record<string, any>
}

const Rating = ({ id, ratings }: Props) => {
  const [rating, setRating] = useState<number>(ratings[0]?.rating || 0)
  const [rateGig] = useMutation(rateGigMutation)

  const rate = async (value: number) => {
    setRating(value)
    await rateGig({ variables: { id, rating: value } })
  }

  return (
    <Flex gap={2}>
      <Icon as={rating >= 1 ? AiFillStar : AiOutlineStar} onClick={() => rate(1)} />
      <Icon as={rating >= 2 ? AiFillStar : AiOutlineStar} onClick={() => rate(2)} />
      <Icon as={rating >= 3 ? AiFillStar : AiOutlineStar} onClick={() => rate(3)} />
      <Icon as={rating >= 4 ? AiFillStar : AiOutlineStar} onClick={() => rate(4)} />
      <Icon as={rating === 5 ? AiFillStar : AiOutlineStar} onClick={() => rate(5)} />
    </Flex>
  )
}

export default Rating
