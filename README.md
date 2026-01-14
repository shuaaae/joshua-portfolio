# Joshua Godalle - Portfolio

A modern portfolio website built with React, TypeScript, and Vite, featuring an AI-powered chatbot using Google's Gemini API.

## Features

# Joshua Godalle - Portfolio

A modern portfolio website built with React, TypeScript, and Vite. The site includes an AI-powered chatbot and showcases projects, experience, and certifications.

## Features

- 🎨 Modern, responsive design with dark mode support
- 💬 AI-powered chatbot (requires Google Gemini API key)
- 📱 Mobile-first responsive layout
- ⚡ Fast dev experience with Vite

## Quick Start

Install dependencies (npm, pnpm or yarn):

```bash
pnpm install
# or
npm install
```

Run dev server:

```bash
pnpm run dev
# or
npm run dev
```

Build for production:

```bash
pnpm run build
# or
npm run build
```

Preview the production build locally:

```bash
pnpm run preview
# or
npm run preview
```

## Environment

Create a `.env` file in the project root and add your Gemini key (if you plan to enable the chatbot):

```
VITE_GEMINI_API_KEY=your_api_key_here
```

Restart the dev server after editing `.env`.

## Assets & Static Files

- Files placed in `public/` are served from the web root. Example: a file at `public/joshua-icon.jpeg` will be available at `/joshua-icon.jpeg` in the browser.
- Recommended: put images you import in code into `src/assets/` so the bundler can optimize them (hashing, caching).

Examples:

- Importable (preferred):

```ts
import joshuaIcon from './assets/joshua-icon.jpeg'
<img src={joshuaIcon} alt="Joshua" />
```

- Public folder (no import, served at root):

```html
<img src="/joshua-icon.jpeg" alt="Joshua" />
```

Notes:
- Avoid spaces in filenames (rename `Joshua Icon.jpeg` → `joshua-icon.jpeg`) to prevent URL encoding issues.
- Use `src/assets` when you want the bundler to handle images and imports.

## Profile Image Behavior

- Default: `src/assets/Profile.jpg` (profile photo).
- On hover: shows `src/assets/shy-type.png`.
- If you click the hovered image, it temporarily shows the profile icon (`joshua-icon.jpeg`) while hovered; on mouseleave it reverts to the default `Profile.jpg`.

If you want to change the icon file, put the image in `src/assets/` and update the import in `src/App.tsx`:

```ts
import joshuaIcon from './assets/joshua-icon.jpeg'
```

## Chatbot Setup / Troubleshooting

1. Get your Gemini API key from Google AI Studio
2. Add it to `.env` as `VITE_GEMINI_API_KEY`
3. Restart the dev server

If you get errors related to models or permissions, check the browser console and verify your API key and model availability in your region.

## Tech Stack

- React
- TypeScript
- Vite
- React Icons

---

If you'd like, I can rename and move `Joshua Icon.jpeg` into `src/assets/` and update `src/App.tsx` imports for you.
