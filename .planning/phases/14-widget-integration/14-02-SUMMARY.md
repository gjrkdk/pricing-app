---
phase: 14-widget-integration
plan: 02
subsystem: widget-components
tags: [widget-hooks, option-groups, price-fetching, ui-components]
dependency_graph:
  requires:
    - Phase 14 Plan 01 (REST API endpoint and widget types)
    - Phase 13 REST API extension (option selections in price endpoint)
  provides:
    - useOptionGroups hook for fetching product option groups
    - OptionGroupSelect component for rendering option dropdowns
    - Extended usePriceFetch with option selection support
    - CSS styles for option group UI elements
  affects:
    - Phase 14 Plan 03 (will wire these components into main widget)
tech_stack:
  added:
    - useOptionGroups React hook with REST API integration
    - OptionGroupSelect component with native HTML select
    - Option selection support in usePriceFetch hook
  patterns:
    - AbortController for fetch cleanup on unmount
    - Intl.NumberFormat for currency formatting
    - Memoized formatters to avoid recreation
    - Native HTML select for accessibility
    - CSS custom properties for theming
    - Immediate refetch on option changes (no debouncing)
    - JSON stringification for dependency tracking
key_files:
  created:
    - packages/widget/src/hooks/useOptionGroups.ts
    - packages/widget/src/components/OptionGroupSelect.tsx
  modified:
    - packages/widget/src/hooks/usePriceFetch.ts
    - packages/widget/src/styles.ts
decisions:
  - Use native HTML select for option groups - better accessibility and mobile support than custom dropdown
  - Gracefully handle 404/network errors as empty state - widget should not distinguish between missing product and no options
  - No debouncing for option selection changes - unlike dimensions, option changes should trigger immediate price refetch
  - Use JSON.stringify for option selections dependency tracking - avoids reference equality issues in useEffect
  - Format FIXED modifiers with Intl.NumberFormat - respects user locale for currency display
  - Format PERCENTAGE modifiers as whole numbers - basis points to percent with .toFixed(0)
  - Place option groups before quantity selector in visual hierarchy - maintain logical flow
metrics:
  duration: 109
  tasks_completed: 2
  files_modified: 4
  commits: 2
  completed_date: 2026-02-10
---

# Phase 14 Plan 02: Widget Option Group Components Summary

Core widget building blocks for option group rendering and selection: hook to fetch option data, component to display accessible dropdowns with modifier labels, extended price hook with option support, and CSS styles.

## Tasks Completed

### Task 1: Create useOptionGroups hook and OptionGroupSelect component
**Commit:** 52e2dcd

**useOptionGroups hook** (`packages/widget/src/hooks/useOptionGroups.ts`):

Created hook that fetches option groups from REST API on mount with proper lifecycle management:

**Fetch logic:**
- Fetches from `GET /api/v1/products/:productId/options`
- Uses X-API-Key header for authentication
- Returns typed `UseOptionGroupsReturn` with groups array, loading state, error state

**Error handling:**
- 404 responses → empty array (product has no options), not an error
- Network errors → empty array (graceful degradation)
- 401 errors → authentication error message
- Other API errors → extracted from RFC 7807 response detail field

**Cleanup:**
- Uses AbortController to cancel in-flight requests on unmount
- Prevents memory leaks and state updates on unmounted components

**OptionGroupSelect component** (`packages/widget/src/components/OptionGroupSelect.tsx`):

Created accessible dropdown component using native HTML select:

**Accessibility features:**
- Native `<select>` element for built-in keyboard navigation and screen reader support
- `<label>` with `htmlFor` properly associates label with select
- `required` and `aria-required` attributes for REQUIRED groups
- Asterisk in label text for visual indication of required fields

**UI behavior:**
- REQUIRED groups: disabled placeholder option "Select {name}..."
- OPTIONAL groups: "None" as first selectable option
- Controlled component pattern: `value` prop + `onChange` callback
- Empty string maps to null for "no selection" state

**Price modifier formatting:**
- Zero modifiers: no label (empty string)
- FIXED modifiers: Intl.NumberFormat with user locale, displays as (+$15.00)
- PERCENTAGE modifiers: basis points to percent as whole number, displays as (+10%)
- Handles negative modifiers with proper sign display
- Memoized currency formatter keyed on currency prop

