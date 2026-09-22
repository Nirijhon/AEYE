# A•EYE Systems Technology Inc. — Website Prototype

A professional, responsive website prototype for a security & technology services
company: **CCTV • Security Systems • Networking** (Installation • Repair •
Maintenance — Home & Business).
Built with **React 18 + Vite + React Router**, using a custom lightweight design
system (no UI framework dependency).

> **Important:** this is a **frontend prototype**. It ships **dual-mode**: with
> no configuration it runs entirely on demo data in your own browser
> (localStorage); add the `VITE_FIREBASE_*` env vars and the same screens read
> and write **Firestore** instead. Every demo feature is clearly labeled in the
> UI. See [Firebase backend](#firebase-backend-already-wired).

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
- Every service is **dual-mode**. With no Firebase config it runs the
  localStorage demo store (below); with the `VITE_FIREBASE_*` env vars set it
  talks to Firestore instead. The function signatures the pages use never
  change — see `services/firebase.js`.

```js
// To connect a real backend later:
//   1. Keep the same function signatures used by the pages.
//   2. Replace each mock implementation with fetch('/api/...').
//   3. Delete or bypass the localStorage demo store.
```

- `src/data/*.js` holds realistic sample content (10 job openings, 9 services,
  dashboard records) labeled as demo data.
- `src/data/statuses.js` is the **single source of truth for statuses** (request
  pipeline, application stages, badge colors). The public tracker, client
  dashboard and admin console all read it — these exact strings become the
  database enum values when a backend is connected.

## Firebase backend (already wired)

The Firebase SDK is installed and every service already has a Firestore branch.
To go live you only need a project + the env vars:

```bash
cp .env.example .env      # then paste the values from the Firebase console
npm run dev               # the console now reads/writes Firestore
```

Env vars (Firebase console → Project settings → Your apps → SDK setup):

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

**Set up checklist**

1. **Authentication** → enable *Email/Password*, then add one staff user
   (`admin@aeye.local` + a password). That account signs into `admin.html`.
2. **Firestore Database** → create it in production mode.
3. **Storage** → enable it (résumé uploads go to `resumes/<APP-ref>/<file>`).
4. **Rules** → `firestore.rules` is included; deploy with
   `firebase deploy --only firestore:rules` (or paste it into the console).
   It keeps public form submission + the `/track` reference lookup open and
   requires a signed-in staff user for everything else.
5. **Seed the sample rows** → sign in to the admin console and press
   **Seed sample data** (top right). It writes the 6 sample requests, 6 sample
   applications and publishes the first 4 job posts, so you can explore the
   whole workflow immediately. Use **Delete all data** to empty the project.

**Firestore collections**

| Collection | Written by | Notes |
| --- | --- | --- |
| `requests` | Request Personnel form, admin console | id = `RQ-####` reference code; `status` uses the `statuses.js` pipeline, `Received` is normalized to `New` |
| `applications` | Apply form, admin console | id = `APP-#####`; résumé uploaded to Cloud Storage, URL stored as `resumeUrl` |
| `jobPosts` | admin console | per-post override (`postStatus`, `deleted`); the base 10 jobs come from `src/data/jobs.js` |
| `settings` | admin console | `settings/careers` → `{ enabled }` master switch for the Careers page |
| `audit` | admin console | append-only: entity, record id, from → to, actor, timestamp |
| `employees`, `deployments` | *not yet* | still seeded samples from `src/data/admin.js`; rules are already locked down for a later move |

**Auth is real in Firebase mode.** The console swaps the demo passcode gate for
a Firebase `signInWithEmailAndPassword` form with session restore, sign-out and
inline error handling, and the audit trail records the signed-in admin.

## Admin console (`admin.html`)

A staff-facing operations console. With no Firebase config it runs as a UI demo
(sign-in passcode: `aeye-admin`); with Firebase it uses real email/password
sign-in and live Firestore data.

- **Overview** — KPI cards, applications chart, action queue.
- **Requests** — pipeline for every "Request Personnel" submission
  (`New → Under Review → Quoted → Assigned → On Site → Completed`), with
  officer assignment, search, filters and an audit history per record.
- **Applications** — applicant review (`Submitted → Under Review → Interview →
  Background check → Hired / Not Selected`), forward-only advance + reject.
- **Deployments** — who is on site, scheduled shifts, staffing gaps.
- **Job Posts** — publish/draft/close job posts. Only **Published** posts
  appear on the public Careers page; with none published it shows "coming soon".

Admin changes persist to localStorage and are reflected live on the client
dashboard and the applicant status tracker. "Delete all data" (top of the
admin console) permanently wipes every record and hides the sample rows —
stat cards, charts, notifications, deployments and the job/employee tables all
start completely empty and stay that way across reloads instead of the samples
being re-added. "Restore demo data" brings them back (in Firebase mode the same
button is labeled "Seed sample data" and writes the sample records into
Firestore).

The console can also **Sign out**, which clears the console session.

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
