# APTITUDE — Secure P2P Crypto Trading Platform

A modern, full-featured React landing page for the APTITUDE Enterprises Trading Tech platform.

## Features

- 🌐 Animated particle/network background canvas
- 📈 Live-updating crypto price ticker
- 📊 Real-time market prices table with simulated live data
- 📱 Fully responsive with mobile hamburger menu
- 🎨 Dark-themed UI with cyan/emerald glow aesthetics
- ✅ FAQ accordion, testimonials, features, how-it-works sections
- ⚡ Built with Vite for fast dev and optimised production builds

## Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool & dev server
- **Google Fonts** — Syne + Exo 2 typefaces (loaded via CSS import in component)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

### Preview Production Build Locally

```bash
npm run preview
```

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Vite and sets the correct build command (`npm run build`) and output directory (`dist`).

### Option 2: GitHub + Vercel Dashboard

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import the repository
4. Vercel will auto-detect Vite — click **Deploy**

The `vercel.json` included in this project configures SPA routing so all paths serve `index.html`.

## Project Structure

```
aptitude-trading/
├── public/
│   └── favicon.svg          # SVG favicon with APTITUDE "A" logo
├── src/
│   ├── main.jsx             # React DOM entry point
│   └── App.jsx              # Main component (all sections + data)
├── index.html               # HTML shell
├── vite.config.js           # Vite configuration
├── vercel.json              # Vercel SPA routing config
├── package.json             # Dependencies & scripts
├── .gitignore
└── README.md
```

## Customisation

All copy, data, and colour constants are defined at the top of `src/App.jsx`:

- `COLORS` — brand colour palette
- `NAV_LINKS` — navigation items
- `STATS` — platform statistics
- `FEATURES` — feature cards
- `HOW_IT_WORKS` — step cards
- `COINS` — cryptocurrency data (prices simulated live)
- `WHY_US` — trust/value propositions
- `TESTIMONIALS` — user reviews
- `FAQS` — accordion FAQ items
