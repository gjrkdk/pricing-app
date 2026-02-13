---
phase: quick-3
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - app/routes/app.matrices.$id.edit.tsx
autonomous: true
must_haves:
  truths:
    - "User can click on the matrix title in the edit page to rename it"
    - "User can save the new title without saving the entire matrix"
    - "Page title updates immediately after rename"
  artifacts:
    - path: "app/routes/app.matrices.$id.edit.tsx"
      provides: "Inline editable title on matrix edit page"
  key_links:
    - from: "app/routes/app.matrices.$id.edit.tsx (UI)"
      to: "app/routes/app.matrices.$id.edit.tsx (rename intent)"
      via: "fetcher.submit with intent=rename"
      pattern: "intent.*rename"
---

<objective>
Add inline title editing to the matrix edit page so merchants can rename a matrix after creation.

Purpose: Currently the matrix name is displayed as a static page title with no way to change it after creation. The backend `rename` intent already exists but has no UI.
Output: Editable title on the matrix edit page that saves via the existing `rename` action intent.
</objective>

<execution_context>
@/Users/robinkonijnendijk/.claude/get-shit-done/workflows/execute-plan.md
@/Users/robinkonijnendijk/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@app/routes/app.matrices.$id.edit.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Add inline editable title to matrix edit page</name>
  <files>app/routes/app.matrices.$id.edit.tsx</files>
  <action>
Add an inline-editable title to the matrix edit page. The approach:

1. Add a `renameFetcher` (separate from the main `fetcher`) using `useFetcher` so rename operations don't interfere with save/product operations.

2. Add state for edit mode: `isEditingName` (boolean), and `editName` (string) to hold the in-progress name.

3. Replace the static `<Page title={name}>` with `<Page title="">` and add a custom title area inside the page content (at the top of the BlockStack, before any banners). The custom title area should:
   - In **view mode**: Show the matrix name as a `Text variant="headingLg"` with a pencil/edit `Button` (variant="plain", icon `EditIcon` from `@shopify/polaris-icons`) next to it. Clicking either the text or the icon enters edit mode.
   - In **edit mode**: Show a `TextField` pre-filled with the current name, with "Save" and "Cancel" buttons inline. The TextField should auto-focus when entering edit mode. Pressing Enter should save. Pressing Escape should cancel.

4. On save: Submit via `renameFetcher` with `intent=rename` and `name={editName}`. On success, update the local `name` state with the new value and exit edit mode. Do NOT mark `isDirty` as true for rename operations (the rename is saved independently via its own intent).

5. On cancel: Reset `editName` to the current `name` and exit edit mode.

6. Handle the `renameFetcher` response: Watch for success/error in a `useEffect`. On success, call `setName(editName)` and `setIsEditingName(false)`. On error, show the error in a Banner (can reuse existing error pattern).

7. Fix the isDirty useEffect: Currently the `useEffect` that sets `isDirty(true)` watches `[widthBreakpoints, heightBreakpoints, cells, name]`. Remove `name` from that dependency array since name changes are saved independently via the rename intent and should not trigger the "unsaved changes" prompt for the grid save.

8. Add `EditIcon` import from `@shopify/polaris-icons` (this package is already a dependency).

Important: Keep the existing `<Page>` `backAction` prop. Use `<Page title="">` or simply omit the title prop since we're rendering the title ourselves inside the page content. Actually, to maintain proper Polaris page structure, use the `titleMetadata` approach: keep `<Page title={name}>` and add a small edit button via the `additionalMetadata` prop. Alternatively, the simplest Polaris-idiomatic approach is to just add an editable title section as the first Card in the BlockStack:

Preferred approach (simplest, most Polaris-idiomatic):
- Keep `<Page title={name} backAction={...}>` for the page header
- Add a "Matrix name" Card as the FIRST item in the BlockStack (before the error/success banners)
- The Card contains: in view mode, the name as text with an "Edit" button; in edit mode, a TextField with Save/Cancel
- When the rename succeeds, the `<Page title={name}>` updates automatically since `name` state updates

This keeps the Polaris page header showing the current name while the Card provides the edit UI.
  </action>
  <verify>
Run `npm run build` to confirm TypeScript compiles without errors. Visually verify in the app that:
1. The matrix edit page shows a "Matrix name" card at the top
2. Clicking "Edit" shows a text field with the current name
3. Changing the name and clicking "Save" persists the change (page title updates)
4. Clicking "Cancel" reverts the name
5. Renaming does NOT trigger the unsaved changes prompt
  </verify>
  <done>
Matrix edit page has an inline-editable title that saves independently via the existing rename intent. The page title reflects the current name. Renaming does not affect the grid's dirty state.
  </done>
</task>

</tasks>

<verification>
- `npm run build` passes without errors
- Matrix edit page shows editable name field
- Rename saves independently from grid save
- Page title updates after successful rename
- Unsaved changes prompt is NOT triggered by rename alone
</verification>

<success_criteria>
Merchants can rename a matrix from the edit page without needing to save the entire grid. The rename persists immediately and the page title updates to reflect the new name.
</success_criteria>

<output>
After completion, create `.planning/quick/3-add-ability-to-edit-matrix-title-after-c/3-SUMMARY.md`
</output>
