import { COLORS } from '@theme/utils/colors'

export const GLOBAL = {
  '*': {
    boxSizing: 'border-box',
    scrollbarWidth: 'auto',
    scrollbarColor: `${COLORS.GREY6} ${COLORS.GREY1}`,
    scrollBehavior: 'smooth',
  },
  '-webkit-scrollbar-track': {
    background: COLORS.GREY1,
  },
  '-webkit-scrollbar-thumb': {
    background: COLORS.GREY6,
    borderRadius: '10px',
    border: '0px solid WHITE',
  },
}
