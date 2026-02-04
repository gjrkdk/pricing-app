# Project State: Shopify Price Matrix App

**Last Updated:** 2026-02-04
**Status:** Phase 2 In Progress — Product Assignment Complete

## Project Reference

**Core Value:** Merchants can offer custom-dimension pricing on their headless Shopify storefronts without building their own pricing infrastructure

**What This Is:** A public Shopify app with three components: (1) embedded admin dashboard for matrix configuration, (2) REST API for headless storefronts to fetch pricing, (3) drop-in React widget for easy integration. Merchants define breakpoint grids (width x height), assign them to products, and customers get real-time dimension-based pricing with checkout via Draft Orders.

**Current Focus:** Phase 2 two-thirds complete. Matrix management (create, list, edit, product assignment) fully functional. Duplication and deletion remain.

## Current Position

**Phase:** 2 of 6 (Admin Matrix Management) — IN PROGRESS
**Plan:** 4 of 6
**Status:** In progress
**Last activity:** 2026-02-04 - Completed 02-04-PLAN.md (Product Assignment)

**Progress Bar:**
```
[███████             ] 33% (7/21 plans estimated complete)

Phase 1: Foundation & Authentication       [██████████] 3/3 ✓
Phase 2: Admin Matrix Management           [██████    ] 4/6
Phase 3: Draft Orders Integration          [          ] 0/1
Phase 4: Public REST API                   [          ] 0/4
Phase 5: React Widget (npm Package)        [          ] 0/5
Phase 6: Polish & App Store Preparation    [          ] 0/1
```

## Performance Metrics

**Velocity:** 3.3 min/plan (7 plans completed)
**Blockers:** 0
**Active Research:** 0

**Phase History:**
| Phase | Plan | Completed | Duration | Status |
|-------|------|-----------|----------|--------|
| 01-foundation-authentication | 01 | 2026-02-04 | 5min | ✓ Complete |
| 01-foundation-authentication | 02 | 2026-02-04 | 3min | ✓ Complete |
| 01-foundation-authentication | 03 | 2026-02-04 | 5min | ✓ Complete |
| 02-admin-matrix-management | 01 | 2026-02-04 | 2min | ✓ Complete |
| 02-admin-matrix-management | 02 | 2026-02-04 | 3min | ✓ Complete |
| 02-admin-matrix-management | 03 | 2026-02-04 | 3min | ✓ Complete |
| 02-admin-matrix-management | 04 | 2026-02-04 | 4min | ✓ Complete |

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
- **[02-01]** Position-based cell references: Use widthPosition/heightPosition integers instead of value-based references for simpler grid logic
- **[02-01]** Cascade deletes: Configure ON DELETE CASCADE for all matrix relations (automatic cleanup)
- **[02-01]** One matrix per product: Unique constraint on ProductMatrix.productId enforces MATRIX-06 requirement
- **[02-01]** Auto-save unit preference: Immediate save on change using useFetcher pattern (no separate button)
- **[02-02]** Template breakpoints in mm with cm conversion: Small (3x3: 300/600/900mm), Medium (5x5: 200/400/600/800/1000mm), Custom (empty)
- **[02-02]** Matrix duplicate behavior: Copy name with "(copy)" suffix, copy all breakpoints and cells, do NOT copy product assignments
- **[02-02]** Matrix initialization pattern: Transaction creates matrix + breakpoints + zero-value cells atomically
- **[02-03]** Custom HTML table over Polaris DataGrid: Needed full control for spreadsheet-like behavior with inline editing, tab navigation, and dynamic breakpoint headers
- **[02-03]** Map with string keys for cells: Using Map<string, number> with 'col,row' keys provides O(1) cell lookups and natural fit for sparse 2D data
- **[02-03]** Cell re-indexing on breakpoint changes: When breakpoints added/removed in middle of array, all cells re-indexed to maintain position consistency with sorted breakpoints
- **[02-03]** Client-side empty cell validation: Highlights empty cells with red background before save, provides clear visual feedback for required fields
- **[02-04]** Product assignments persist immediately (not part of matrix save flow): Separate actions for assign/remove provide instant feedback without coupling to matrix save
- **[02-04]** GID format normalization: Resource Picker returns various GID formats, always normalize to gid://shopify/Product/{id} for consistency
- **[02-04]** Conflict modal pattern: Two-submit pattern (detect conflicts on first submit, show modal, confirm on second submit) prevents accidental reassignments

**Pending:**
- Rate limiting strategy (in-memory vs Redis) - decided during Phase 4 planning
- Pricing model (subscription vs one-time) - decided during Phase 6

### Open Todos

**Immediate:**
- [ ] Execute 02-05-PLAN.md (Matrix duplication)
- [ ] Execute 02-06-PLAN.md (Matrix deletion)

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
**Stopped at:** Completed 02-04-PLAN.md (Product Assignment)
**Resume file:** None

**What Just Happened:**
- Completed 02-04-PLAN.md (Product assignment via Resource Picker)
- Built ProductPicker component: Shopify Resource Picker integration with conflict modal for reassignments
- Updated matrix editor loader to fetch full product list from ProductMatrix relation
- Added assign-products action: checks for conflicts, handles reassignment with confirmation
- Added remove-product action: security check ensures product belongs to matrix
- State management for conflict products and pending products during reassignment flow
- Integrated ProductPicker into matrix editor, replacing placeholder section
- All TypeScript compilation checks passed

**What Comes Next:**
- Phase 2 Plan 05: Matrix Duplication — duplicate matrices with copy of breakpoints/cells
- Phase 2 Plan 06: Matrix Deletion — delete matrices with cascade cleanup
- Product assignment fully functional with immediate persistence
- Merchants can link products to matrices via Resource Picker
- Conflict detection prevents accidental product reassignments
- One-matrix-per-product constraint enforced

**Context for Next Agent:**
- Matrix editor has fully functional product assignment section
- ProductPicker component at app/components/ProductPicker.tsx uses Resource Picker
- Product assignments persist immediately (separate from matrix save action)
- Reassignment conflicts detected on first submit, user confirms via modal
- GID format normalized to gid://shopify/Product/{id} for consistency
- ProductMatrix model has unique constraint on productId
- Ready for duplication (copy matrix without copying product assignments per 02-02 decision)
- Ready for deletion (cascade deletes will clean up all relations)

---
*State tracked since: 2026-02-03*
