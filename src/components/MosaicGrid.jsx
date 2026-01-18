import { memo, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useImageRotation from '../hooks/useImageRotation';
import { encodePath, preloadImage } from '../utils/imageHelpers';

/* ============================
   STYLES
============================ */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  grid-auto-rows: 70px;
  gap: 6px;
  width: 100%;
  margin: 0;
  max-width: none;
  padding: 6px;
  background: #f5f3ef;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));
    grid-auto-rows: 85px;
    gap: 6px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-auto-rows: 100px;
    gap: 8px;
  }
`;

const Tile = styled.div`
  position: relative;
  overflow: hidden;
  opacity: 1;
  border-radius: 0;
  background: transparent;
  transform: rotate(var(--tilt, 0deg));

  &:hover {
    transform: rotate(var(--tilt, 0deg)) scale(1.01);
    filter: brightness(1.02);
    transition: transform 1.2s ease, filter 1.2s ease;
  }

  &:focus-visible {
    outline: 2px solid rgba(30, 30, 30, 0.7);
    outline-offset: 3px;
  }
`;

const TileImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.8s ease-in-out;

  &.active.loaded {
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 30;
`;

const ModalPanel = styled.div`
  width: min(1200px, 95vw);
  max-height: 90vh;
  background: #0e0e0e;
  color: #f2f2f2;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 16px;
`;

const CloseButton = styled.button`
  border: 0;
  background: rgba(255, 255, 255, 0.08);
  color: inherit;
  padding: 6px 12px;
  border-radius: 999px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.14);
  }
`;

const ModalBody = styled.div`
  padding: 16px;
  overflow: auto;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(8, 8, 8, 0.86);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
`;

const LightboxFrame = styled.div`
  position: relative;
  width: min(1200px, 92vw);
  height: min(80vh, 900px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5);
`;

const LightboxButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 10px 14px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }
`;

const LightboxClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  border: 0;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

/* ============================
   COMPONENT
============================ */

function MosaicGrid({ items }) {
  const [activeItem, setActiveItem] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const tileTilts = [-3, 2.5, -1.5, 3.2, -2.2, 1.8, -3.4, 2.8, -1.2, 3.6];
  const openGallery = useCallback((item) => {
    setActiveItem(item);
    setLightboxIndex(null);
  }, []);

  const closeGallery = useCallback(() => {
    setActiveItem(null);
    setLightboxIndex(null);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
  }, []);

  const goPrev = useCallback(() => {
    if (!activeItem) return;
    setLightboxIndex((prev) => (prev - 1 + activeItem.images.length) % activeItem.images.length);
  }, [activeItem]);

  const goNext = useCallback(() => {
    if (!activeItem) return;
    setLightboxIndex((prev) => (prev + 1) % activeItem.images.length);
  }, [activeItem]);

  useEffect(() => {
    if (!activeItem || lightboxIndex === null) return;
    const handleKey = (event) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeItem, lightboxIndex, closeLightbox, goPrev, goNext]);

  return (
    <>
      <Grid>
      {items.map((item, index) => (
        <Tile
          key={index}
          onClick={() => openGallery(item)}
          role="button"
          tabIndex={0}
          aria-label="Open gallery"
          style={{
            gridColumn: `span ${item.w}`,
            gridRow: `span ${item.h}`,
            '--tilt': `${tileTilts[index % tileTilts.length]}deg`,
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') openGallery(item);
          }}
        >
          <RotatingImage item={item} />
        </Tile>
      ))}
      </Grid>
      {activeItem && (
        <ModalOverlay
          onClick={closeGallery}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-title"
        >
          <ModalPanel onClick={(event) => event.stopPropagation()}>
            <ModalHeader>
              <div id="gallery-title">Gallery</div>
              <CloseButton onClick={closeGallery} aria-label="Close gallery">
                Close
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <GalleryGrid>
                {activeItem.images.map((src, index) => (
                  <GalleryImage
                    key={src}
                    src={encodePath(src)}
                    alt=""
                    loading="lazy"
                    onClick={() => openLightbox(index)}
                    aria-label="Open image"
                  />
                ))}
              </GalleryGrid>
            </ModalBody>
          </ModalPanel>
        </ModalOverlay>
      )}
      {activeItem && lightboxIndex !== null && (
        <LightboxOverlay onClick={closeLightbox} role="dialog" aria-modal="true">
          <LightboxFrame onClick={(event) => event.stopPropagation()}>
            <LightboxClose onClick={closeLightbox} aria-label="Close image">
              X
            </LightboxClose>
            <LightboxButton style={{ left: 12 }} onClick={goPrev}>
              &#8249;
            </LightboxButton>
            <LightboxImage
              src={encodePath(activeItem.images[lightboxIndex])}
              alt=""
            />
            <LightboxButton style={{ right: 12 }} onClick={goNext}>
              &#8250;
            </LightboxButton>
          </LightboxFrame>
        </LightboxOverlay>
      )}
    </>
  );
}

const RotatingImage = memo(function RotatingImage({ item }) {
  const { currentImage } = useImageRotation(item.images);
  const fallback = Array.isArray(item.images) && item.images.length ? item.images[0] : '';
  const currentSrc = encodePath(currentImage || fallback);
  const [loadedSrc, setLoadedSrc] = useState('');
  const isLoaded = loadedSrc === currentSrc;

  useEffect(() => {
    preloadImage(currentSrc).then(() => setLoadedSrc(currentSrc));
  }, [currentSrc]);

  return (
      <TileImage
        src={currentSrc}
        alt=""
        className={`active${isLoaded ? ' loaded' : ''}`}
        loading="lazy"
        decoding="async"
      />
  );
});

export default MosaicGrid;
