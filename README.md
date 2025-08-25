# 🏆 Sports Leagues – Frontend Assignment

A small, production-ready SPA that lists sports leagues from [TheSportsDB](https://www.thesportsdb.com/free_sports_api) API, featuring text search, sport-type filtering, and a click-to-view season badge. Built with a component-based architecture, responsive UI, and client-side caching to avoid repeat network calls.

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Data Fetching:** TanStack Query (React Query)
- **Styling:** TailwindCSS (or minimal CSS)
- **Containerization:** Docker

---

## ✨ Features

- **Leagues Directory:**  
  Fetches and displays all leagues (`strLeague`, `strSport`, `strLeagueAlternate`).
- **Search by Name/Alternate:**  
  Debounced text search over league name and alternates.
- **Filter by Sport:**  
  Dropdown or pill navigation (Soccer, Basketball, etc.). Works in combination with search.
- **Badge on Click:**  
  Clicking a league fetches a season badge and shows it in a lightweight dialog.
- **Caching:**  
  Badge responses and the leagues list are cached to prevent duplicate calls.
- **Loading & Error States:**  
  Friendly feedback for slow networks or API errors.
- **Responsive UI:**  
  Works nicely on mobile and desktop.
- **Zero-config Run:**  
  `npm install && npm run dev` or `docker compose up --build`.

---

- **State & Caching:**  
  TanStack Query with sensible `staleTime`.
- **Filtering:**  
  Pure client-side filtering on the fetched list (search + sport).
- **Separation of Concerns:**  
  UI (components) vs. data (hooks/lib).

---

## 🔗 APIs Used

- **All Leagues:**  
  [`/all_leagues.php`](https://www.thesportsdb.com/api/v1/json/3/all_leagues.php)
- **Season Badge (by league id):**  
  `/search_all_seasons.php?badge=1&id=<LEAGUE_ID>`

> The app only calls public endpoints; no keys or secrets are required.

---

## 🚀 Getting Started

### Option A: Run with Node

**Requirements:**
- Node 18+ and npm (or pnpm/yarn)

**Install & Run:**
```sh
npm install
npm run dev
```
Visit the printed URL (typically http://localhost:5173).

**Build & Preview:**
```sh
npm run build
npm run preview
```
Visit the printed URL (typically http://localhost:4173).
---

### Option B: Run with Docker

**Requirements:**
- Docker & Docker Compose

**Build & Start:**
```sh
docker compose up --build
```
Then open [http://localhost:5173](http://localhost:5174).

---

## ⚙️ Configuration

- **Change ports:**
  - Vite dev port: update `vite.config.ts` (e.g., `server: { port: 5174 }`)
  - Docker port: update the `ports:` mapping in `docker-compose.yml`

---

## 🧠 Caching Strategy

- **Leagues list:**  
  Cached for the session (e.g., `staleTime: 5 minutes`) to avoid re-fetch on navigation.
- **Badge lookups:**  
  Cached per `leagueId`. Subsequent clicks reuse cached data.

**Query Keys:**
- `['leagues']` for all leagues
- `['badge', leagueId]` for badge per league

---


## 🧑‍🎨 UI/UX Notes

- **Cards show:**
  - Title: `strLeague`
  - Sport: `strSport`
  - Alternate: `strLeagueAlternate` or “No alternate name”
- **Accessibility:**
  - Search input focused on load
- **Responsive:**
  - Mobile: 1‑column stack; desktop: 2–4 column grid.
- **Interactions:**
  - Light hover state & clear hit‑area for each league card.

---

## 🧩 Design Decisions

- **Vite + React + TS:** Fast DX, type safety, modern build.
- **TanStack Query:** Removes boilerplate for loading/error/caching and keeps network calls minimal.
- **Client‑side filtering:** Data set is small; no server needed.
- **Docker:** Ensures reviewers can run the app in one command.

---

## 🧭 Known Limitations / Future Enhancements

- Pagination / Virtualization: Not necessary for this dataset but trivial to add with react-virtual.
- Persisted cache: Could use QueryClientPersister (e.g., localStorage) to survive reloads.
- Unit tests: Add coverage for hooks and badge dialog states.
- Skeletons: Replace spinners with skeleton placeholders for nicer perceived performance.

---

## 📈 Performance & Accessibility

- Debounced search (e.g., 250ms) to avoid frequent re-renders.
- `loading="lazy"` for badge images.
- Semantic HTML for headings, lists, and buttons/links.
- Sufficient color contrast and focus outlines for keyboard users.

---

## 🧰 AI & Tooling Disclosure

I used AI to help with:
- Drafting component structure and README content
- Generating types and quick fetch wrappers

All architectural and implementation decisions were reviewed and adjusted by me.
