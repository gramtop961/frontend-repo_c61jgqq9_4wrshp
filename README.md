Stranger — Minimal Social App (Frontend)

Overview
- Single-page app focused on speed, clarity, and modern mobile-first UX.
- Built with React + Vite + Tailwind. Routes: Feed, Explore, Reels, Create, Stories, Notifications, Profile, DM, Auth, Settings.
- API contract: uses VITE_BACKEND_URL with REST + optional WebSocket connections.

Key Features
- Bottom tab bar on mobile; top app bar with theme toggle.
- Feed with infinite scroll, double-tap like, skeleton loaders, optimistic counters.
- Explore masonry grid with search field and quick hover interactions (basic).
- Reels full-screen player (tap to pause, next control), ready for swipe gesture.
- Create composer with drag & drop, caption, and progress bar (demo).
- Stories tray with animated viewer overlay and progress bars.
- DMs: conversation list and chat pane with smooth autoscroll.
- Notifications: grouped sections with simple actions.
- Profile: header with stats, grid posts, lazy-ready images.
- Accessibility: focus styles, ARIA labels on key buttons.
- Theming: light/dark with local persistence.

Architecture
- App shell wraps all routes and provides mobile tabs and responsive layout.
- Pages live under pages/, UI primitives under components/ui/.
- API helper abstracts fetch with retries. All endpoints read from VITE_BACKEND_URL.

Run Locally
- npm install
- npm run dev
- Set VITE_BACKEND_URL in .env to your backend.

Next Steps (Backend integration)
- Wire endpoints: /posts, /explore, /stories, /users/:username, /conversations, /search.
- Implement POSTs for likes, comments, messages; replace demo data with responses.
- Optional: WebSocket for typing indicators and live likes.
