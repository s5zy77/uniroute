# UniRoute

**UniRoute** is a mobile-first React application built for student commute matching, campus rewards, and verified identity analytics.

## Project summary

| Area | Details |
| --- | --- |
| Platform | React + Vite + Tailwind CSS |
| Deployment target | GitHub Pages (`/uniroute/`) |
| Key experience | Institutional ride matching, live spatial discovery, arrival receipt, campus perks |
| Styled for | Mobile-first web with desktop-centered premium frame |

## Features

| Feature | What it does |
| --- | --- |
| Login & identity verification | Validates institutional email domains `.edu` / `.ac.in` with mock JWT workflow |
| Live hub discovery | Hub selector, destination lock, animated H3-style map, nearby vehicle indicators |
| Ride matching | Full queue overlay, matched verified peers, dynamic fare split calculator |
| Rewards ledger | Campus coupons, claim status, highlighted reward triggers |
| Profile analytics | Wallet balance, pooled rides, cash saved, carbon offset metrics |

## Getting started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

### Build and deploy to GitHub Pages

```bash
npm run deploy
```

Then commit the generated `docs/` folder and push to `main`, or configure GitHub Pages to serve from the `docs` folder in repo settings.

## Deployment notes

- `vite.config.js` is updated to use `base: "/uniroute/"`.
- Build output is written to the `docs/` directory for GitHub Pages.
- GitHub Pages source should be set to the `docs/` folder on `main`.

## Project structure

| File | Purpose |
| --- | --- |
| `src/context/AppContext.jsx` | Global state provider and persistence layer |
| `src/components/ui/HexGrid.jsx` | Animated H3 spatial grid component |
| `src/components/ui/QRCode.jsx` | QR ticket rendering component |
| `src/components/ui/BottomNav.jsx` | Sticky bottom navigation bar |
| `src/components/tabs/CommuteTab.jsx` | 4-stage commute workflow state machine |
| `src/components/tabs/RewardsTab.jsx` | Campus perks and coupon ledger |
| `src/components/tabs/ProfileTab.jsx` | Verified profile vault and analytics |
| `src/index.jsx` | React bootstrap entry point |
| `src/index.css` | Tailwind setup and custom animations |

## Notes

- The UI and workflow are client-driven and ready for integration with backend services.
- Use the `deploy` script to generate static assets compatible with GitHub Pages.