**Visual design:**
- Uses CSS classes with `pm-` prefix matching existing widget patterns
- Consistent spacing and typography with other widget inputs

### Task 2: Extend usePriceFetch with option selections and add option group CSS
**Commit:** 976540e

**Extended usePriceFetch hook** (`packages/widget/src/hooks/usePriceFetch.ts`):

Added option selection support to existing price fetch hook while maintaining backward compatibility:

**API changes:**
- Added `optionSelections?: OptionSelection[]` to `UsePriceFetchOptions` (optional, defaults to empty array)
- Added `basePrice: number | null` to return type (base price before modifiers)
- Added `optionModifiers: OptionModifierInfo[] | null` to return type (modifier breakdown)

**Fetch logic changes:**
- When `optionSelections.length > 0`, adds `options` query parameter as JSON string
- URLSearchParams.set auto-encodes the JSON payload
- Extracts `basePrice` and `optionModifiers` from API response if present (optional fields)
- Sets state for both new fields

**Dependency tracking:**
- Created `optionsKey = JSON.stringify(optionSelections)` to avoid reference equality issues
- Added `optionsKey` to useEffect dependency array
- Option changes trigger immediate refetch (no debouncing like dimensions)
- Width/height remain debounced at 400ms as before

**Backward compatibility:**
- Optional parameter with default value means existing consumers work unchanged
- Only adds query parameter when selections exist
- New return fields are nullable, consumers can ignore them

**Option group CSS** (`packages/widget/src/styles.ts`):

Added styles for option group selects following existing widget patterns:

**Style additions:**
- `.pm-option-group`: Container with 16px bottom margin
- `.pm-option-label`: Bold label with 6px bottom margin, uses CSS custom properties
- `.pm-option-select`: Full-width select with custom styling

**Custom dropdown arrow:**
- `appearance: none` removes native browser arrow
- Data URI SVG arrow matches existing #637381 secondary color
- Positioned at right 12px center
- Padding-right 32px leaves room for arrow

**Focus state:**
- Matches existing input focus behavior
- Uses `--pm-primary-color` for border
- Box shadow for visual emphasis

**Positioning:**
- Placed after quantity selector styles and before add-to-cart button
- Maintains logical cascade order

## Verification

All verification checks passed:

1. Widget TypeScript compiles without errors: `cd packages/widget && npx tsc --noEmit`
2. useOptionGroups hook exists with proper types and fetch logic
3. OptionGroupSelect renders native select with modifier labels formatted correctly
4. usePriceFetch includes options in API call when selections exist
5. CSS styles use `pm-` prefix and CSS custom properties consistently

**File existence verified:**
- FOUND: packages/widget/src/hooks/useOptionGroups.ts
- FOUND: packages/widget/src/components/OptionGroupSelect.tsx
- FOUND: optionSelections in usePriceFetch.ts (6 occurrences)
- FOUND: .pm-option-group class in styles.ts

## Deviations from Plan

None - plan executed exactly as written.

## Success Criteria

All success criteria met:

- [x] useOptionGroups fetches from `/api/v1/products/:productId/options` and returns typed groups
- [x] OptionGroupSelect uses native HTML `<select>` with accessibility attributes (label, required, aria-required)
- [x] Price modifier labels show "+$15.00" for FIXED and "+10%" for PERCENTAGE modifiers correctly
- [x] usePriceFetch includes option selections in API call only when selections exist (backward compatible)
- [x] Option select CSS matches existing widget visual style

## Next Steps

Phase 14 Plan 03 will wire these components into the main PriceMatrixWidget component to complete the option group integration. The building blocks are now ready:
- Hook to fetch option groups
- Component to render option selects
- Extended price hook that includes selections in API calls
- Styles for visual consistency

## Self-Check

Verifying all claimed artifacts exist:

**Files:**
- FOUND: packages/widget/src/hooks/useOptionGroups.ts
- FOUND: packages/widget/src/components/OptionGroupSelect.tsx
- FOUND: packages/widget/src/hooks/usePriceFetch.ts (extended)
- FOUND: packages/widget/src/styles.ts (extended)

**Commits:**
- FOUND: 52e2dcd (Task 1: useOptionGroups hook and OptionGroupSelect component)
- FOUND: 976540e (Task 2: usePriceFetch extension and CSS styles)

**Result:** PASSED - All artifacts verified
