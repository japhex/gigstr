import { modalAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle: definePartsStyleModal, defineMultiStyleConfig: defineMultiStyleConfigModal } =
  createMultiStyleConfigHelpers(modalAnatomy.keys)

const baseModalStyle = definePartsStyleModal({
  dialog: {
    borderRadius: 'md',
    color: 'WHITE',
    bg: 'GREY3',
  },
})

export const modalTheme = defineMultiStyleConfigModal({
  baseStyle: baseModalStyle,
})
