import { useState } from 'react'

import { rateGigMutation } from '@api/ratings/ratings'
import { useMutation } from '@apollo/client'
import { Flex, Icon } from '@chakra-ui/react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

interface Props {
  id: string
  ratings: Record<string, any>
}

const Rating = ({ id, ratings }: Props) => {
  const [dbRating, setDbRating] = useState<number>(ratings[0]?.rating)
  const [rating, setRating] = useState<number>(dbRating || 0)
  const [rateGig] = useMutation(rateGigMutation)
  const ratingsSteps = [1, 2, 3, 4, 5]

  const rate = async (value: number) => {
    await rateGig({ variables: { id, rating: value } })
    setRating(value)
    setDbRating(value)
  }

  return (
    <Flex cursor="pointer">
      {ratingsSteps.map(step => (
        <Icon
          as={rating >= step ? AiFillStar : AiOutlineStar}
          onClick={() => rate(step)}
          onMouseEnter={() => setRating(step)}
          onMouseLeave={() => setRating(dbRating)}
        />
      ))}
    </Flex>
  )
}

export default Rating
