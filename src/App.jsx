import { useEffect, useMemo, useState } from 'react';
import { volumes } from './data/volumes';
import { volumeImages } from './data/images';
import { imageMeta } from './data/imageMeta';

const getRouteFromHash = () => {
  const hash = window.location.hash.replace('#', '').replace(/^\/+/, '');
  if (!hash || hash === '') return { type: 'landing' };
  if (hash === 'info') return { type: 'info' };
  if (hash.startsWith('volume')) return { type: 'volume', slug: hash };
  return { type: 'landing' };
};

const blockPattern = [
  { type: 'hero', size: 1 },
  { type: 'pair', size: 2 },
  { type: 'white', size: 2 },
  { type: 'pair', size: 2 },
  { type: 'pair', size: 2 },
  { type: 'pair', size: 2 },
  { type: 'closer', size: 1 },
];

const buildBlocks = (images, { disablePairs = false } = {}) => {
  if (disablePairs) {
    if (images.length <= 1) {
      return images.map((image) => ({ type: 'hero', images: [image] }));
    }

    const singleImages = images.slice(0, -2);
    const pairedImages = images.slice(-2);
    const blocks = singleImages.map((image, index) => ({
      type: index === 0 ? 'hero' : 'hero',
      images: [image],
    }));

    blocks.push({ type: 'pair', images: pairedImages });
    return blocks;
  }

  const blocks = [];
  let index = 0;
  let patternIndex = 0;

  while (index < images.length) {
    const pattern = blockPattern[patternIndex % blockPattern.length];
    const remaining = images.length - index;

    if (remaining < pattern.size) {
      if (remaining === 1) {
        blocks.push({ type: 'closer', images: [images[index]] });
      } else {
        blocks.push({ type: 'pair', images: images.slice(index, index + 2) });
      }
      break;
    }

    blocks.push({ type: pattern.type, images: images.slice(index, index + pattern.size) });
    index += pattern.size;
    patternIndex += 1;
  }

  return blocks;
};

const getImageMeta = (src) => imageMeta[src] || null;
const resolveImageSrc = (src) => `${import.meta.env.BASE_URL}${src.replace(/^\/+/, '')}`;

