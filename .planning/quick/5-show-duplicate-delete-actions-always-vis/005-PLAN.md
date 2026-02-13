---
phase: quick-005
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - app/routes/app.matrices._index.tsx
  - app/routes/app.option-groups._index.tsx
  - app/services/option-group.server.ts
autonomous: true
must_haves:
  truths:
    - "Duplicate and Delete buttons are always visible on each matrix card (no hover required)"
    - "Option groups list uses the same ResourceList/ResourceItem card layout as matrices"
    - "Duplicate and Delete buttons are always visible on each option group card"
    - "Duplicating an option group creates a copy with all choices and redirects to edit"
    - "Delete confirmation modal still works for both matrices and option groups"
  artifacts:
    - path: "app/routes/app.matrices._index.tsx"
      provides: "Matrix list with always-visible action buttons"
    - path: "app/routes/app.option-groups._index.tsx"
      provides: "Option group list with ResourceList layout and always-visible action buttons"
    - path: "app/services/option-group.server.ts"
      provides: "duplicateOptionGroup service function"
  key_links:
    - from: "app/routes/app.option-groups._index.tsx"
      to: "app/services/option-group.server.ts"
      via: "duplicateOptionGroup import"
      pattern: "duplicateOptionGroup"
---

<objective>
Make Duplicate and Delete action buttons always visible on matrix and option group list cards, and convert option groups list from IndexTable to the same ResourceList/ResourceItem card layout used by matrices.

Purpose: Improve discoverability of card actions -- hover-only shortcutActions and the condensed IndexTable hide available operations from users.
Output: Both list pages use ResourceList with always-visible Duplicate/Delete buttons rendered inline on each card.
</objective>

<execution_context>
@/Users/robinkonijnendijk/.claude/get-shit-done/workflows/execute-plan.md
@/Users/robinkonijnendijk/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@app/routes/app.matrices._index.tsx
@app/routes/app.option-groups._index.tsx
@app/services/option-group.server.ts
@prisma/schema.prisma
</context>

<tasks>

<task type="auto">
  <name>Task 1: Replace shortcutActions with always-visible buttons on matrix cards</name>
  <files>app/routes/app.matrices._index.tsx</files>
  <action>
In `app/routes/app.matrices._index.tsx`, replace the `shortcutActions` prop on each `ResourceItem` with always-visible inline buttons rendered inside the ResourceItem content.

Current approach uses `shortcutActions` on ResourceItem which only shows on hover:
```tsx
shortcutActions={[
  { content: "Duplicate", onAction: () => handleDuplicateClick(matrix.id) },
  { content: "Delete", onAction: () => handleDeleteClick(matrix) },
]}
```

Replace with: Remove the `shortcutActions` prop entirely. Inside the ResourceItem content, wrap the existing content and an action button group in a layout that puts the text on the left and buttons on the right. Use an `InlineStack` with `align="space-between"` wrapping a `BlockStack` (for name + metadata) and an `InlineStack` (for the two buttons).

The buttons should use `Button` components:
- "Duplicate" button: `variant="plain"`, `size="slim"`, calls `handleDuplicateClick(matrix.id)`. Wrap the button's onClick with `e.stopPropagation()` so it does not trigger the card's row click navigation.
- "Delete" button: `variant="plain"`, `size="slim"`, `tone="critical"`, calls `handleDeleteClick(matrix)`. Also wrap with `e.stopPropagation()`.

Wrap both buttons in a `div` with `onClick={(e) => e.stopPropagation()}` to prevent the ResourceItem onClick from firing when buttons are clicked (same pattern used in the current option groups IndexTable).

No changes to imports needed -- `Button` and `InlineStack` are already imported.
  </action>
  <verify>Run `npx tsc --noEmit` to confirm no type errors. Visually: the Duplicate and Delete buttons should be visible on each matrix card without hovering.</verify>
  <done>Matrix list cards show Duplicate and Delete buttons at all times. Clicking Duplicate creates a copy and navigates to edit. Clicking Delete opens the confirmation modal. Clicking the card elsewhere navigates to the matrix edit page.</done>
</task>

<task type="auto">
  <name>Task 2: Add duplicateOptionGroup service and convert option groups list to ResourceList with always-visible buttons</name>
  <files>app/services/option-group.server.ts, app/routes/app.option-groups._index.tsx</files>
  <action>
**Part A: Add duplicate service function**

In `app/services/option-group.server.ts`, add a `duplicateOptionGroup` function after the existing `deleteOptionGroup` function. Follow the same pattern as the matrix duplicate in `app.matrices._index.tsx` action handler:

```typescript
export async function duplicateOptionGroup(id: string, storeId: string) {
  // Verify ownership
  const original = await prisma.optionGroup.findUnique({
    where: { id },
    include: { choices: true },
  });

  if (!original || original.storeId !== storeId) {
    return null;
  }

  // Create duplicate with all choices in a transaction
  const duplicate = await prisma.$transaction(async (tx) => {
    const newGroup = await tx.optionGroup.create({
      data: {
        storeId: original.storeId,
        name: `${original.name} (copy)`,
        requirement: original.requirement,
        choices: {
          create: original.choices.map((choice) => ({
            label: choice.label,
            modifierType: choice.modifierType,
            modifierValue: choice.modifierValue,
            isDefault: choice.isDefault,
          })),
        },
      },
      include: { choices: true },
    });
    return newGroup;
  });

  return duplicate;
}
```

**Part B: Convert option groups list to ResourceList with always-visible buttons**

Rewrite `app/routes/app.option-groups._index.tsx` to use `ResourceList`/`ResourceItem` instead of `IndexTable`, matching the matrices page layout pattern.

Import changes:
- Remove `IndexTable` import
- Add `ResourceList`, `ResourceItem` imports from `@shopify/polaris`
- Import `duplicateOptionGroup` from `~/services/option-group.server`
- Add `redirect` import from `@remix-run/node`
- Remove `useRef` from react imports (no longer needed for IndexTable focus management)

Action handler changes:
- Add a `duplicate` intent case in the action function, mirroring the matrices page pattern:
  - Look up the store, call `duplicateOptionGroup(groupId, store.id)`
  - If null, return 404 error
  - Otherwise, `return redirect(`/app/option-groups/${duplicate.id}/edit`)`
- Keep the existing `delete` intent as-is

Component changes:
- Remove the `rowRefs` useRef and associated ref callbacks (IndexTable-specific)
- Remove the `rowRefs` focus management in the useEffect (the "focus on first group" block). Keep the empty-state focus management (focus on create button when list is empty).
- Add `handleDuplicateClick` callback (same pattern as matrices page):
  ```typescript
  const handleDuplicateClick = useCallback(
    (groupId: string) => {
      const formData = new FormData();
      formData.append("intent", "duplicate");
      formData.append("groupId", groupId);
      fetcher.submit(formData, { method: "post" });
    },
    [fetcher]
  );
  ```
- Replace the entire IndexTable markup with a `ResourceList` inside a `Card` (no `padding="0"` needed). Each item renders as a `ResourceItem` with:
  - `id={group.id}`, `onClick={() => handleRowClick(group.id)}`
  - NO `shortcutActions` -- buttons are always visible inline
  - Content layout: `InlineStack` with `align="space-between"` and `blockAlign="center"`. Left side: `BlockStack` with the group name as `Text variant="headingSm" fontWeight="bold"`, then a metadata line with `InlineStack gap="400"` showing requirement (Required/Optional), choice count, and product count as `Text variant="bodySm" tone="subdued"`. Right side: `div` with `onClick={(e) => e.stopPropagation()}` containing `InlineStack gap="200"` with Duplicate button (`variant="plain"`, `size="slim"`) and Delete button (`variant="plain"`, `size="slim"`, `tone="critical"`).

Keep the delete confirmation Modal exactly as-is.
  </action>
  <verify>Run `npx tsc --noEmit` to confirm no type errors. Visually: option groups list now shows card-style items (matching matrices) with always-visible Duplicate and Delete buttons. Duplicating creates a "(copy)" and redirects to edit. Deleting opens the confirmation modal.</verify>
  <done>Option groups list page uses ResourceList/ResourceItem card layout matching the matrices page. Each card shows group name, metadata (requirement, choices, products), and always-visible Duplicate and Delete buttons. Duplicate creates a full copy (including all choices) with "(copy)" suffix and redirects to edit. Delete still shows confirmation modal.</done>
</task>

</tasks>

<verification>
1. `npx tsc --noEmit` passes with no errors
2. Matrices list page: Duplicate and Delete buttons visible without hover on each card
3. Option groups list page: Uses ResourceList card layout with Duplicate and Delete buttons visible without hover
4. Matrix Duplicate action: Creates copy with "(copy)" suffix, redirects to edit page
5. Option Group Duplicate action: Creates copy with all choices, "(copy)" suffix, redirects to edit page
6. Delete actions: Confirmation modal appears for both matrices and option groups
7. Card click (outside buttons) navigates to the edit page for both matrices and option groups
</verification>

<success_criteria>
Both the matrices and option groups list pages show always-visible Duplicate and Delete action buttons on each card. Option groups uses the same ResourceList/ResourceItem card layout as matrices. All actions (duplicate, delete, navigate to edit) work correctly.
</success_criteria>

<output>
After completion, create `.planning/quick/5-show-duplicate-delete-actions-always-vis/005-SUMMARY.md`
</output>
