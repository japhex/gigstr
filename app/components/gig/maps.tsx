import { Button } from '@chakra-ui/react'
import { MdMap } from 'react-icons/md'

interface Props {
  lat: string | null
  lng: string | null
}

const Maps = ({ lat = null, lng = null }: Props) => {
  return (
    <>
      <Button
        variant="iconButton"
        size="sm"
        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank')}
        isDisabled={!lat && !lng}
      >
        <MdMap />
      </Button>
    </>
  )
}

export default Maps