const InternalLink = ({ to, children, ...rest }) => {
  const handleClick = (event) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const href = event.currentTarget.getAttribute('href');
    if (!href) return;
    const url = new URL(href, window.location.href);
    const isHttp = url.protocol === 'http:' || url.protocol === 'https:';
    const isSameOrigin = url.origin === window.location.origin;
    const isAnchorOnly =
      url.pathname === window.location.pathname &&
      url.search === window.location.search &&
      url.hash;

    if (!isHttp || !isSameOrigin || isAnchorOnly || prefersReducedMotion) {
      return;
    }

    event.preventDefault();
    const current = window.location.hash.replace('#', '').replace(/^\/+/, '');
    const next = to.replace(/^#?\//, '');
    if (current === next) return;
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.hash = `#/${next}`;
    }, 400);
  };

  return (
    <a href={`#/${to.replace(/^#?\//, '')}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

const VolumePage = ({ images, disablePairs, volumeSlug }) => {
  const blocks = buildBlocks(images, { disablePairs });
  const isScaledImage = () => false;

  return (
    <main className="volume-content">
      {blocks.map((block, blockIndex) => {
        if (block.type === 'hero') {
          const meta = getImageMeta(block.images[0]);
          return (
            <section className="block hero" key={`hero-${blockIndex}`}>
              <div
                className="image-container"
                style={meta ? { aspectRatio: `${meta.width} / ${meta.height}` } : undefined}
              >
                <img
                  className={isScaledImage(block.images[0]) ? 'scaled-80' : undefined}
                  src={resolveImageSrc(block.images[0])}
                  alt="Hero image"
                  loading="lazy"
                  width={meta?.width}
                  height={meta?.height}
                />
              </div>
            </section>
          );
        }

        if (block.type === 'white') {
          const metaLeft = getImageMeta(block.images[0]);
          const metaRight = getImageMeta(block.images[1]);
          return (
            <section className="block white-section" key={`white-${blockIndex}`}>
              <div className="offset-grid">
                <div
                  className="image-container large"
                  style={
                    metaLeft ? { aspectRatio: `${metaLeft.width} / ${metaLeft.height}` } : undefined
                  }
                >
                  <img
                    className={isScaledImage(block.images[0]) ? 'scaled-80' : undefined}
                    src={resolveImageSrc(block.images[0])}
                    alt="Large offset"
                    loading="lazy"
                    width={metaLeft?.width}
                    height={metaLeft?.height}
                  />
                </div>
                <div
                  className="image-container small"
                  style={
                    metaRight
                      ? { aspectRatio: `${metaRight.width} / ${metaRight.height}` }
                      : undefined
                  }
                >
                  <img
                    className={isScaledImage(block.images[1]) ? 'scaled-80' : undefined}
                    src={resolveImageSrc(block.images[1])}
                    alt="Small offset"
                    loading="lazy"
                    width={metaRight?.width}
                    height={metaRight?.height}
                  />
                </div>
              </div>
              <p className="white-section-note">Kodak Portra 400 · 6x7</p>
            </section>
          );
        }

        if (block.type === 'closer') {
          const meta = getImageMeta(block.images[0]);
          return (
            <section className="block closer" key={`closer-${blockIndex}`}>
              <div
                className="image-container"
                style={meta ? { aspectRatio: `${meta.width} / ${meta.height}` } : undefined}
              >
                <img
                  className={isScaledImage(block.images[0]) ? 'scaled-80' : undefined}
                  src={resolveImageSrc(block.images[0])}
                  alt="Closer image"
                  loading="lazy"
                  width={meta?.width}
                  height={meta?.height}
                />
              </div>
            </section>
          );
        }

        return (
          <section className="block pair" key={`pair-${blockIndex}`}>
            {block.images.map((image, imageIndex) => {
              const meta = getImageMeta(image);
              return (
                <div
                  className="image-container"
                  key={`pair-${blockIndex}-${imageIndex}`}
                  style={meta ? { aspectRatio: `${meta.width} / ${meta.height}` } : undefined}
                >
                  <img
                    className={isScaledImage(image) ? 'scaled-80' : undefined}
                    src={resolveImageSrc(image)}
                    alt=""
                    loading="lazy"
                    width={meta?.width}
                    height={meta?.height}
                  />
                </div>
              );
            })}
          </section>
        );
      })}
    </main>
  );
};

function App() {
  const [route, setRoute] = useState(getRouteFromHash());
  const activeVolume = useMemo(
    () => volumes.find((volume) => volume.slug === route.slug) || volumes[0],
    [route.slug]
  );
  const activeImages = volumeImages[activeVolume.slug] || [];

  useEffect(() => {
    const onHashChange = () => {
      document.body.classList.remove('fade-out');
      setRoute(getRouteFromHash());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.body.classList.remove('landing', 'volume', 'info-page');
    if (route.type === 'landing') document.body.classList.add('landing');
    if (route.type === 'volume') document.body.classList.add('volume');
    if (route.type === 'info') document.body.classList.add('info-page');
  }, [route.type]);

  useEffect(() => {
    if (route.type === 'landing') {
      document.title = 'EXPIRED ARCHIVE';
      return;
    }
    if (route.type === 'info') {
      document.title = 'INFO · EXPIRED ARCHIVE';
      return;
    }
    document.title = `${activeVolume.title} · EXPIRED ARCHIVE`;
  }, [route.type, activeVolume.title]);

  useEffect(() => {
    if (route.type !== 'volume') return undefined;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;
    const faders = document.querySelectorAll('.block');
    const appearOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      });
    }, appearOptions);

    faders.forEach((fader) => {
      fader.classList.add('fade-in');
      observer.observe(fader);
    });

    return () => observer.disconnect();
  }, [route.type, route.slug]);

  return (
    <div>
      {route.type === 'landing' && (
        <>
          <main className="archive">
            <div className="archive-brand">
              <h1 className="archive-title">ARCHIVE FILM STUDIO</h1>
              <div className="archive-tagline">Presence over perfection</div>
            </div>
            <nav className="volume-list">
              {volumes.map((volume) => (
                <InternalLink key={volume.slug} to={volume.slug} className="volume-link">
                  {volume.title}
                </InternalLink>
              ))}
            </nav>
          </main>
          <footer className="landing-footer">
            <InternalLink to="info" className="info-link">
              INFO
            </InternalLink>
          </footer>
        </>
      )}

      {route.type === 'volume' && (
        <>
          <header className="volume-nav">
            <InternalLink to="" className="nav-back">
              ← ARCHIVE
            </InternalLink>
            <InternalLink to="info" className="nav-info">
              INFO
            </InternalLink>
          </header>
          <VolumePage
            images={activeImages}
            disablePairs={activeVolume.slug === 'volume1'}
            volumeSlug={activeVolume.slug}
          />
        </>
      )}

      {route.type === 'info' && (
        <>
          <header className="info-nav">
            <InternalLink to="">← ARCHIVE</InternalLink>
          </header>
          <main className="info-content">
            <h1>ARCHIVE FILM STUDIO</h1>
            <p>
              Archive Film Studio is a curated body of analog work exploring presence, absence, and reduction.
              Each volume is limited to three selected frames.
              <br />
              Contact: <a href="mailto:sivaklukas@yahoo.com">sivaklukas@yahoo.com</a>
            </p>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
