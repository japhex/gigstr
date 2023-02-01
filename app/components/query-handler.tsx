import { Box, Spinner } from '@chakra-ui/react'
import UseAnimations from 'react-useanimations'
import alertCircle from 'react-useanimations/lib/alertCircle'

interface Props {
  loading: any
  error: any
  strokeColor?: any
}

const QueryHandler = ({ loading, error, strokeColor }: Props) => {
  return (
    <Box>
      {loading && <Spinner />}
      {error && <UseAnimations strokeColor={strokeColor} animation={alertCircle} />}
    </Box>
  )
}

export default QueryHandler
