import { Text } from '@chakra-ui/react'
import { fonts } from '@theme/index'
import { SHADOWS } from '@theme/utils/shadows'

const Logo = () => (
  <Text
    textShadow={SHADOWS.border}
    color="RED1"
    fontSize="3xl"
    noOfLines={1}
    fontWeight="bold"
    className={fonts.poppins}
  >
    gigstr
  </Text>
)

export default Logo
