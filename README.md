# JSON Studio

A fast, private, browser-only studio for working with JSON. **Parse**, **stringify**, and **recursively unwrap** deeply-nested stringified JSON — with live validation, descriptive errors, and side-by-side editors. No server, no uploads, no tracking: your data never leaves your machine.

![CI & Deploy](https://github.com/MinaMalak-cmd/json-tool/actions/workflows/deploy.yml/badge.svg)

## Features

- **Parse JSON** — pretty-print and validate any JSON document.
- **Stringify JSON** — convert a document into its escaped string literal form.
- **Deep unwrap** — recursively detects string values that are themselves
  stringified JSON objects/arrays and inlines them. IDs and numeric/boolean
  strings are left untouched (objects & arrays only).
- **Extract any property by path** — a **searchable** selector lists every
  nested path in the document (e.g. `data.getTitleV2.state`). Type to filter,
  pick one, and only that value is extracted and unwrapped — perfect for huge
  API responses with a deeply nested stringified blob.
- **Parallel editors** — an editable input editor and a read-only output
  editor, each collapsible/expandable.
- **Live validation** — every keystroke is validated; invalid JSON yields a
  descriptive, line/column-aware error message.
- **Upload or paste** — drop in a `.json` file or paste directly.
- **Copy & download** — copy input/output from each pane's header, or download
  the output as a file.
- **Polished, accessible UI** — dark theme, keyboard- and screen-reader-friendly.
- **Private by design** — 100% client-side; your JSON never leaves the browser.

## Tech stack

- **React 19** + **TypeScript** (strict)
- **Vite** build & dev server
- **MUI** for the component system & theming
- **CodeMirror 6** for the JSON editors
- **Vitest** + **Testing Library** for unit & component tests

## Getting started

```bash
npm install
npm run dev          # start the dev server
```

### Scripts

| Script                  | Description                                  |
| ----------------------- | -------------------------------------------- |
| `npm run dev`           | Start Vite dev server                        |
| `npm run build`         | Typecheck + production build to `dist/`      |
| `npm run preview`       | Preview the production build locally         |
| `npm run typecheck`     | Type-check without emitting                  |
| `npm run test`          | Run tests in watch mode                      |
| `npm run test:run`      | Run the full test suite once (used in CI)    |
| `npm run test:coverage` | Run tests with a coverage report             |

## Architecture

The codebase separates **pure logic** from **UI** so the engine can be tested
in isolation and reused anywhere.

```
src/
├─ core/json/                 # framework-agnostic JSON engine (pure, unit-tested)
│  ├─ parse.ts                # safe parse → JsonResult with line/column errors
│  ├─ validate.ts             # validation + error formatting
│  ├─ stringify.ts            # pretty-print + escape-to-string
│  ├─ deepParse.ts            # recursive unwrap of stringified objects/arrays
│  ├─ properties.ts           # Object.keys helpers + property picking
│  ├─ process.ts              # orchestrates parse/stringify + property selection
│  └─ *.test.ts
├─ features/jsonProcessor/    # the workspace feature
│  ├─ useJsonProcessor.ts     # headless controller hook (all state lives here)
│  ├─ JsonProcessor.tsx       # composition of the toolbar + two editor panes
│  ├─ sample.ts               # demo document
│  └─ components/             # EditorPane, CodeEditor, ModeToggle,
│                             #   PropertySelector, FileUploadButton,
│                             #   CopyButton, StatusStrip (+ tests)
├─ components/                # app shell: AppHeader, AppFooter
├─ test/                      # Vitest setup + render helper
├─ theme.ts                   # MUI theme
├─ App.tsx
└─ main.tsx
```

**Data flow:** `useJsonProcessor` holds `input`, `mode`, and `selectedProperty`.
Everything else — validation status, available property keys, and the output —
is *derived* from those via the pure `core/json` functions. Components are thin
and presentational.

## Testing

Every feature is covered by tests:

- **Unit tests** for the entire `core/json` engine (parse, validate, stringify,
  deep-parse, property selection, orchestration).
- **Component tests** for each UI piece (copy, upload, mode toggle, property
  selector, status strip) and an **integration test** that drives the whole
  workspace through the rendered UI.

```bash
npm run test:run
```

## Deployment

Pushing to `main` triggers the GitHub Actions pipeline in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. **Typecheck & Test** — the quality gate. If typecheck or any test fails,
   the pipeline stops and **nothing is deployed**.
2. **Build** — produces the static `dist/` bundle.
3. **Deploy** — publishes to **GitHub Pages**.

### One-time setup

- In the repo, go to **Settings → Pages → Build and deployment → Source** and
  select **GitHub Actions**.
- The site is served from `/json-tool/` (see `base` in `vite.config.ts`). If you
  rename the repository, update that `base` to match.

## Configuration

Owner-specific links and integrations live in [`src/config.ts`](src/config.ts)
and can be overridden at build time with env vars (create a `.env` file):

| Env var | Purpose |
| ------- | ------- |
| `VITE_SITE_URL` | Canonical site URL (SEO). |
| `VITE_GITHUB_URL` | Repository link in the header. |
| `VITE_BMC_URL` | Buy Me a Coffee page (button hides if empty). |
| `VITE_PLAUSIBLE_DOMAIN` | Enable Plausible analytics for this domain. |
| `VITE_GOATCOUNTER_URL` | Enable GoatCounter analytics endpoint. |

## Usage analytics & a private stats dashboard

You asked for usage stats (how many people use the tool) **without building user
authentication**. That's exactly what privacy-friendly, hosted analytics are
for. The key idea: the app sends anonymous page-view pings to a third-party
service; the **dashboard lives on that service and is protected by *their*
login** — so only you can see the numbers. No auth code, no user accounts, and
no cookies/PII in this app.

Pick one (both have free tiers):

- **Plausible** — set `VITE_PLAUSIBLE_DOMAIN=yourdomain` and add the site in your
  Plausible account. View stats at `plausible.io` (your account).
- **GoatCounter** — free for non-commercial use. Create a site at
  `goatcounter.com`, then set
  `VITE_GOATCOUNTER_URL=https://YOURCODE.goatcounter.com/count`. View stats in
  your GoatCounter dashboard.

When neither var is set, **zero tracking ships** — see
[`src/analytics.ts`](src/analytics.ts).

> Want richer, self-owned numbers without auth? Alternatives: Cloudflare Web
> Analytics, Umami (self-host), or Vercel Analytics. A "secret" in-app admin
> page is **not** secure (anyone can read client-side code), so prefer a hosted
> dashboard gated by the provider's login.

## SEO & AI-engine friendliness

- Rich `<meta>` tags, Open Graph & Twitter cards, and a canonical URL in
  [`index.html`](index.html).
- **JSON-LD** structured data (`WebApplication`) so search and AI engines can
  understand what the tool does and its feature list.
- A `<noscript>` fallback with a real `<h1>` + description for non-JS crawlers.
- [`public/robots.txt`](public/robots.txt) and
  [`public/sitemap.xml`](public/sitemap.xml).
- A web app manifest ([`public/site.webmanifest`](public/site.webmanifest)).

After deploying, submit the site to
[Google Search Console](https://search.google.com/search-console) and
[Bing Webmaster Tools](https://www.bing.com/webmasters).

## Support / Buy Me a Coffee

A **Buy Me a Coffee** button appears in the header. To set it up:

1. Create a free account at [buymeacoffee.com](https://www.buymeacoffee.com/).
2. Pick your page name → your link becomes `https://buymeacoffee.com/yourname`.
3. Set `VITE_BMC_URL=https://buymeacoffee.com/yourname` (or edit
   `BUY_ME_A_COFFEE_URL` in `src/config.ts`). Leave it empty to hide the button.

## Making money from this project

It's a free, client-side tool, so monetization is about audience + goodwill
rather than locking features. Realistic options, roughly easiest first:

1. **Donations** — the Buy Me a Coffee / GitHub Sponsors buttons. Low effort.
2. **Tasteful sponsorship** — a single "Sponsored by" slot or a
   [Carbon Ads](https://www.carbonads.net/) unit (dev-friendly, non-intrusive).
3. **Affiliate links** — recommend relevant developer tools/hosting you actually
   use.
4. **A "Pro" tier** — keep the core free; charge for power features (saved
   snippets, large-file/desktop app, JSON Schema validation, share links). This
   is where you'd eventually add a backend + auth.
5. **Paid API / CLI** — package the `core/json` engine as an npm library or a
   hosted API for teams.
6. **Content & SEO** — rank for "json parser / formatter / unescape" queries
   (hence the SEO work above), then monetize the traffic via the above.

Start with donations + SEO (zero infrastructure), and only add a backend when a
paid feature clearly justifies it.

## Contributing

Contributions are welcome from developers everywhere — see
[CONTRIBUTING.md](CONTRIBUTING.md). In short:

1. Keep transformation logic **pure** in `core/json` and covered by unit tests.
2. Keep components thin; put state/behavior in hooks.
3. Add or update tests for any feature you touch — CI will not deploy on a
   failing test.
4. Run `npm run typecheck && npm run test:run && npm run lint` before a PR.

## Contact

Open to freelance/business work:

- ✉️ [mina.malak.tomas@gmail.com](mailto:mina.malak.tomas@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/mina-malak-tomas/)

## License & Copyright

© 2026 **Mina Malak**. All rights reserved.
