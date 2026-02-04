# Phase 2: Admin Matrix Management - Context

**Gathered:** 2026-02-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Merchants create, edit, and delete dimension-based price matrices and assign them to products — all through the embedded Shopify admin dashboard. This phase covers the full CRUD lifecycle for matrices and product-to-matrix linking. The public API, pricing logic, and draft orders are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Matrix editor
- Spreadsheet-style inline editable grid — width breakpoints as columns, height breakpoints as rows, click a cell to type a price
- Breakpoints added/removed inline on the grid — "+" button at end of each axis, "x" to remove a column/row
- New matrix starts with a starter template (e.g., common sizes like 3x3 or 5x5 with preset breakpoint values), merchant customizes from there
- Explicit save — "Save" button required, unsaved changes warning on navigate away

### Matrix list & overview
- Separate "Matrices" page in the sidebar navigation (alongside Dashboard and Settings)
- Clean list layout (Polaris IndexTable style) showing matrix name, grid size, product count, last edited
- Click a row to open the matrix editor
- Polaris EmptyState card when no matrices exist — brief explanation + prominent "Create matrix" CTA
- Duplicate action available — creates a copy with "[Name] (copy)" for merchant to rename and edit

### Product assignment
- Assignment happens from within the matrix editor — product picker section below the price grid
- Uses Shopify's built-in Resource Picker modal for selecting products (familiar UX, search/browse/multi-select)
- When assigning a product that already has a different matrix: warn and confirm ("This product is already using [Matrix X]. Reassign to this matrix?")
- When deleting a matrix with assigned products: show which products will be unassigned, require confirmation

### Validation & edge cases
- Matrix size capped at a reasonable limit (Claude decides exact number based on UI/performance)
- All cells must be filled before saving — empty cells highlighted visually with validation message
- Breakpoints auto-sorted ascending regardless of entry order
- Units: store-wide setting (mm or cm) configured in Settings, applies to all matrices

### Claude's Discretion
- Exact matrix size cap (within reasonable bounds for UI performance)
- Starter template preset values and sizes
- Exact grid cell interaction patterns (tab behavior, keyboard navigation)
- Loading states and optimistic UI patterns
- Specific Polaris component choices for the grid implementation

</decisions>

<specifics>
## Specific Ideas

- Spreadsheet feel for the grid — merchants should feel like they're editing a mini Excel
- Metric units only (mm or cm) — no inches
- Store-wide unit setting rather than per-matrix to keep things consistent

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-admin-matrix-management*
*Context gathered: 2026-02-04*
