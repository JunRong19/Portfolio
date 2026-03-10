# Portfolio (React + Vite)

Single-page portfolio optimized for fast hiring review.

## Stack
- React + Vite
- Static data model in `src/data/content.js`
- Dark default theme with light toggle and `localStorage` persistence

## Local development
1. Install Node.js 18+.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```

## Build
```bash
npm run build
```

## Deploy to GitHub Pages
This repo is configured for `https://junrong19.github.io/Portfolio/` with `base: "/Portfolio/"`.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Deploy:
   ```bash
   npm run deploy
   ```

The deploy script builds the app and publishes `dist/` to the `gh-pages` branch.

## Content editing
Update placeholder content in:
- `src/data/content.js`

Replace placeholder images in:
- `public/placeholders/`
