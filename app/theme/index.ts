import { extendTheme } from '@chakra-ui/react'
import { Poppins } from '@next/font/google'
import { buttonTheme } from '@theme/components/button'
import { GLOBAL } from '@theme/components/global'
import { inputTheme } from '@theme/components/input'
import { modalTheme } from '@theme/components/modal'
import { tagTheme } from '@theme/components/tag'
import { COLORS } from '@theme/utils/colors'

import { FONT_SIZES } from './utils/fonts'
import { SHADOWS } from './utils/shadows'
import { SPACING } from './utils/spacing'

const poppins = Poppins({ weight: '400', subsets: ['latin'] })
const poppinsLight = Poppins({ weight: '200', subsets: ['latin'] })
const poppinsBold = Poppins({ weight: '600', subsets: ['latin'] })

export const theme = extendTheme({
  space: SPACING,
  fontSizes: FONT_SIZES,
  fonts: {
    poppins: poppins.className,
    poppinsLight: poppinsLight.className,
    poppinsBold: poppinsBold.className,
  },
  shadows: SHADOWS,
  colors: COLORS,
  styles: {
    global: GLOBAL,
  },
  components: {
    Tag: tagTheme,
    Input: inputTheme,
    Modal: modalTheme,
    Button: buttonTheme,
  },
})

export const fonts = theme.fonts
