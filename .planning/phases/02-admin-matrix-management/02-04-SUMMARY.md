---
phase: 02-admin-matrix-management
plan: 04
subsystem: ui
tags: [shopify-app-bridge, resource-picker, polaris, remix, prisma]

# Dependency graph
requires:
  - phase: 02-03
    provides: Matrix editor with spreadsheet-style price grid
provides:
  - ProductPicker component with Shopify Resource Picker integration
  - Product assignment functionality in matrix editor
  - Conflict detection and reassignment warnings
  - One-matrix-per-product constraint enforcement
affects: [02-05, 02-06, 04-public-rest-api]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "App Bridge Resource Picker for product selection"
    - "Immediate persistence pattern for product assignments (separate from matrix save)"
    - "Conflict detection on unique constraint violations with user confirmation modal"

key-files:
  created:
    - app/components/ProductPicker.tsx
  modified:
    - app/routes/app.matrices.$id.edit.tsx

key-decisions:
  - "Product assignments persist immediately (not part of matrix save flow)"
  - "Reassignment warning modal when product already assigned to another matrix"
  - "GID format normalization for Shopify product IDs"

patterns-established:
  - "Conflict modal pattern: detect on first submit, show modal, confirm with second submit"
  - "Pending state pattern: track pending products while awaiting conflict resolution"

# Metrics
duration: 4min
completed: 2026-02-04
---

# Phase 2 Plan 4: Product Assignment Summary

**Shopify Resource Picker integration with immediate product assignment, conflict detection for reassignment, and ProductPicker component with remove capability**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-04T22:18:46Z
- **Completed:** 2026-02-04T22:22:20Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- ProductPicker component with Shopify App Bridge Resource Picker for multi-product selection
- Product assignment action with conflict detection when products already linked to other matrices
- Product removal with security verification ensuring product belongs to correct matrix
- Conflict modal with reassignment confirmation flow
- One-matrix-per-product constraint enforced via database unique constraint and UI warnings

## Task Commits

Each task was committed atomically:

1. **Task 1: Build ProductPicker component with Resource Picker integration** - `1bfbfb7` (feat)
2. **Task 2: Integrate product assignment into matrix editor route** - `0599aa6` (feat)

## Files Created/Modified
- `app/components/ProductPicker.tsx` - Polaris Card wrapper around Resource Picker with ResourceList, conflict modal for reassignment warnings, handlers for assign/remove/confirm/cancel
- `app/routes/app.matrices.$id.edit.tsx` - Added product fetching in loader, assign-products and remove-product action handlers, state management for conflicts and pending products, integrated ProductPicker component

## Decisions Made

**Product assignment persistence pattern:** Product assignments save immediately (independent action) rather than being part of the matrix save flow. This provides instant feedback and simpler UX - merchants don't need to remember to save after assigning products.

**GID format normalization:** Resource Picker returns GIDs in different formats. Implemented normalization to always store `gid://shopify/Product/{id}` format for consistency with Shopify conventions.

**Conflict resolution flow:** Two-submit pattern - first submit detects conflicts and returns them, modal appears, second submit with `confirmed: true` performs reassignment. Prevents accidental overwrites while keeping flow smooth.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

**TypeScript ResourceItem onClick requirement:** Polaris ResourceItem component requires an onClick handler even when not needed. Implemented with no-op function to satisfy type requirements.

**Type assertion for fetcher.data:** Remix fetcher.data is untyped. Added type assertions with runtime checks for conflicts array to maintain type safety while handling dynamic action responses.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Product assignment fully functional in matrix editor
- Products can be linked to matrices via Resource Picker
- Reassignment warnings prevent accidental product moves
- Matrix list page shows product counts (from 02-03)
- Ready for matrix duplication (02-05) and deletion (02-06)
- Product assignments will be consumable by REST API (Phase 4) to fetch pricing for specific products

**Database constraint note:** ProductMatrix has unique constraint on productId enforcing MATRIX-06 requirement. Conflict detection in UI prevents database errors and provides better UX.

---
*Phase: 02-admin-matrix-management*
*Completed: 2026-02-04*
