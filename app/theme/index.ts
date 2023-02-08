import { inputAnatomy, tagAnatomy } from '@chakra-ui/anatomy'
import { extendTheme, createMultiStyleConfigHelpers } from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'
import { Poppins } from '@next/font/google'

import { FONT_SIZES } from './fonts'
import { SHADOWS } from './shadows'
import { SPACING } from './spacing'

const poppins = Poppins({ weight: '400', subsets: ['latin'] })
const poppinsLight = Poppins({ weight: '200', subsets: ['latin'] })
const poppinsBold = Poppins({ weight: '600', subsets: ['latin'] })

const { definePartsStyle: definePartsStyleTag, defineMultiStyleConfig: defineMultiStyleConfigTag } =
  createMultiStyleConfigHelpers(tagAnatomy.keys)
const { definePartsStyle: definePartsStyleInput, defineMultiStyleConfig: defineMultiStyleConfigInput } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseTagStyle = definePartsStyleTag({
  container: {
    textTransform: 'uppercase',
    bg: 'WHITE',
    borderRadius: '36px',
    fontWeight: 700,
    color: 'GREY5',
    paddingX: 14,
    letterSpacing: '0.04em',
  },
})

const baseInputStyle = definePartsStyleInput({
  field: {
    border: 0,
    outline: 0,
    background: 'GREY4',
  },
})

export const tagTheme = defineMultiStyleConfigTag({
  baseStyle: baseTagStyle,
  defaultProps: {
    variant: 'none',
  },
})

export const inputTheme = defineMultiStyleConfigInput({
  baseStyle: baseInputStyle,
  variants: { base: baseInputStyle },
  defaultProps: { variant: 'base' },
})

export const theme = extendTheme({
  space: SPACING,
  fontSizes: FONT_SIZES,
  fonts: {
    poppins: poppins.className,
    poppinsLight: poppinsLight.className,
    poppinsBold: poppinsBold.className,
  },
  shadows: SHADOWS,
  colors: {
    GREY1: '#171717',
    GREY2: '#AAAAAA',
    GREY3: '#181818',
    GREY4: '#121212',
    GREY5: '#888888',
    GREYGRAD: 'linear-gradient(270deg, rgba(23,23,23,1) 0%, rgba(22,22,22,1) 35%, rgba(23,23,23,1) 100%);',
    RED: '#E53E3E',
  },
  styles: {
    global: {
      '*': {
        boxSizing: 'border-box',
        scrollbarWidth: 'auto',
        scrollbarColor: '#2b2b2b #171717',
        scrollBehavior: 'smooth',
      },
      '-webkit-scrollbar-track': {
        background: '#171717',
      },
      '-webkit-scrollbar-thumb': {
        background: '#2b2b2b',
        borderRadius: '10px',
        border: '0px solid #ffffff',
      },
    },
  },
  components: {
    Tag: tagTheme,
    Input: inputTheme,
    Button: {
      baseStyle: {},
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
      },
      variants: {
        'with-input': {
          padding: 0,
        },
        solid: (props: StyleFunctionProps) => ({
          bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
        }),
        primary: {
          bg: '#000',
          border: '1px solid #000',
          fontSize: 'md',
          color: 'WHITE',
          _hover: {
            background: '#111',
          },
        },
        iconButton: {
          bg: '#000',
          border: '1px solid #000',
          fontSize: 'md',
          color: 'WHITE',
          _disabled: {
            background: 'GREY1',
            color: 'GREY5',
            opacity: 1,
            border: 0,
          },
        },
        delete: {
          bg: 'RED',
          padding: 2,
          minWidth: 'auto',
          width: 'auto',
          height: 'auto',
          color: 'WHITE',
          border: '1px solid #000',
        },
      },
      defaultProps: {
        size: 'lg',
        variant: 'primary',
        colorScheme: 'green',
      },
    },
  },
})

export const fonts = theme.fonts
