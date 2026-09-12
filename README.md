# A•EYE Systems Technology Inc. — Website Prototype

A professional, responsive website prototype for a security & technology services
company: **CCTV • Security Systems • Networking** (Installation • Repair •
Maintenance — Home & Business).
Built with **React 18 + Vite + React Router**, using a custom lightweight design
system (no UI framework dependency).

> **Important:** this is a **frontend prototype**. There is **no backend or database
> connected**. All listings, records and submissions are demo data, and anything
> you submit is stored only in your own browser (localStorage). Every demo feature
> is clearly labeled in the UI.

---

## Quick start

```bash
npm install        # once
npm run dev        # start dev server → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
npm test           # headless render + user-flow tests (jsdom)
```

## The two visitor journeys

**Client**
`Home → Learn About Services → Request Personnel (3-step form) → Submit
Requirements → Success screen with reference code → Agency contacts client
(demo). Submitted requests appear in the demo Dashboard.`

**Applicant**
`Home → Careers (search/filter 10 sample jobs) → Job Detail → Apply
(3-step form) → Success screen with APP reference code → Track Application
(live status tracker).`

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, credentials, services, both flows, testimonials, CTA |
| `/services` | Full service catalog + service standards |
| `/about` | Story, stats, values |
| `/careers` | Job list with search, category/location/type filters |
| `/careers/:id` | Job detail with sticky summary + apply CTA |
| `/apply/:jobId` | 3-step application form with validation & résumé upload (demo) |
| `/track` | Application status tracker (own reference or demo reference) |
| `/request-personnel` | 3-step client request form |
| `/dashboard` | Client portal demo: stat cards, activity chart, requests table + detail modal, notifications, documents |
| `*` | 404 |

## Project structure

```
src/
├─ components/
│  ├─ layout/     Navbar, Footer, Shell (PageHeader, ScrollTop)
│  ├─ ui/         Button, Card, Badge, Icon, Modal, Toast (+ DemoNotice),
│  │              Spinner, States (Empty/Error), Stepper, SectionHeading
│  ├─ forms/      Fields (Field, Input, Select, Textarea, Check/RadioRow)
│  ├─ jobs/       JobCard
│  └─ dashboard/  StatCard, DataTable
├─ pages/         one folder or file per route (see table above)
├─ data/          demo data: services, jobs, testimonials, dashboard
├─ services/      mock API layer (api.js, requestsService, applicationsService)
├─ hooks/         useRevealOnScroll, useLockBodyScroll
├─ utils/         validate.js (shared form validation rules)
└─ styles/        tokens → base → components → layout → pages (CSS index)
```

## Frontend ↔ backend separation

- Pages **only** call `src/services/*.js` — they never touch `localStorage`,
  `fetch` or demo data directly.
- `services/api.js` simulates network latency and persistence and is the single
  place marked for replacement:

```js
// To connect a real backend later:
//   1. Keep the same function signatures used by the pages.
//   2. Replace each mock implementation with fetch('/api/...').
//   3. Delete or bypass the localStorage demo store.
```

- `src/data/*.js` holds realistic sample content (10 job openings, 9 services,
  dashboard records) labeled as demo data.

## Quality checklist

- **Responsive** — desktop, laptop, tablet and phone layouts reorganize rather
  than shrink: mobile hamburger navigation, collapsible career filters, stacked
  forms/hero/footer, horizontally scrollable tables.
- **Form validation** — required fields, email/phone formats, date rules,
  file type/size checks, consent gates; inline `role="alert"` errors.
- **States** — loading (spinners/skeleton waits), empty (jobs, tables, tracker
  not-found), error (simulated server error with retry), button
  loading/disabled states.
- **Accessibility** — skip link, semantic landmarks, labelled controls,
  `aria-invalid`/`aria-describedby` on fields, focus-visible rings, modal focus
  trap + ESC + scroll lock, `prefers-reduced-motion` support.
- **Consistency** — design tokens (colors, spacing, radii, shadows, type scale)
  in `styles/tokens.css`, shared typography and section rhythm.

## Tests (headless, no browser needed)

- `npm run test:render` — mounts all 10 routes in jsdom and fails on runtime
  errors or empty output.
- `npm run test:flows` — drives the applicant flow (validation → 3 steps →
  submit → reference code → storage), the client request flow, and the demo
  application tracker.

## Design system

Cyber dark theme: near-black navy (`#050814`) with cyan (`#00F2FE`), blue
(`#4FACFE`), purple (`#9D4EDD`) and magenta (`#F72585`) neon accents. Orbitron
for display headings, Rajdhani for nav/labels/buttons, Inter for body text.
All colors, spacing, fonts and glow shadows come from CSS custom properties in
`src/styles/tokens.css`.

## Deployment (GitHub Pages)

The site is pre-configured for static hosting on GitHub Pages:

- `vite.config.js` uses `base: './'` — relative asset paths, works under any
  project path (`/<repo>/`) without configuration.
- Routing uses `HashRouter` — no server rewrites needed; links stay shareable
  and survive page refreshes.
- `public/404.html` is a fallback that sends stray paths back to the app root.
- `.github/workflows/deploy.yml` runs tests, builds, and deploys on every push
  to `main`/`master` (manual runs supported via `workflow_dispatch`).

**To go live:**

1. Push this folder to a GitHub repository.
2. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main` (or run the workflow manually: **Actions → Deploy to GitHub
   Pages → Run workflow**).
4. The site is served at `https://<user>.github.io/<repo>/`.
