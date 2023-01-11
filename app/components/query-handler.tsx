import { Box } from '@chakra-ui/react'
import UseAnimations from 'react-useanimations'
import alertCircle from 'react-useanimations/lib/alertCircle'
import infinity from 'react-useanimations/lib/infinity'

interface Props {
  loading: any
  error: any
  strikeColor?: any
}

const QueryHandler = ({ loading, error, strokeColor }: Props) => {
  return (
    <Box>
      {loading && <UseAnimations strokeColor={strokeColor} animation={infinity} />}
      {error && <UseAnimations strokeColor={strokeColor} animation={alertCircle} />}
    </Box>
  )
}

export default QueryHandler
