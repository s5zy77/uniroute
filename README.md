# UniRoute

UniRoute is a mobile-first React application designed as a premium student commute experience. The repository contains a modular, production-ready codebase with Tailwind CSS styling, a reactive commute state machine, a live hex-grid discovery map, rewards management, and verified profile analytics.

## Features

- Mobile-responsive app shell with centered desktop preview and full-screen mobile layout
- Decoupled React components for clean architecture and future backend integration
- Global app context for persistent user session, wallet data, and perks ledger
- Reactive commute workflow with institutional email verification, live matching overlay, and arrival receipt
- Custom H3-style spatial hex-grid visualization and animated vehicle indicators
- Rewards tab with campus coupon ledger and claim handling
- Profile analytics dashboard showing full user identity and commute metrics

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Project structure

- `src/context/AppContext.jsx` — global state provider
- `src/components/ui/HexGrid.jsx` — animated hex-grid visualization
- `src/components/ui/QRCode.jsx` — driver verification QR canvas
- `src/components/ui/BottomNav.jsx` — persistent bottom navigation
- `src/components/tabs/CommuteTab.jsx` — commute workflow state machine
- `src/components/tabs/RewardsTab.jsx` — campus perks ledger
- `src/components/tabs/ProfileTab.jsx` — verified profile and analytics
- `src/index.jsx` — application bootstrap
- `src/index.css` — Tailwind utility setup and animation definitions

## Notes

- The app is currently set up for Vite and Tailwind CSS.
- The code uses mock state and client-side verification flows for demonstration.
- A Git repository is initialized locally; add a remote and push to GitHub to publish the repo.
