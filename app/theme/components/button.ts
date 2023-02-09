import type { StyleFunctionProps } from '@chakra-ui/styled-system'

export const buttonTheme = {
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
}
