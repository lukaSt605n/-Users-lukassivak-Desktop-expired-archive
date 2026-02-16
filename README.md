
# EXPIRED ARCHIVE

A minimal, quiet-luxury photo archive built with React + Vite.
Designed as a portfolio-style archive of analog volumes with a calm, consistent rhythm.
Spacing refined, visual rhythm improved, and the system feel cohesive across pages.
Single-page app with hash-based routes for Volumes and an Info page.

## Tech
- React
- Vite
- Emotion global styles in `src/globalStyles.js`

## Getting Started

1. Install
```bash
npm install
```

2. Run locally

```bash
npm run dev
```

Open the local URL Vite prints in the terminal.

3. Build

```bash
npm run build
```

4. Preview build

```bash
npm run preview
```

## Routes

This app uses hash routing (works well on static hosting):

* `#/` - Landing (Archive)
* `#/volume1` ... `#/volumeN` - Volume pages
* `#/info` - Info page

## Project Structure (typical)

```
src/
  App.jsx
  main.jsx
  globalStyles.js
  theme/
    theme.js
public/
  img/
    Gallery_film35mm/
      Series01/
      Series02/
      ...
```

## Adding a New Volume

1. Create a new image folder:

```
public/img/Gallery_film35mm/SeriesXX/
```

2. Add your selected images (keep filenames simple).
   Example:

```
01.jpg
02.jpg
03.jpg
```

3. Register the volume in your data/config (wherever you store volume definitions).
   Typical fields:

* `title` (e.g. `VOLUME XII`)
* `slug` or `route` (e.g. `volume12`)
* `images` array (paths to `public/` assets)
* optional `layout` settings (hero, pair, etc.)

For this project, update these files:
* `src/data/volumes.js`
* `src/data/images.js`
* `src/data/imageMeta.js` (optional, for correct aspect ratios)

4. Confirm it renders at:

```
#/volume12
```

## Image Guidelines (recommended)

To keep the site consistent:

* Use 3 hero-level images per volume (strongest set only)
* Keep a clear hierarchy:

  * 1 hero image
  * 1 secondary image
  * 1 “breath” image (space/atmosphere)
* Resize large images before committing (faster load)

## Deployment

This project is static-friendly.

### Netlify

* Build command: `npm run build`
* Publish directory: `dist`

### GitHub Pages (optional)

Use hash routing (already compatible), then deploy `dist`.

If you deploy under a subpath (not the domain root), set Vite `base` in `vite.config.js`.

## Notes

* If you move image folders, update the paths in your volume data.
* If something doesn’t show: hard refresh + check DevTools Console + Network tab.

## License

Personal project. All photos belong to the author.
