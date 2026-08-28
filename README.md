# QA Automation — Ligo Technical Test

E2E automation suite for SauceDemo using Playwright + TypeScript

## Objective

The suite covers the required E2E cycle:
- HU-1 Authentication: happy path + negative paths + gitch 
- HU-2 Main operation: product selection → cart → checkout
- HU-3 State verification: cart/order confirmation reflects the operation
- HU-4 Negative/boundary cases: mandatory checkout fields and equivalent partitions

## Why Playwright + TypeScript?

Playwright was selected because it provides first-class browser automation, auto-waiting assertions, tracing, screenshots/video, parallel execution and an HTML report. TypeScript adds strong typing and maintainability

## Architecture

- `pages/`: Page Object Model
- `fixtures/`: reusable test fixtures and page objects
- `data/`: externalized test data
- `tests/`: independent test specifications
- `docs/`: test design and traceability
- `.github/workflows/`: CI pipeline

## Prerequisites

- Node.js 20+
- npm 10+

## Install

```bash
npm ci
npx playwright install --with-deps chromium
```

For local macOS/Windows:

```bash
npx playwright install chromium
```

## Run

All tests:

```bash
npm test
```

Smoke:

```bash
npm run test:smoke
```

Regression:

```bash
npm run test:regression
```

Headed:

```bash
npm run test:headed
```

Open HTML report:

```bash
npm run report
```

Debug:

```bash
npm run test:debug
```

## Environment configuration

Default:

```text
BASE_URL=https://www.saucedemo.com
```

Override:

```bash
BASE_URL=https://www.saucedemo.com npm test
```

Credentials are intentionally kept in `data/users.json` because SauceDemo uses public demo credentials

## Scope

### Automated
- Successful login
- Invalid credentials
- Locked user
- Product selection
- Add to cart
- Cart state
- Checkout happy path
- Checkout required-field validation
- Order completion

### Out of scope for this version
- Cross-browser matrix
- Accessibility audit
- Performance benchmarking
- Visual regression baseline
- API-based setup/teardown
- Deep exploration of every SauceDemo product/user permutation

These are candidates for v2

## Technical decisions

### 1. Test data and state
Each test starts from a clean browser context and logs in explicitly. This makes tests independent and rerunnable. For this public demo SUT, API setup is not necessary because the core state can be established through the UI without costly external dependencies.

### 2. Flakiness
No fixed `sleep`/`waitForTimeout` calls are used. Playwright locators and web-first assertions wait for the expected UI state. Tests avoid sharing mutable state.

### 3. Locators
Prefer accessible roles and stable attributes such as `data-test`. XPath/CSS chains tied to layout are avoided.

### 4. Special users
Performed the tests for both `problem_user` and `performance_glitch_user` in SauceDemo. I executed TC-013, TC-014, and TC-015 to verify the broken images, add-to-cart failures, and the checkout last-name field issue, as well as TC-004 to evaluate authentication performance under network latency. The observed behaviors were documented and compared with the expected results to identify and report any discrepancies found during testing.

### 5. V2
- Browser matrix: Chromium, Firefox, WebKit
- API-assisted test data setup if the SUT exposes a suitable API
- More boundary/decision-table coverage
- Accessibility checks
- Visual regression
- Parallel sharding at CI level
- Trend reporting and flaky-test detection

[https://youtu.be/KlUXYi9pK8s]
