type Color = 'GREY1' | 'GREY2' | 'GREY3' | 'GREY4' | 'GREY5' | 'GREY6' | 'GREYGRAD' | 'RED' | 'RED1'

export const COLORS: Record<Color, string> = {
  GREY1: '#171717',
  GREY2: '#AAAAAA',
  GREY3: '#181818',
  GREY4: '#121212',
  GREY5: '#888888',
  GREY6: '#2b2b2b',
  GREYGRAD: 'linear-gradient(270deg, rgba(23,23,23,1) 0%, rgba(22,22,22,1) 35%, rgba(23,23,23,1) 100%);',
  RED: '#E53E3E',
  RED1: '#E95741',
}
