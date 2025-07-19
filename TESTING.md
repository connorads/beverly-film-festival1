# Beverly Hills Film Festival – **Test‑First Prompt** for AI Coding Agent

> **Context**: You are building a dual‑mode Next.js prototype (Pre‑Festival / Post‑Festival) for the Beverly Hills Film Festival.  The client will *see* this prototype, so every route and component must be functional.  We use **Vitest** for all automated tests and **Playwright** for a *very* slim set of end‑to‑end flows.
>
> **Golden rule**: **Write the failing test *************before************* the implementation**.

---

## 1  Core Rules

1. **NPM only** – use `npm run test`, `npm run test:watch`, `npm run e2e`.  No pnpm.
2. **Layered coverage, heavy at the bottom**:
   * **Unit** → pure functions & hooks.
   * **Component** → React Testing Library + Vitest.
   * **Integration** → page/route behaviour (mode switching, auth, API contracts).
   * **Slim E2E** → Playwright for *money paths* only (see §4).
3. **Every test file stands alone** – mock data, context and network inside the file.
4. **Mode matrix is mandatory** – each page must be asserted in both `pre_festival` and `post_festival` modes.
5. **Snapshot only structured data** (e.g. navigation arrays), *never* full DOM markup.

---

## 2  Tool Stack

| Layer          | Tool                 | Notes                                              |
| -------------- | -------------------- | -------------------------------------------------- |
| Type contracts | **TypeScript + Zod** | Zod schemas shared client & server.                |
| Tests          | **Vitest**           | `jsdom` environment; add `@testing-library/react`. |
| Builders       | **faker** (optional) | Small deterministic fixtures.                      |
| E2E            | **Playwright**       | Tagged `@smoke`; run in CI.                        |

No Storybook, no visual‑diff, no axe accessibility—keep the pipeline lean.

---

## 3  Project Scaffolding

```shell
npm install --save-dev vitest @testing-library/react @testing-library/user-event happy-dom zod faker playwright
```

Add NPM scripts:

```jsonc
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "e2e": "playwright test"
  }
}
```

Create `/test` helpers:

```
/test
  ├─ builders/        // data factories
  ├─ fixtures/        // tiny JSON samples
  ├─ render.tsx       // renderWithProviders()
  └─ env.ts           // vitest‑dom matchers, mocks
```

---

## 4  Money‑Path Playwright Tests (keep to ≤ 5)

1. **Admin toggles site mode** → public nav updates.
2. **Ticket buyer** registers, buys a ticket, downloads PDF/QR.
3. **Filmmaker** uploads submission → appears in admin unpublished list.
4. (Optional) Responsive nav works on mobile.

Everything else: cover with unit/component/integration tests.

---

## 5  Mode‑Visibility Contract

Maintain `PAGE_RULES` manifest:

```ts
export const PAGE_RULES = [
  { path: "/submit", visibleIn: ["pre_festival"] },
  { path: "/winners", visibleIn: ["post_festival"] },
  // ...
];
```

Write one parametrised test that iterates the table for both modes and asserts `resolvePageVisibility()` output and nav composition.

---

## 6  Data Builders

Example:

```ts
export function buildFilm(overrides = {}): Film {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    duration: 90,
    ...overrides,
  };
}
```

Use builders in tests to keep fixtures short and deterministic.

## 7. Hooks

Once you've got the testing framework set up and installed please create some Claude Code hooks in order to make sure that tests and linters etc are being run.
