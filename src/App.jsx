import { useEffect, useMemo, useState } from 'react';

const volumes = [
  { slug: 'volume1', title: 'VOLUME I — 2026' },
  { slug: 'volume2', title: 'VOLUME II — 2027' },
  { slug: 'volume3', title: 'VOLUME III — 2028' },
  { slug: 'volume4', title: 'VOLUME IV — 2029' },
  { slug: 'volume5', title: 'VOLUME V — 2030' },
];

const defaultImages = [
  '/img/Galery%20film35mm/Series2/IMG_9360.JPG',
  '/img/Galery%20film35mm/Series2/IMG_9361.JPG',
  '/img/Galery%20film35mm/Series2/IMG_9363.JPG',
  '/img/Galery%20film35mm/Series2/IMG_9364.JPG',
  '/img/Galery%20film35mm/Series2/IMG_9365.JPG',
  '/img/Galery%20film35mm/Series2/IMG_9367.JPG',
  '/img/Galery%20film35mm/Series2/IMG_9368.JPG',
  '/img/Galery%20film35mm/Series2/IMG_9371.JPG',
  '/img/Galery%20film35mm/Series2/IMG_9374.JPG',
  '/img/Galery%20film35mm/Series2/IMG_9375.JPG',
  '/img/Galery%20film35mm/Series2/IMG_9376.JPG',
  '/img/Galery%20film35mm/Series2/IMG_9408.JPG',
];

const getRouteFromHash = () => {
  const hash = window.location.hash.replace('#', '').replace(/^\/+/, '');
  if (!hash || hash === '') return { type: 'landing' };
  if (hash === 'info') return { type: 'info' };
  if (hash.startsWith('volume')) return { type: 'volume', slug: hash };
  return { type: 'landing' };
};

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

const VolumePage = () => (
  <main className="volume-content">
    <section className="block hero">
      <div className="image-container">
        <img src={defaultImages[0]} alt="Hero image" />
      </div>
    </section>

    <section className="block pair">
      <div className="image-container">
        <img src={defaultImages[1]} alt="Pair left" />
      </div>
      <div className="image-container">
        <img src={defaultImages[2]} alt="Pair right" />
      </div>
    </section>

    <section className="block white-section">
      <div className="offset-grid">
        <div className="image-container large">
          <img src={defaultImages[3]} alt="Large offset" />
        </div>
        <div className="image-container small">
          <img src={defaultImages[4]} alt="Small offset" />
        </div>
      </div>
      <p className="white-section-note">Kodak Portra 400 · 6x7</p>
    </section>

    <section className="block pair">
      <div className="image-container">
        <img src={defaultImages[5]} alt="Pair left" />
      </div>
      <div className="image-container">
        <img src={defaultImages[6]} alt="Pair right" />
      </div>
    </section>

    <section className="block pair">
      <div className="image-container">
        <img src={defaultImages[7]} alt="Pair left" />
      </div>
      <div className="image-container">
        <img src={defaultImages[8]} alt="Pair right" />
      </div>
    </section>

    <section className="block pair">
      <div className="image-container">
        <img src={defaultImages[9]} alt="Pair left" />
      </div>
      <div className="image-container">
        <img src={defaultImages[10]} alt="Pair right" />
      </div>
    </section>

    <section className="block closer">
      <div className="image-container">
        <img src={defaultImages[11]} alt="Closer image" />
      </div>
    </section>
  </main>
);

function App() {
  const [route, setRoute] = useState(getRouteFromHash());
  const activeVolume = useMemo(
    () => volumes.find((volume) => volume.slug === route.slug) || volumes[0],
    [route.slug]
  );

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
            <h1 className="archive-title">EXPIRED ARCHIVE</h1>
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
          <VolumePage />
        </>
      )}

      {route.type === 'info' && (
        <>
          <header className="info-nav">
            <InternalLink to="">← ARCHIVE</InternalLink>
          </header>
          <main className="info-content">
            <h1>Info</h1>
            <p>
              Analog film photographer working with medium format.
              <br />
              Equipment: Mamiya RB67, Leica M6.
              <br />
              Contact:{' '}
              <a href="mailto:hello@expiredarchive.com">hello@expiredarchive.com</a>
            </p>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
