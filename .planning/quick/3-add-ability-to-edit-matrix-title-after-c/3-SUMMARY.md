---
phase: quick-3
plan: 1
subsystem: matrix-management
tags: [ui, ux, edit-functionality]
dependency_graph:
  requires: [existing rename action]
  provides: [inline title editing UI]
  affects: [matrix edit page UX]
tech_stack:
  added: []
  patterns: [separate fetcher for independent actions, keyboard shortcuts]
key_files:
  created: []
  modified:
    - app/routes/app.matrices.$id.edit.tsx
decisions: []
metrics:
  duration_seconds: 83
  completed_at: "2026-02-13T19:59:18Z"
---

# Quick Task 3: Add Ability to Edit Matrix Title After Creation

**One-liner:** Inline title editing on matrix edit page using existing rename action intent

## Summary

Added an inline-editable title to the matrix edit page so merchants can rename a matrix after creation. The feature uses the existing backend `rename` intent and provides a clean UX with view/edit modes.

## What Was Built

### Matrix Name Card

- Added a new "Matrix name" card as the first item in the page BlockStack
- View mode: Displays matrix name as headingLg text with an "Edit" button (plain variant with EditIcon)
- Edit mode: Shows TextField with Save/Cancel buttons
- Keyboard shortcuts: Enter to save, Escape to cancel
- Auto-focus on TextField when entering edit mode

### Separate Fetcher Pattern

- Created `renameFetcher` separate from the main `fetcher` to prevent rename operations from interfering with save/product operations
- Handles success/error states independently with dedicated banners
- Updates local `name` state on successful rename, causing page title to update automatically

### Grid Dirty State Fix

- Removed `name` from the `isDirty` useEffect dependency array
- Rename operations now save independently without triggering the "unsaved changes" prompt for the grid
- This prevents confusion where renaming would mark the grid as dirty even though it hasn't changed

## Implementation Details

**State Management:**
```typescript
const renameFetcher = useFetcher<typeof action>();
const [isEditingName, setIsEditingName] = useState(false);
const [editName, setEditName] = useState(name);
```

**Handlers:**
- `handleStartEditName`: Enters edit mode and sets editName to current name
- `handleSaveName`: Submits rename via renameFetcher with intent=rename
- `handleCancelEditName`: Exits edit mode and resets editName
- `handleNameKeyDown`: Keyboard shortcuts for Enter (save) and Escape (cancel)

**Response Handling:**
- useEffect watches renameFetcher.data for success
- On success: updates name state and exits edit mode
- Page title updates automatically since `<Page title={name}>` uses the name state

## Verification Results

- Build completed successfully with no TypeScript errors
- Implementation matches Polaris patterns (Card-based UI with InlineStack/BlockStack)
- Rename functionality exists at backend and now has a UI
- Clean separation between rename and grid save operations

## Deviations from Plan

None - plan executed exactly as written.

## Files Modified

- **app/routes/app.matrices.$id.edit.tsx** (103 additions, 2 deletions)
  - Added EditIcon import from @shopify/polaris-icons
  - Added renameFetcher and rename state management
  - Added Matrix name card with view/edit modes
  - Added rename handlers and keyboard shortcuts
  - Removed name from isDirty dependency array
  - Added rename success/error banners

## Self-Check

Verifying modified files exist:
```
FOUND: app/routes/app.matrices.$id.edit.tsx
```

Verifying commits exist:
```
FOUND: 0090b4d
```

## Self-Check: PASSED

All files modified as expected, commit verified in git history.
