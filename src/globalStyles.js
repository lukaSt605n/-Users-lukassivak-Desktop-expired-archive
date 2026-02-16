import { css } from '@emotion/react';

const globalStyles = css`
  :root {
    color-scheme: light;
    --space-xxs: 0.375rem;
    --space-xs: 0.75rem;
    --space-sm: 1rem;
    --space-md: 1.5rem;
    --space-lg: 2rem;
    --space-xl: 2.5rem;
    --space-2xl: 3.5rem;
    --space-3xl: 5rem;
    --space-4xl: 8.75rem;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, opacity 0.3s ease;
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

  body.landing {
    background-color: #ffffff;
    color: #111111;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .archive-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xxs);
    margin-bottom: var(--space-2xl);
  }

  .archive {
    text-align: center;
    max-width: 600px;
    padding: var(--space-lg);
    font-family: 'Didot', 'Bodoni 72', 'Bodoni MT', 'Times New Roman', 'Times', serif;
  }

  .archive-title {
    font-weight: 500;
    font-size: 1.55rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #111111;
  }

  .archive-tagline {
    font-size: 0.95rem;
    font-weight: 300;
    text-transform: lowercase;
    color: #333333;
  }

  .volume-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .volume-link {
    text-decoration: none;
    color: #111111;
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: opacity 0.3s ease;
  }

  .volume-link:hover {
    opacity: 0.7;
  }

  .landing-footer {
    position: fixed;
    bottom: var(--space-lg);
    right: var(--space-lg);
    font-size: 0.875rem;
  }

  .info-link {
    text-decoration: none;
    color: #111111;
    opacity: 0.5;
    transition: opacity 0.2s;
  }

  .info-link:hover {
    opacity: 1;
  }

  body.volume {
    background-color: #0a0a0a;
    color: #dddddd;
  }

  .volume-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--space-lg);
    background-color: transparent;
    font-size: 0.875rem;
    z-index: 10;
  }

  .volume-nav a {
    text-decoration: none;
    color: #aaaaaa;
    transition: color 0.2s;
  }

  .volume-nav a:hover {
    color: #ffffff;
  }

  .volume-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: calc(64px + var(--space-lg)) var(--space-xl) var(--space-2xl);
  }

  .block {
    margin: var(--space-4xl) 0;
  }

  .block:last-child {
    margin-bottom: 0;
  }

  .image-container {
    width: 100%;
    background: #0f0f0f;
    overflow: hidden;
  }

  .hero .image-container img {
    width: 100%;
    height: auto;
    max-height: 92vh;
    object-fit: contain;
    display: block;
  }

  .pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2xl);
  }

  .pair .image-container img {
    width: 100%;
    height: auto;
    display: block;
  }

  .white-section {
    background-color: #ffffff;
    color: #111111;
    padding: var(--space-2xl) var(--space-lg);
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
  }

  .offset-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--space-xl);
    align-items: start;
  }

  .offset-grid .image-container img {
    width: 100%;
    height: auto;
    display: block;
  }

  .white-section-note {
    max-width: 1200px;
    margin: var(--space-md) auto 0;
    font-size: 0.9rem;
    letter-spacing: 0.02em;
    color: #111111;
  }

  .closer .image-container img {
    width: 100%;
    height: auto;
    max-height: 80vh;
    object-fit: contain;
    display: block;
  }

  body.info-page {
    background-color: #ffffff;
    color: #111111;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .info-nav {
    padding: var(--space-lg) var(--space-lg) 0;
  }

  .info-nav a {
    text-decoration: none;
    color: #111111;
    opacity: 0.6;
    font-size: 0.875rem;
    transition: opacity 0.2s;
  }

  .info-nav a:hover {
    opacity: 1;
  }

  .info-content {
    max-width: 600px;
    margin: auto;
    padding: var(--space-lg);
    font-family: 'Didot', 'Bodoni 72', 'Bodoni MT', 'Times New Roman', 'Times', serif;
  }

  .info-content h1 {
    font-weight: 500;
    font-size: 1.55rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: var(--space-lg);
  }

  .info-content p {
    font-size: 0.98rem;
    font-weight: 300;
    line-height: 1.6;
    color: #333;
  }

  .info-content a {
    color: #111111;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  @media (max-width: 700px) {
    :root {
      --space-2xl: 2.5rem;
      --space-3xl: 3.5rem;
      --space-4xl: 6.25rem;
    }

    .volume-content {
      padding: calc(64px + var(--space-md)) var(--space-sm) var(--space-xl);
    }

    .pair {
      grid-template-columns: 1fr;
      gap: var(--space-lg);
    }

    .white-section {
      padding: var(--space-xl) var(--space-sm);
    }

    .offset-grid {
      grid-template-columns: 1fr;
      gap: var(--space-md);
    }

    .block {
      margin: var(--space-3xl) 0;
    }

    .volume-nav {
      padding: 0 var(--space-sm);
    }
  }

  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  body.fade-out {
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    body {
      transition: none;
    }

    .fade-in {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
`;

export default globalStyles;
