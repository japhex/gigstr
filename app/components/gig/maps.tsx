import { Button } from '@chakra-ui/react'
import { MdMap } from 'react-icons/md'

interface Props {
  lat: string | number
  lng: string | number
}

const Maps = ({ lat, lng }: Props) => {
  return (
    <>
      <Button
        variant="iconButton"
        size="sm"
        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank')}
      >
        <MdMap />
      </Button>
    </>
  )
}

export default Maps
