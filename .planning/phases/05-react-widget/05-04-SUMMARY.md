---
phase: 05-react-widget
plan: 04
subsystem: widget
tags: [react, shadow-dom, react-shadow, css-custom-properties, vite, esm, umd]

# Dependency graph
requires:
  - phase: 05-03
    provides: usePriceFetch and useDraftOrder hooks, 4 internal UI components (DimensionInput, PriceDisplay, QuantitySelector, AddToCartButton)
  - phase: 05-02
    provides: Widget package scaffold with build tooling and TypeScript types
provides:
  - Complete PriceMatrixWidget component with Shadow DOM CSS isolation
  - Theme customization via CSS custom properties
  - Widget CSS with shimmer animations and responsive design
  - Buildable package with ESM + UMD outputs and TypeScript declarations
affects: [05-05, widget-integration, npm-publish]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Shadow DOM CSS injection via <style> tag inside react-shadow root"
    - "Theme prop mapping to CSS custom properties for runtime theming"
    - "CSS string export from .ts file to avoid CSS import issues in library mode"

key-files:
  created:
    - packages/widget/src/PriceMatrixWidget.tsx
    - packages/widget/src/styles.ts
    - packages/widget/dist/price-matrix-widget.es.js
    - packages/widget/dist/price-matrix-widget.umd.js
    - packages/widget/dist/index.d.ts
  modified:
    - packages/widget/src/index.ts

key-decisions:
  - "CSS exported as string constant from .ts file (not .css) to avoid Vite library mode CSS import issues"
  - "All CSS uses pm- class prefix for collision avoidance in host page"
  - "6 CSS custom properties with :host defaults for runtime theming"
  - "Theme prop maps to inline styles on Shadow DOM root"
  - "Client-side dimension validation: numeric check + min/max range validation"
  - "Add-to-cart flow: createDraftOrder → onAddToCart callback → window.location redirect to checkout"

patterns-established:
  - "Shadow DOM isolation: react-shadow root.div wraps all widget content"
  - "CSS injection pattern: <style> tag with CSS string inside Shadow DOM"
  - "Theme customization: Optional theme prop overrides CSS custom properties at runtime"
  - "Widget state flow: dimension inputs → debounced price fetch → quantity selector → add to cart → checkout redirect"

# Metrics
duration: 7min
completed: 2026-02-06
---

# Phase 5 Plan 4: Widget Assembly Summary

**PriceMatrixWidget component with Shadow DOM CSS isolation, theme prop theming via custom properties, and ESM + UMD builds with TypeScript declarations**

## Performance

- **Duration:** 7 min
- **Started:** 2026-02-06T10:43:44+01:00
- **Completed:** 2026-02-06T10:50:47+01:00
- **Tasks:** 2
- **Files modified:** 6 (5 created, 1 modified)

## Accomplishments
- PriceMatrixWidget component assembled with react-shadow for CSS isolation
- Widget CSS with pm- prefixed classes, 6 CSS custom properties, and shimmer animations
- Theme prop maps 6 optional properties to CSS custom properties for runtime customization
- Complete user flow: dimension inputs → debounced price fetch → quantity selector → add to cart → Draft Order creation → checkout redirect
- Package builds to ESM (408KB) + UMD (283KB) with TypeScript declarations
- All hooks and components wired together: usePriceFetch for pricing, useDraftOrder for checkout, 4 internal components for UI

## Task Commits

Each task was committed atomically:

1. **Task 1: Create widget styles, main component, and build package** - `3910d28` (feat)
2. **Task 2: Human verification checkpoint** - APPROVED (API endpoints and build outputs verified)

## Files Created/Modified
- `packages/widget/src/PriceMatrixWidget.tsx` - Main component with Shadow DOM root, theme mapping, state management, and event handling (187 lines)
- `packages/widget/src/styles.ts` - CSS string export with :host custom properties, pm- classes, shimmer animation (233 lines)
- `packages/widget/src/index.ts` - Updated to export PriceMatrixWidget (imports path corrected)
- `packages/widget/dist/price-matrix-widget.es.js` - ESM build output (408KB, React externalized)
- `packages/widget/dist/price-matrix-widget.umd.js` - UMD build output (283KB, React externalized)
- `packages/widget/dist/index.d.ts` - TypeScript declarations (84 lines)

## Decisions Made
- **CSS as TypeScript export:** Using `styles.ts` instead of `.css` file avoids CSS import issues in Vite library mode. CSS string is injected via `<style>` tag inside Shadow DOM.
- **Theme prop mapping:** Optional theme prop with 6 properties (primaryColor, textColor, borderColor, borderRadius, fontSize, errorColor) maps to CSS custom properties as inline styles on the Shadow DOM root, allowing runtime customization without CSS rebuilds.
- **Client-side validation:** Widget validates dimensions are numeric and within dimensionRange (min/max from API response) before enabling add-to-cart, showing inline error messages for invalid inputs.
- **Checkout flow:** Add-to-cart creates Draft Order via useDraftOrder hook, calls onAddToCart callback if provided, then redirects to checkout URL (window.location.href = checkoutUrl).

## Deviations from Plan
None - plan executed exactly as written.

## Issues Encountered
None - all tasks completed without issues. API endpoints verified during checkpoint, build outputs verified.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
Widget core is complete and buildable. Ready for Plan 05 (Widget Documentation and Publishing):
- Package builds successfully to ESM + UMD with TypeScript declarations
- All locked decisions from CONTEXT.md implemented (text fields, inline validation, range hints, total price only, 400ms debounce, skeleton shimmer, quantity +/- buttons, disabled button logic, spinner in button, checkout redirect)
- Shadow DOM provides CSS isolation for integration into any storefront
- Theme prop enables visual customization without code changes

Next steps:
- Add README.md with usage examples and API documentation
- Test npm pack output
- Prepare for npm publish

## Self-Check: PASSED

All files and commits verified:
- packages/widget/src/PriceMatrixWidget.tsx: FOUND
- packages/widget/src/styles.ts: FOUND
- packages/widget/dist/price-matrix-widget.es.js: FOUND
- packages/widget/dist/price-matrix-widget.umd.js: FOUND
- packages/widget/dist/index.d.ts: FOUND
- Commit 3910d28: FOUND

---
*Phase: 05-react-widget*
*Completed: 2026-02-06*
