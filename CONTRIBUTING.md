# Contributing to JSON Studio

Thanks for your interest in improving JSON Studio! This project is intentionally
small, cleanly layered, and fully tested so that anyone — from a first-time
contributor to a world-class engineer — can land a change with confidence.

## Code of conduct

Be kind, be constructive, assume good intent. Harassment of any kind is not
tolerated.

## Getting set up

```bash
git clone https://github.com/MinaMalak-cmd/json-tool.git
cd json-tool
npm install
npm run dev        # http://localhost:5173
```

> Requires Node.js 20+.

## Project layout (where things live)

| Area | Path | Notes |
| ---- | ---- | ----- |
| Pure JSON logic | `src/core/json/` | Framework-agnostic, no React. 100% unit-tested. |
| Feature + state | `src/features/jsonProcessor/` | `useJsonProcessor` hook holds state; components are thin. |
| UI components | `src/features/jsonProcessor/components/` | One component per file, co-located test. |
| App shell | `src/components/`, `src/App.tsx` | Header, footer, layout. |
| Owner config | `src/config.ts` | Links, analytics, site URL (env-overridable). |

**Golden rule:** put transformation/business logic in `src/core/json` as a pure
function with a unit test, and keep components presentational. State and side
effects belong in hooks.

## Development workflow

1. **Create a branch** off `main`: `git checkout -b feat/short-description`.
2. **Write the logic first** in `src/core/json` (if applicable) with a unit test.
3. **Wire up the UI** and add a component test.
4. **Run the checks locally** (these mirror CI):
   ```bash
   npm run typecheck
   npm run test:run
   npm run lint
   npm run build
   ```
5. **Open a Pull Request** against `main`. Fill in what changed and why.

## Testing expectations

- Every feature must have tests. Pure logic → unit tests; UI → component tests.
- Co-locate tests next to the file they cover (`Foo.tsx` → `Foo.test.tsx`).
- Prefer testing **behavior via the public API / rendered UI** over internals.
- CI runs typecheck + the full test suite on every push and PR. **A failing
  test blocks the deploy** — nothing ships to GitHub Pages unless tests pass.

## Coding style

- TypeScript strict mode; no `any` unless truly unavoidable (comment why).
- Run `npm run format` (Prettier) before committing.
- Keep functions small and documented with a short JSDoc comment describing
  intent, not mechanics.
- Accessibility matters: interactive elements need labels/roles.

## Commit & PR conventions

- Use clear, imperative commit messages (`feat: add JSONPath query bar`).
- Keep PRs focused; one logical change per PR is ideal.
- Link any related issue.

## Good first issues / ideas

- JSONPath or JMESPath query bar
- Side-by-side diff view of input vs. output
- Drag-and-drop file upload
- Additional editor themes / light mode
- Schema validation (e.g. against a pasted JSON Schema)
- Internationalization (i18n)
- Tree/collapsible viewer for the output

## License

By contributing, you agree that your contributions are licensed under the same
terms as the project. © Mina Malak.
