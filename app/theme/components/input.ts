import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle: definePartsStyleInput, defineMultiStyleConfig: defineMultiStyleConfigInput } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseInputStyle = definePartsStyleInput({
  field: {
    border: 0,
    outline: 0,
    background: 'GREY4',
  },
})

export const inputTheme = defineMultiStyleConfigInput({
  baseStyle: baseInputStyle,
  variants: { base: baseInputStyle },
  defaultProps: { variant: 'base' },
})
