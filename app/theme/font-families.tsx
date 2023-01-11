import { Global } from '@emotion/react'

const FontFamilies = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Clash';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/ClashDisplay-Regular.ttf') format('ttf'), url('./fonts/ClashDisplay-Regular.woff') format('woff'), url('./fonts/ClashDisplay-Regular.woff2') format('woff2');
      }
      `}
  />
)

export default FontFamilies
