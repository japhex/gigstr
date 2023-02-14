import { Box } from '@chakra-ui/react'
import SkeletonLoader from '@components/ui/skeleton-loader'
import SkeletonLoaderThin from '@components/ui/skeleton-loader-thin'
import UseAnimations from 'react-useanimations'
import alertCircle from 'react-useanimations/lib/alertCircle'

interface Props {
  loading: any
  error: any
  strokeColor?: any
  loop?: number
  loaderStyle?: 'default' | 'thin'
}

const QueryHandler = ({ loading, error, strokeColor, loop = 8, loaderStyle = 'default' }: Props) => {
  return (
    <Box>
      {loading &&
        (loaderStyle === 'default'
          ? [...Array(loop)].map(() => <SkeletonLoader />)
          : [...Array(3)].map(() => <SkeletonLoaderThin />))}
      {error && <UseAnimations strokeColor={strokeColor} animation={alertCircle} />}
    </Box>
  )
}

export default QueryHandler
