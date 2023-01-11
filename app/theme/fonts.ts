import { CSSProperties } from 'react'

type FontVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

export const FONT_SIZES: Record<FontVariant, CSSProperties> = {
  1: {
    fontSize: '10px',
    lineHeight: '12px',
  },
  2: {
    fontSize: '12px',
    lineHeight: '16px',
  },
  3: {
    fontSize: '14px',
    lineHeight: '20px',
  },
  4: {
    fontSize: '15px',
    lineHeight: '22px',
  },
  5: {
    fontSize: '16px',
    lineHeight: '24px',
  },
  6: {
    fontSize: '18px',
    lineHeight: '24px',
  },
  7: {
    fontSize: '21px',
    lineHeight: '28px',
  },
  8: {
    fontSize: '24px',
    lineHeight: '32px',
  },
  9: {
    fontSize: '30px',
    lineHeight: '36px',
  },
  10: {
    fontSize: '36px',
    lineHeight: '44px',
  },
  11: {
    fontSize: '48px',
    lineHeight: '56px',
  },
  12: {
    fontSize: '60px',
    lineHeight: '68px',
  },
  13: {
    fontSize: '72px',
    lineHeight: '80px',
  },
}
