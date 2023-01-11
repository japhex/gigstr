import { tagAnatomy } from '@chakra-ui/anatomy'
import { extendTheme, createMultiStyleConfigHelpers } from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

import { FONT_SIZES } from './fonts'
import { SHADOWS } from './shadows'
import { SPACING } from './spacing'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys)

const baseStyle = definePartsStyle({
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

export const tagTheme = defineMultiStyleConfig({
  baseStyle,
  defaultProps: {
    variant: 'none',
  },
})

export const theme = extendTheme({
  space: SPACING,
  fontSizes: FONT_SIZES,
  shadows: SHADOWS,
  fonts: {
    clash: `"Clash"`,
  },
  colors: {
    GREY1: '#171717',
    GREY2: '#AAAAAA',
    GREY3: '#181818',
    GREY4: '#121212',
    GREYGRAD: 'linear-gradient(270deg, rgba(23,23,23,1) 0%, rgba(22,22,22,1) 35%, rgba(23,23,23,1) 100%);',
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
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
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
        'with-shadow': {
          bg: 'red.400',
          boxShadow: '0 0 2px 2px #efdfde',
        },
        solid: (props: StyleFunctionProps) => ({
          bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
        }),
        primary: {
          bg: 'RED3',
          paddingX: 12,
          fontSize: 'md',
          color: 'WHITE',
        },
        secondary: {
          bg: 'BLACK',
          paddingX: 12,
          fontSize: 'md',
          color: 'WHITE',
        },
      },
      defaultProps: {
        size: 'lg',
        variant: 'sm',
        colorScheme: 'green',
      },
    },
  },
})
