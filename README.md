# JSON Studio

A fast, private, browser-only studio for working with JSON. **Parse**, **stringify**, and **recursively unwrap** deeply-nested stringified JSON — with live validation, descriptive errors, and side-by-side editors. No server, no uploads, no tracking: your data never leaves your machine.

![CI & Deploy](https://github.com/OWNER/json-tool/actions/workflows/deploy.yml/badge.svg)

> Replace `OWNER` in the badge URL with your GitHub username/org.

## Features

- **Parse JSON** — pretty-print and validate any JSON document.
- **Stringify JSON** — convert a document into its escaped string literal form.
- **Deep unwrap** — recursively detects string values that are themselves
  stringified JSON objects/arrays and inlines them. IDs and numeric/boolean
  strings are left untouched (objects & arrays only).
- **Pick a single property** — a dropdown built from `Object.keys` lets you
  narrow processing to one top-level property of a large object.
- **Parallel editors** — an editable input editor and a read-only output
  editor, each collapsible/expandable.
- **Live validation** — every keystroke is validated; invalid JSON yields a
  descriptive, line/column-aware error message.
- **Upload or paste** — drop in a `.json` file or paste directly.
- **One-click copy** — copy input or output from the header of each pane.
- **Polished, accessible UI** — dark theme, keyboard- and screen-reader-friendly.

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

## Contributing

Contributions are welcome from developers everywhere. The architecture is
intentionally clean and modular to make enhancements easy:

1. Keep transformation logic **pure** in `core/json` and covered by unit tests.
2. Keep components thin; put state/behavior in hooks.
3. Add or update tests for any feature you touch — CI will not deploy on a
   failing test.
4. Run `npm run typecheck && npm run test:run` before opening a PR.

Ideas to pick up: schema validation, JSONPath queries, diff view, additional
themes, drag-and-drop upload, download output, i18n.

## License & Copyright

© 2026 **Mina Malak**. All rights reserved.
