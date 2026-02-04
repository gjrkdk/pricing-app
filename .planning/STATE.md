# Project State: Shopify Price Matrix App

**Last Updated:** 2026-02-04
**Status:** Phase 1 Complete — Ready for Phase 2

## Project Reference

**Core Value:** Merchants can offer custom-dimension pricing on their headless Shopify storefronts without building their own pricing infrastructure

**What This Is:** A public Shopify app with three components: (1) embedded admin dashboard for matrix configuration, (2) REST API for headless storefronts to fetch pricing, (3) drop-in React widget for easy integration. Merchants define breakpoint grids (width x height), assign them to products, and customers get real-time dimension-based pricing with checkout via Draft Orders.

**Current Focus:** Phase 1 complete. All foundation infrastructure verified. Ready to begin Phase 2 (Admin Matrix Management).

## Current Position

**Phase:** 1 of 6 (Foundation & Authentication) — COMPLETE
**Plan:** 3 of 3
**Status:** Complete
**Last activity:** 2026-02-04 - Completed 01-03-PLAN.md, human-verified e2e

**Progress Bar:**
```
[████                ] 15% (3/21 plans estimated complete)

Phase 1: Foundation & Authentication       [██████████] 3/3 ✓
Phase 2: Admin Matrix Management           [          ] 0/6
Phase 3: Draft Orders Integration          [          ] 0/1
Phase 4: Public REST API                   [          ] 0/4
Phase 5: React Widget (npm Package)        [          ] 0/5
Phase 6: Polish & App Store Preparation    [          ] 0/1
```

## Performance Metrics

**Velocity:** 4 min/plan (3 plans completed)
**Blockers:** 0
**Active Research:** 0

**Phase History:**
| Phase | Plan | Completed | Duration | Status |
|-------|------|-----------|----------|--------|
| 01-foundation-authentication | 01 | 2026-02-04 | 5min | ✓ Complete |
| 01-foundation-authentication | 02 | 2026-02-04 | 3min | ✓ Complete |
| 01-foundation-authentication | 03 | 2026-02-04 | 5min | ✓ Complete |

## Accumulated Context

### Key Decisions

**Made:**
- Roadmap structure: 6 phases following dependency chain (Foundation → Admin → Orders → API → Widget → Polish)
- Success criteria defined with observable user behaviors (not implementation tasks)
- Research flags set for Phase 3 (Draft Orders) and Phase 4 (REST API security)
- **[01-01]** PostgreSQL session storage: Use @shopify/shopify-app-session-storage-postgresql instead of Prisma storage
- **[01-01]** Session token strategy: Enable unstable_newEmbeddedAuthStrategy for session token support (third-party cookie fix)
- **[01-01]** GDPR audit trail: Store all GDPR requests in GdprRequest model for compliance audit
- **[01-01]** Connection pooling: Use pg Pool adapter with connection limit for Vercel serverless
- **[01-01]** OAuth scopes: write_products, read_customers, write_draft_orders
- **[01-02]** Single API key per store: Simplest approach for v1, matches most Shopify apps
- **[01-02]** One-time API key viewing: Security best practice (show full key only on generation)
- **[01-02]** Manual welcome card dismissal: Merchants control when to dismiss (per CONTEXT.md)
- **[01-02]** pm_ API key prefix: Industry convention for easy identification
- **[01-03]** Polaris-styled error boundaries in both root.tsx and app.tsx for consistent UX

**Pending:**
- Matrix size limits (100x100 from research) - validated during Phase 2
- Rate limiting strategy (in-memory vs Redis) - decided during Phase 4 planning
- Pricing model (subscription vs one-time) - decided during Phase 6

### Open Todos

**Immediate:**
- [ ] Plan Phase 2 (Admin Matrix Management) via `/gsd:plan-phase 2`

**Upcoming:**
- [ ] Research Draft Orders behavior during Phase 3 planning
- [ ] Research API security patterns (HMAC, rate limiting) during Phase 4 planning

### Known Blockers

(None)

### Anti-Patterns to Avoid

From research:
1. Third-party cookies for embedded sessions - use session tokens
2. Prisma connection exhaustion on Vercel - configure pooling from start
3. Missing GDPR webhooks - register in Phase 1 ✓
4. Draft Orders rate limits - implement retry logic in Phase 3
5. API without HMAC verification - design into Phase 4 from start

### Lessons Learned

- **[01-UAT]** Polaris CSS must be explicitly imported via `links` export — AppProvider alone doesn't load styles
- **[01-UAT]** Root ErrorBoundary needs its own Polaris CSS import since it renders outside the app layout

## Session Continuity

**Last session:** 2026-02-04
**Stopped at:** Phase 1 complete, all 3 plans executed and human-verified
**Resume file:** None

**What Just Happened:**
- Completed 01-03-PLAN.md (migrations, error handling, e2e verification)
- Applied Prisma migrations creating Store and GdprRequest tables
- Added Polaris-styled ErrorBoundary to both root.tsx and app.tsx
- Ran UAT: 10 tests, found 6 issues (all from missing Polaris CSS), fixed, re-verified 10/10 pass
- Human approved full install flow end-to-end

**What Comes Next:**
- Phase 2: Admin Matrix Management — create, edit, delete pricing matrices
- Dashboard layout and empty state CTA ready for matrix creation flow
- Database tables ready for matrix models (PriceMatrix, Breakpoint, MatrixPrice, ProductMatrix)

**Context for Next Agent:**
- Phase 1 fully verified by human — OAuth, dashboard, API keys, error handling all working
- Polaris CSS properly imported in both root and app layouts
- Navigation working (Dashboard + Settings in sidebar)
- Database running on localhost:5400 with Store and GdprRequest tables
- Ready for Prisma schema additions for matrix models

---
*State tracked since: 2026-02-03*
