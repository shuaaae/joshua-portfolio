# Joshua Godalle - Portfolio

A modern portfolio website built with React, TypeScript, and Vite, featuring an AI-powered chatbot using Google's Gemini API.

## Features

- 🎨 Modern, responsive design with dark mode support
- 💬 AI-powered chatbot using Gemini free API
- 📱 Fully responsive layout
- ⚡ Fast and optimized with Vite
- 🎯 Showcase of projects, experience, and certifications

## Chatbot Setup

The portfolio includes an AI chatbot powered by Google's Gemini API. To enable it:

1. Get your free Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the root directory
3. Add your API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. Restart your development server

The chatbot will help answer questions about Joshua's work, experience, and projects.

### Troubleshooting

If you encounter a "model not found" error (404):

1. **Verify your API key**: Make sure your API key is valid and active at [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Check model availability**: Some models may not be available in all regions. The chatbot will automatically try multiple models:
   - `gemini-1.5-flash` (recommended for free tier)
   - `gemini-1.5-pro`
   - `gemini-pro`
3. **Regional restrictions**: The free tier may not be available in all regions. If you're in a restricted region, you may need to enable billing on your Google Cloud project
4. **API key permissions**: Ensure your API key has the necessary permissions for the Gemini API
5. **Check console**: Open browser developer tools (F12) and check the console for detailed error messages

The chatbot will automatically try different models if one fails, so it should work with most valid API keys.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Tech Stack

- React 19
- TypeScript
- Vite
- Google Gemini AI
- React Icons

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
