import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle: definePartsStyleInput, defineMultiStyleConfig: defineMultiStyleConfigInput } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseInputStyle = definePartsStyleInput({
  field: {
    border: 0,
    outline: 0,
    background: 'GREY4',
    _placeholder: {
      color: 'GREY2',
    },
    _focus: {
      outline: '1px solid #000',
    },
  },
})

export const inputTheme = defineMultiStyleConfigInput({
  baseStyle: baseInputStyle,
  variants: { base: baseInputStyle },
  defaultProps: { variant: 'base' },
})
