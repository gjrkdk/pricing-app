---
phase: 08-production-deploy-to-vercel
plan: 02
subsystem: deployment-infrastructure
tags: [vercel, neon, shopify, production, deployment]
requires:
  - phase: 08-01
    provides: Vercel preset, build pipeline, Prisma dual-URL, production TOML template
provides:
  - Live Vercel deployment at quote-flow-one.vercel.app
  - Neon PostgreSQL production database with all migrations applied
  - Production Shopify app (QuoteFlow) in Partner Dashboard
  - shopify.app.production.toml with real production values
affects:
  - Phase 09 (Partner Dashboard registration — production URL now available)
  - Phase 10 (E2E verification — production deployment ready)
tech_stack:
  added: []
  patterns:
    - Neon PostgreSQL with PgBouncer pooling in EU Central (Frankfurt)
    - Vercel serverless functions in fra1 region
key_files:
  created: []
  modified:
    - shopify.app.production.toml (real client_id and Vercel URL)
    - .npmrc (legacy-peer-deps for Vercel builds)
    - package.json (vercel-build uses remix vite:build directly)
key_decisions:
  - decision: Use legacy-peer-deps for Vercel npm install
    rationale: vitest 4.x conflicts with @shopify/cli-kit's @opentelemetry/api version
  - decision: Call remix vite:build directly instead of shopify app build
    rationale: Shopify CLI binary not available on Vercel build environment
  - decision: Remove channel_binding=require from Neon connection strings
    rationale: Prisma migration engine doesn't support this libpq-specific parameter
  - decision: EU Central (Frankfurt) for Neon database
    rationale: User located in Netherlands; Vercel function region changed to fra1 to match
  - decision: Rename app to QuoteFlow
    rationale: User preference for production app branding
duration: 45min
completed: 2026-02-08
---

# Phase 08 Plan 02: Production Deployment Summary

**QuoteFlow deployed to Vercel (quote-flow-one.vercel.app) with Neon PostgreSQL in EU Central and production Shopify app credentials**

## Performance

- **Duration:** ~45 min (including manual steps)
- **Completed:** 2026-02-08
- **Tasks:** 3/3 (1 human-action checkpoint, 1 auto, 1 human-verify)
- **Files modified:** 3

## Accomplishments

- Neon PostgreSQL database provisioned in EU Central (Frankfurt) with all 6 migrations applied
- Production Shopify app "QuoteFlow" created in Partner Dashboard with correct scopes and URLs
- App deployed to Vercel at https://quote-flow-one.vercel.app (fra1 region)
- Vercel environment variables configured (DATABASE_URL, DIRECT_URL, SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SCOPES, SHOPIFY_APP_URL)
- shopify.app.production.toml updated with real production values
- Deployment returns 302 (Shopify OAuth redirect) — correct behavior for unauthenticated requests

## Task Commits

1. **Task 1: Create external resources** — Human action (no commit)
2. **Task 2: Update production TOML** — `a6c82c5` (feat)
3. **Task 3: Verify deployment** — Human verification (approved)

Supporting commits:
- `abdf19a` — fix(08-02): add legacy-peer-deps for Vercel npm install
- `8f51ad5` — fix(08-02): use remix vite:build directly in vercel-build

## Files Created/Modified

- **shopify.app.production.toml** — Updated with real client_id and quote-flow-one.vercel.app URL
- **.npmrc** — Created with legacy-peer-deps=true for Vercel builds
- **package.json** — vercel-build script changed to use remix vite:build directly

## Decisions Made

### 1. legacy-peer-deps for Vercel
vitest 4.x requires @opentelemetry/api ^1.9.0 but @shopify/cli-kit pins <1.7.0. Added .npmrc with legacy-peer-deps=true to resolve the conflict during Vercel's npm install.

### 2. Direct remix vite:build
The `shopify app build` command requires the Shopify CLI binary which isn't available on Vercel's build environment. Changed vercel-build to call `remix vite:build` directly.

### 3. Removed channel_binding from connection strings
Neon's default connection strings include `channel_binding=require` which Prisma's migration engine doesn't support. Removed from both DATABASE_URL and DIRECT_URL.

### 4. EU Central region
User is located in Netherlands. Neon database placed in EU Central (Frankfurt) with Vercel functions also in fra1 for minimal latency.

### 5. App renamed to QuoteFlow
User chose "QuoteFlow" as the production app name.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Peer dependency conflict on Vercel**
- **Found during:** Initial Vercel deployment
- **Issue:** vitest 4.x and @shopify/cli-kit have conflicting @opentelemetry/api peer deps
- **Fix:** Created .npmrc with legacy-peer-deps=true
- **Committed in:** abdf19a

**2. [Rule 3 - Blocking] Shopify CLI not available on Vercel**
- **Found during:** Vercel build after npm install succeeded
- **Issue:** `shopify app build` requires CLI binary not in Vercel PATH
- **Fix:** Changed vercel-build to use `remix vite:build` directly
- **Committed in:** 8f51ad5

**3. [Rule 3 - Blocking] Prisma rejects channel_binding parameter**
- **Found during:** Vercel build with Neon connection strings
- **Issue:** Prisma migration engine doesn't support channel_binding=require
- **Fix:** Removed channel_binding from connection strings in Vercel env vars

---

**Total deviations:** 3 auto-fixed (all Rule 3 - Blocking)
**Impact on plan:** All fixes necessary for deployment to succeed. No scope creep.

## Issues Encountered

- Three build failures resolved iteratively (peer deps, missing CLI, invalid connection string parameter)
- All resolved without architectural changes

## Next Phase Readiness

### Phase 09: Shopify Partner Dashboard Registration

**Status:** READY
- Production URL available: https://quote-flow-one.vercel.app
- Production Shopify app exists with correct scopes
- OAuth redirect URLs configured in Partner Dashboard
- App responds correctly (302 redirect for unauthenticated requests)

**Blockers:** None

---
*Phase: 08-production-deploy-to-vercel*
*Completed: 2026-02-08*
