import { tagAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle: definePartsStyleTag, defineMultiStyleConfig: defineMultiStyleConfigTag } =
  createMultiStyleConfigHelpers(tagAnatomy.keys)

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

const clearTagStyle = definePartsStyleTag({
  container: {
    textTransform: 'uppercase',
    bg: 'none',
    borderRadius: '36px',
    fontWeight: 700,
    color: 'WHITE',
    paddingX: 14,
    letterSpacing: '0.04em',
  },
})

export const tagTheme = defineMultiStyleConfigTag({
  baseStyle: baseTagStyle,
  variants: { clear: clearTagStyle },
  defaultProps: {
    // @ts-ignore
    variant: 'none',
  },
})
