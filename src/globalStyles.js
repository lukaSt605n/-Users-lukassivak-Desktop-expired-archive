import { css } from '@emotion/react';

const globalStyles = css`
  :root {
    color-scheme: light;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #f4f1ea;
    background-image: linear-gradient(180deg, #f7f3ec 0%, #f1ece3 100%);
    font-family: 'Baskerville', 'Garamond', 'Didot', 'Bodoni 72', 'Times New Roman', serif;
    color: #0e0e0c;
    line-height: 1.5;
    letter-spacing: 0.01em;
    text-rendering: optimizeLegibility;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default globalStyles;
