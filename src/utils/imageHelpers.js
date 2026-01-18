export const encodePath = (src) => {
  if (typeof src !== 'string') return src;
  const parts = src.split('/');
  return parts
    .map((part, index) => (index === 0 && part === '' ? '' : encodeURIComponent(part)))
    .join('/');
};

export const preloadImage = (src) =>
  new Promise((resolve) => {
    if (!src) {
      resolve();
      return;
    }
    const img = new Image();
    img.src = src;
    if (img.complete) {
      resolve();
      return;
    }
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });
