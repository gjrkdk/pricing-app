# Phase 12: Admin UI for Option Groups - Research

**Researched:** 2026-02-09
**Domain:** Shopify Polaris admin UI, Remix forms, CRUD patterns, many-to-many relationships
**Confidence:** HIGH

## Summary

Phase 12 builds the merchant-facing admin UI for creating, editing, and managing option groups in the Shopify admin dashboard. This phase leverages the complete backend infrastructure from Phase 11 (Prisma models, service layer, validators) and focuses exclusively on the presentation and interaction layer using Shopify Polaris components and Remix routing patterns.

The research confirms that the existing codebase already demonstrates all required patterns: IndexTable for resource lists, Remix loader/action patterns for CRUD operations, useFetcher for in-page mutations, Modal confirmations for destructive actions, and Card/BlockStack layouts for forms. The app follows standard Shopify admin UX conventions established in the matrices CRUD implementation.

Key findings: (1) Polaris IndexTable with plain Button actions (not ResourceList) is the current standard for tabular CRUD interfaces; (2) Remix useFetcher enables optimistic UI and concurrent mutations without page navigation; (3) Modal components handle delete confirmations with critical tone for destructive actions; (4) Dynamic form fields (choices within option groups) can be managed with local React state and submitted as JSON via FormData; (5) Many-to-many relationships (products ↔ option groups) follow the same pattern as existing product-matrix assignments with conflict warnings.

**Primary recommendation:** Follow the existing matrices CRUD pattern (app.matrices._index.tsx, app.matrices.new.tsx, app.matrices.$id.edit.tsx) with IndexTable for lists, Modal for delete confirmations, BlockStack/Card layout for forms, and useFetcher for inline actions. Use local React state to manage dynamic choice arrays before form submission.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @shopify/polaris | 12.0.0 | Admin UI components | Official Shopify design system, already in use, provides IndexTable, Modal, Card, TextField, Button with consistent admin styling |
| @remix-run/react | 2.5.0 | Routing and data loading | Already in use, provides loader/action pattern, useFetcher for optimistic UI, Form component for progressive enhancement |
| @shopify/app-bridge-react | 4.1.2 | Embedded app integration | Required for embedded admin apps, provides navigation sync, resource pickers, toast notifications |
| Zod | 4.3.6 | Form validation | Already in use, runtime validation with TypeScript inference, reuses existing option-group validators from Phase 11 |
| React | 18.2.0 | UI state management | Already in use, local state for dynamic form fields (choices array), controlled components pattern |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @remix-run/node | 2.5.0 | Server-side utilities | json(), redirect() responses in loader/action functions |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| IndexTable | ResourceList | ResourceList is older pattern, IndexTable is current standard with better sorting/filtering support |
| useFetcher | useSubmit/Form | Form causes navigation, useFetcher enables in-page mutations with optimistic UI |
| Local state for choices | remix-validated-form | More complex library when simple local state + Zod validation is sufficient |
| Polaris Modal | App Bridge Modal | Polaris Modal is deprecated but still functional, App Bridge Modal recommended for new apps (migration can be deferred) |
| Manual JSON serialization | FormData arrays | FormData doesn't support nested arrays well, JSON serialization is simpler for complex nested data |

**Installation:**
```bash
# Already installed - no new dependencies required
npm install @shopify/polaris@^12.0.0 @remix-run/react@^2.5.0 @shopify/app-bridge-react@^4.1.2
```

## Architecture Patterns

### Recommended Project Structure

```
app/
├── routes/
│   ├── app.option-groups._index.tsx          # NEW: List all option groups (IndexTable)
│   ├── app.option-groups.new.tsx             # NEW: Create option group form
│   ├── app.option-groups.$id.edit.tsx        # NEW: Edit option group with choices
│   └── app.products.$id.option-groups.tsx    # NEW: Assign option groups to product
├── components/
│   └── OptionGroupPicker.tsx                 # NEW: Reusable component for assigning groups
└── services/
    └── option-group.server.ts                # EXISTS: Reuse from Phase 11
```

**Route organization:** Follow existing pattern where resource index/new/edit are top-level routes under `app.` prefix for admin navigation.

### Pattern 1: Remix Loader/Action Pattern for CRUD

**What:** Remix loaders fetch data server-side before render, actions handle form submissions, both run on the server with access to Prisma.

**When to use:** All CRUD operations - list, create, edit, delete option groups.

**Example:**
```typescript
// Source: Existing codebase app/routes/app.matrices._index.tsx

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const store = await prisma.store.findUnique({
    where: { shop: session.shop },
  });

  if (!store) {
    return json({ optionGroups: [] });
  }

  // Call Phase 11 service layer
  const optionGroups = await listOptionGroups(store.id);

  return json({ optionGroups });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    const id = formData.get("id");
    const store = await prisma.store.findUnique({
      where: { shop: session.shop },
    });

    // Call Phase 11 service layer
    await deleteOptionGroup(id, store.id);
    return json({ success: true });
  }

  return json({ error: "Invalid intent" }, { status: 400 });
};
```

### Pattern 2: IndexTable for Resource Lists with Inline Actions

**What:** IndexTable displays collections with sortable columns, inline action buttons for edit/delete.

**When to use:** List views for option groups showing name, requirement, choice count, product count.

**Example:**
```typescript
// Source: Existing codebase app/routes/app.matrices._index.tsx (adapted)

const rowMarkup = optionGroups.map((group, index) => (
  <IndexTable.Row
    id={group.id}
    key={group.id}
    position={index}
    onClick={() => navigate(`/app/option-groups/${group.id}/edit`)}
  >
    <IndexTable.Cell>
      <Text as="span" fontWeight="semibold">
        {group.name}
      </Text>
    </IndexTable.Cell>
    <IndexTable.Cell>
      {group.requirement === "REQUIRED" ? "Required" : "Optional"}
    </IndexTable.Cell>
    <IndexTable.Cell>
      {group._count.choices} choices
    </IndexTable.Cell>
    <IndexTable.Cell>
      {group._count.products} products
    </IndexTable.Cell>
    <IndexTable.Cell>
      <div onClick={(e) => e.stopPropagation()}>
        <InlineStack gap="300">
          <Button
            variant="plain"
            size="slim"
            onClick={() => navigate(`/app/option-groups/${group.id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="plain"
            size="slim"
            tone="critical"
            onClick={() => handleDeleteClick(group)}
          >
            Delete
          </Button>
        </InlineStack>
      </div>
    </IndexTable.Cell>
  </IndexTable.Row>
));

return (
  <Page
    title="Option Groups"
    primaryAction={{
      content: "Create option group",
      onAction: () => navigate("/app/option-groups/new"),
    }}
  >
    <Box paddingInline={{ xs: "200", md: "400" }}>
      <Card padding="0">
        <IndexTable
          resourceName={{ singular: "option group", plural: "option groups" }}
          itemCount={optionGroups.length}
          headings={[
            { title: "Name" },
            { title: "Type" },
            { title: "Choices" },
            { title: "Used by" },
            { title: "Actions" },
          ]}
          selectable={false}
          condensed
        >
          {rowMarkup}
        </IndexTable>
      </Card>
    </Box>
  </Page>
);
```

**Source:** [Index table — Shopify Polaris React](https://polaris-react.shopify.com/components/tables/index-table)

### Pattern 3: Modal Confirmation for Destructive Actions

**What:** Modal dialog with critical tone primary action for delete operations, shows impact (e.g., "Used by N products").

**When to use:** Delete option group (especially when assigned to products), unassign option groups.

**Example:**
```typescript
// Source: Existing codebase app/routes/app.matrices._index.tsx (adapted)

<Modal
  open={deleteModalOpen}
  onClose={() => setDeleteModalOpen(false)}
  title="Delete option group"
  primaryAction={{
    content: "Delete",
    onAction: handleDeleteConfirm,
    destructive: true,
  }}
  secondaryActions={[
    {
      content: "Cancel",
      onAction: () => setDeleteModalOpen(false),
    },
  ]}
>
  <Modal.Section>
    <BlockStack gap="200">
      <Text as="p">
        This will permanently delete the option group "{groupToDelete?.name}".
      </Text>
      {groupToDelete && groupToDelete.productCount > 0 && (
        <Text as="p" tone="critical">
          This option group is currently assigned to {groupToDelete.productCount}{" "}
          {groupToDelete.productCount === 1 ? "product" : "products"}. It will be removed from all products.
        </Text>
      )}
    </BlockStack>
  </Modal.Section>
</Modal>
```

**Best practices:**
- Use `destructive: true` on primary action for delete operations
- Show impact warning (product count) in critical tone
- Focus management: return focus to trigger button after close
- Polaris Modal is deprecated but still functional, App Bridge Modal is recommended alternative

**Sources:**
- [Modal — Shopify Polaris React](https://polaris-react.shopify.com/components/deprecated/modal)
- [Using modals in your app](https://shopify.dev/docs/api/app-bridge/using-modals-in-your-app)
- [Mastering Modal UX: Best Practices](https://www.eleken.co/blog-posts/modal-ux)

### Pattern 4: Dynamic Form Fields with Local State

**What:** Manage dynamic arrays (choices within option group) using React local state, serialize to JSON for form submission.

**When to use:** Forms where user adds/removes items (choices, assignments) before submission.

**Example:**
```typescript
// Pattern for managing dynamic choices

export default function NewOptionGroup() {
  const [name, setName] = useState("");
  const [requirement, setRequirement] = useState<"REQUIRED" | "OPTIONAL">("OPTIONAL");
  const [choices, setChoices] = useState<Choice[]>([
    { label: "", modifierType: "FIXED", modifierValue: 0, isDefault: false }
  ]);

  const addChoice = () => {
    setChoices([...choices, {
      label: "",
      modifierType: "FIXED",
      modifierValue: 0,
      isDefault: false
    }]);
  };

  const removeChoice = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const updateChoice = (index: number, field: keyof Choice, value: any) => {
    const updated = [...choices];
    updated[index] = { ...updated[index], [field]: value };
    setChoices(updated);
  };

  const handleSubmit = () => {
    const data = { name, requirement, choices };

    // Serialize to JSON for submission (FormData doesn't support nested arrays)
    fetcher.submit(
      { intent: "create", data: JSON.stringify(data) },
      { method: "post" }
    );
  };

  return (
    <Page title="Create option group">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <TextField
                label="Group name"
                value={name}
                onChange={setName}
                autoComplete="off"
              />

              <Select
                label="Requirement"
                options={[
                  { label: "Optional", value: "OPTIONAL" },
                  { label: "Required", value: "REQUIRED" },
                ]}
                value={requirement}
                onChange={(value) => setRequirement(value as "REQUIRED" | "OPTIONAL")}
              />

              <BlockStack gap="300">
                <Text as="h3" variant="headingSm">Choices</Text>
                {choices.map((choice, index) => (
                  <Card key={index}>
                    <BlockStack gap="300">
                      <InlineStack align="space-between">
                        <Text as="span" variant="bodyMd">Choice {index + 1}</Text>
                        {choices.length > 1 && (
                          <Button
                            variant="plain"
                            tone="critical"
                            onClick={() => removeChoice(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </InlineStack>

                      <TextField
                        label="Label"
                        value={choice.label}
                        onChange={(value) => updateChoice(index, "label", value)}
                        autoComplete="off"
                      />

                      <Select
                        label="Modifier type"
                        options={[
                          { label: "Fixed amount", value: "FIXED" },
                          { label: "Percentage", value: "PERCENTAGE" },
                        ]}
                        value={choice.modifierType}
                        onChange={(value) => updateChoice(index, "modifierType", value)}
                      />

                      <TextField
                        label="Modifier value"
                        type="number"
                        value={String(choice.modifierValue)}
                        onChange={(value) => updateChoice(index, "modifierValue", parseInt(value))}
                        autoComplete="off"
                        helpText={
                          choice.modifierType === "FIXED"
                            ? "Enter amount in cents (500 = $5.00)"
                            : "Enter percentage in basis points (1000 = 10%)"
                        }
                      />
                    </BlockStack>
                  </Card>
                ))}

                <Button onClick={addChoice}>Add choice</Button>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <InlineStack gap="300" align="end">
            <Button onClick={() => navigate("/app/option-groups")}>Cancel</Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={fetcher.state === "submitting"}
            >
              Create
            </Button>
          </InlineStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
```

**Why JSON serialization:** FormData supports flat key-value pairs but doesn't handle nested arrays elegantly. JSON serialization is cleaner for complex nested structures like `{ name, requirement, choices: [{}, {}, {}] }`.

**Sources:**
- [Arrays and nested data (Remix Validated Form)](https://www.remix-validated-form.io/arrays-and-nested)
- Existing codebase pattern in app/routes/app.matrices.$id.edit.tsx (serializes cells as JSON)

### Pattern 5: useFetcher for Inline Mutations Without Navigation

**What:** useFetcher enables form submissions that don't cause page navigation, supports optimistic UI and concurrent mutations.

**When to use:** Delete actions from index page, assign/unassign operations, any action that should update data without leaving the page.

**Example:**
```typescript
// Source: Existing codebase app/routes/app.matrices._index.tsx

const fetcher = useFetcher<typeof action>();

const handleDeleteClick = useCallback((group: OptionGroup) => {
  setGroupToDelete(group);
  setDeleteModalOpen(true);
}, []);

const handleDeleteConfirm = useCallback(() => {
  if (!groupToDelete) return;

  const formData = new FormData();
  formData.append("intent", "delete");
  formData.append("groupId", groupToDelete.id);
  fetcher.submit(formData, { method: "post" });

  setDeleteModalOpen(false);
  setGroupToDelete(null);
}, [groupToDelete, fetcher]);

// Check fetcher state for loading indicators
const isDeleting = fetcher.state === "submitting" &&
  fetcher.formData?.get("intent") === "delete";
```

**Optimistic UI pattern:**
```typescript
// Filter out deleted item optimistically
const visibleGroups = optionGroups.filter((group) => {
  if (fetcher.formData?.get("intent") === "delete") {
    return group.id !== fetcher.formData.get("groupId");
  }
  return true;
});
```

**Sources:**
- [useFetcher | Remix](https://remix.run/docs/en/main/hooks/use-fetcher)
- [Optimistic UI | Remix](https://remix.run/docs/en/main/guides/optimistic-ui)

### Pattern 6: Many-to-Many Relationship UI (Product ↔ Option Groups)

**What:** UI for assigning multiple option groups to a product, with display order control and conflict handling.

**When to use:** Product detail page showing assigned option groups, with add/remove actions.

**Example:**
```typescript
// Similar pattern to existing ProductPicker component

interface OptionGroupAssignment {
  id: string;
  optionGroupId: string;
  optionGroupName: string;
  requirement: string;
  choiceCount: number;
}

export default function ProductOptionGroups() {
  const { product, assignedGroups, availableGroups } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const [selectedGroupId, setSelectedGroupId] = useState("");

  const handleAssign = () => {
    if (!selectedGroupId) return;

    fetcher.submit(
      { intent: "assign", productId: product.productId, optionGroupId: selectedGroupId },
      { method: "post" }
    );

    setSelectedGroupId("");
  };

  const handleUnassign = (assignmentId: string) => {
    fetcher.submit(
      { intent: "unassign", assignmentId },
      { method: "post" }
    );
  };

  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h2" variant="headingMd">
            Option Groups
          </Text>
          <InlineStack gap="200">
            <Select
              label=""
              labelHidden
              options={[
                { label: "Select option group", value: "" },
                ...availableGroups.map((g) => ({
                  label: `${g.name} (${g.choiceCount} choices)`,
                  value: g.id
                }))
              ]}
              value={selectedGroupId}
              onChange={setSelectedGroupId}
            />
            <Button
              onClick={handleAssign}
              disabled={!selectedGroupId || assignedGroups.length >= 5}
            >
              Assign
            </Button>
          </InlineStack>
        </InlineStack>

        {assignedGroups.length >= 5 && (
          <Banner tone="warning">
            Maximum 5 option groups per product. Remove a group to assign another.
          </Banner>
        )}

        {assignedGroups.length > 0 ? (
          <BlockStack gap="200">
            {assignedGroups.map((assignment) => (
              <Card key={assignment.id}>
                <InlineStack align="space-between" blockAlign="center">
                  <BlockStack gap="100">
                    <Text as="span" variant="bodyMd" fontWeight="semibold">
                      {assignment.optionGroupName}
                    </Text>
                    <Text as="span" variant="bodySm" tone="subdued">
                      {assignment.requirement} • {assignment.choiceCount} choices
                    </Text>
                  </BlockStack>
                  <Button
                    variant="plain"
                    tone="critical"
                    onClick={() => handleUnassign(assignment.id)}
                  >
                    Remove
                  </Button>
                </InlineStack>
              </Card>
            ))}
          </BlockStack>
        ) : (
          <Text as="p" tone="subdued">
            No option groups assigned. Display order is alphabetical by group name.
          </Text>
        )}
      </BlockStack>
    </Card>
  );
}
```

**Key considerations:**
- Cap enforcement (5 groups max) shown with disabled state + banner
- Display order is alphabetical (Phase 11 decision) - no manual reordering UI needed
- No junction table ID exposure to frontend - use composite key (productId, optionGroupId)

**Source:** Existing codebase app/components/ProductPicker.tsx (similar pattern)

### Anti-Patterns to Avoid

- **Using ResourceList instead of IndexTable:** ResourceList is older pattern with limited features. IndexTable supports sorting, filtering, subheaders, and is the current Polaris standard for admin tables.

- **Page navigation for inline actions:** Don't use Form component (causes navigation) when useFetcher can handle mutations in-place. Navigation disrupts UX when merchant is working within a list.

- **Nested FormData encoding:** FormData doesn't support nested arrays/objects well. Attempting to encode `choices[0][label]` becomes messy and hard to validate. Use JSON serialization for complex nested structures.

- **Exposing internal IDs in URLs:** Don't expose auto-increment IDs (ProductOptionGroup.id) in UI or URLs. Use natural keys (productId + optionGroupId) for junction tables to avoid leaking implementation details.

- **Missing empty states:** Always provide empty states with clear CTAs (e.g., "No option groups yet. Create your first group to add choices to products.") Don't just render empty tables.

- **Ignoring fetcher.state for loading indicators:** Users need feedback when actions are processing. Check `fetcher.state === "submitting"` to show spinners/disabled states during mutations.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form validation | Custom validators | Zod schemas from Phase 11 | Already exists in `app/validators/option-group.validators.ts`, provides runtime + TypeScript type inference, composable refinements |
| Admin UI components | Custom CSS/components | Shopify Polaris | Official design system, accessibility built-in, matches Shopify admin aesthetic, constantly updated with best practices |
| Optimistic UI state | Manual state tracking | useFetcher with formData | Remix provides `fetcher.formData` automatically, handles race conditions, integrates with error boundaries |
| Nested form arrays | Custom array management | Local React state + JSON | Simple useState with array methods, serialize to JSON for submission - no library needed for this use case |
| Delete confirmations | Custom modal logic | Polaris Modal pattern | Standardized pattern with critical tone, proper focus management, consistent with Shopify admin UX |
| Resource pickers | Custom product selector | App Bridge resourcePicker | Shopify provides native product/collection/customer pickers with multi-select, filtering, search - far better than custom UI |

**Key insight:** Shopify has battle-tested patterns for every aspect of admin CRUD UIs. The existing matrices implementation demonstrates all patterns needed for Phase 12. Following these conventions ensures the feature feels native to Shopify admin and maintains accessibility/UX standards.

## Common Pitfalls

### Pitfall 1: FormData Nested Array Handling

**What goes wrong:** Attempting to submit dynamic choice arrays using FormData field naming like `choices[0][label]`, `choices[0][modifierType]` becomes verbose and error-prone. Reconstruction on server requires complex parsing logic.

**Why it happens:** Developers familiar with PHP-style form array conventions try to apply them to Remix, but TypeScript/JavaScript JSON is a better fit for nested structures.

**How to avoid:** Serialize complex nested data (option group with choices array) to JSON using `JSON.stringify()`, submit as single FormData field, parse with `JSON.parse()` in action, validate with Zod schema that already expects nested structure.

**Warning signs:**
- Verbose field names with brackets and indices
- Complex server-side reconstruction logic
- Difficulty applying Zod validation to reconstructed objects
- Losing type safety between client and server

**Example of better approach:**
```typescript
// Client-side: serialize to JSON
const data = { name, requirement, choices };
fetcher.submit(
  { intent: "create", data: JSON.stringify(data) },
  { method: "post" }
);

// Server-side: parse and validate
const dataStr = formData.get("data");
const data = JSON.parse(dataStr);
const validated = OptionGroupCreateSchema.parse(data); // Zod validation
```

**Sources:**
- [Arrays and nested data (Remix Validated Form)](https://www.remix-validated-form.io/arrays-and-nested)
- Existing pattern in app/routes/app.matrices.$id.edit.tsx

### Pitfall 2: Missing Cap Enforcement in UI

**What goes wrong:** Application-level caps (5 groups per product, 20 choices per group) are enforced in service layer but UI allows exceeding them, resulting in confusing validation errors after submission.

**Why it happens:** Developer focuses on server-side validation (which is correct) but forgets to provide client-side feedback and UI constraints.

**How to avoid:**
- Disable "Add choice" button when choices.length >= 20
- Disable "Assign group" button when assignedGroups.length >= 5
- Show Banner with warning tone explaining the limit
- Validate before submission with helpful error message

**Warning signs:**
- Users can add unlimited items in UI but get error on submit
- No visual indication of limits until submission fails
- Generic error messages without context

**Example:**
```typescript
<Button
  onClick={addChoice}
  disabled={choices.length >= 20}
>
  Add choice
</Button>

{choices.length >= 20 && (
  <Banner tone="warning">
    Maximum 20 choices per group. Remove a choice to add another.
  </Banner>
)}
```

### Pitfall 3: Inconsistent Empty States

**What goes wrong:** Empty tables/lists render with no content and no guidance, leaving merchants confused about next steps.

**Why it happens:** Developers focus on the populated state and forget to design for first-run experience.

**How to avoid:** Use Polaris EmptyState component with heading, description, and primary action for every list view. Match existing pattern from app.matrices._index.tsx.

**Warning signs:**
- Blank white space where content should be
- No call-to-action buttons in empty state
- Inconsistent messaging across different empty states

**Example:**
```typescript
if (optionGroups.length === 0) {
  return (
    <Page title="Option Groups">
      <EmptyState
        heading="Create your first option group"
        action={{
          content: "Create option group",
          onAction: () => navigate("/app/option-groups/new"),
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>
          Option groups let customers choose add-ons like size, material, or finish.
          Create groups with choices and assign them to products.
        </p>
      </EmptyState>
    </Page>
  );
}
```

**Source:** Existing pattern in app/routes/app.matrices._index.tsx

### Pitfall 4: Modal Focus Management After Deletion

**What goes wrong:** After deleting an item from a list, focus is lost or remains on a non-existent element, breaking keyboard navigation and accessibility.

**Why it happens:** Developer handles deletion but doesn't explicitly manage focus return.

**How to avoid:**
- Use refs to track focusable elements in list
- After successful deletion, focus first remaining item or create button
- Use setTimeout to wait for DOM update before focusing

**Warning signs:**
- Tab key doesn't move focus after delete
- Screen reader announces nothing after delete
- Keyboard users must restart navigation from top of page

**Example:**
```typescript
// Track refs for focus management
const rowRefs = useRef<Map<string, HTMLSpanElement>>(new Map());

useEffect(() => {
  if (fetcher.state === "idle" && fetcher.data && deletedGroupId) {
    if (optionGroups.length === 0) {
      // Focus create button in empty state
      setTimeout(() => {
        const emptyStateButton = document.getElementById("create-group-btn");
        if (emptyStateButton) {
          emptyStateButton.focus();
        }
      }, 100);
    } else {
      // Focus first remaining item
      const firstGroup = optionGroups[0];
      const rowElement = rowRefs.current.get(firstGroup.id);
      if (rowElement) {
        rowElement.focus();
      }
    }
    setDeletedGroupId(null);
  }
}, [fetcher.state, fetcher.data, deletedGroupId, optionGroups]);
```

**Source:** Existing pattern in app/routes/app.matrices._index.tsx

### Pitfall 5: Destructive Actions Without Confirmation

**What goes wrong:** Delete/unassign actions execute immediately without confirmation, leading to accidental data loss.

**Why it happens:** Developer prioritizes quick implementation over safety, or misunderstands severity of action.

**How to avoid:**
- Always use Modal confirmation for destructive actions (delete, remove assignment)
- Set `destructive: true` on primary action to show red styling
- Show impact in modal body (e.g., "Used by 3 products")
- Use critical tone for warning text

**Warning signs:**
- Delete button directly submits action
- No way to undo destructive actions
- User complaints about accidental deletions

**Example:**
```typescript
<Modal
  open={deleteModalOpen}
  onClose={() => setDeleteModalOpen(false)}
  title="Delete option group"
  primaryAction={{
    content: "Delete",
    onAction: handleDeleteConfirm,
    destructive: true, // REQUIRED for delete actions
  }}
  secondaryActions={[
    {
      content: "Cancel",
      onAction: () => setDeleteModalOpen(false),
    },
  ]}
>
  <Modal.Section>
    <BlockStack gap="200">
      <Text as="p">
        This will permanently delete "{groupToDelete?.name}".
      </Text>
      {groupToDelete.productCount > 0 && (
        <Text as="p" tone="critical">
          This group is assigned to {groupToDelete.productCount} products.
          It will be removed from all products.
        </Text>
      )}
    </BlockStack>
  </Modal.Section>
</Modal>
```

**Sources:**
- [Modal — Shopify Polaris React](https://polaris-react.shopify.com/components/deprecated/modal)
- [Mastering Modal UX: Best Practices](https://www.eleken.co/blog-posts/modal-ux)
- [Common actions — Shopify Polaris React](https://polaris-react.shopify.com/patterns/common-actions/overview)

### Pitfall 6: Race Conditions with Concurrent useFetcher Submissions

**What goes wrong:** Multiple fetchers submit simultaneously (e.g., deleting multiple items quickly), server processes out of order, UI shows stale data or incorrect state.

**Why it happens:** useFetcher enables concurrent mutations, but developer doesn't account for race conditions in optimistic UI or state updates.

**How to avoid:**
- Use unique fetcher keys when concurrent operations need isolation
- Check fetcher.state before allowing new submissions
- Let Remix revalidation handle data refetch after mutations
- Avoid manual state updates - rely on loader data

**Warning signs:**
- Stale data appears after actions complete
- Actions complete but UI doesn't update
- Submitting multiple actions causes incorrect state

**Example:**
```typescript
// Use keyed fetchers for isolation
const deleteFetcher = useFetcher({ key: "delete-option-group" });
const assignFetcher = useFetcher({ key: "assign-group" });

// Prevent duplicate submissions
const handleDelete = (id: string) => {
  if (deleteFetcher.state !== "idle") return; // Already submitting

  deleteFetcher.submit(
    { intent: "delete", id },
    { method: "post" }
  );
};

// Let Remix handle revalidation automatically after action completes
// Don't manually update state - loader will refetch fresh data
```

**Source:** [useFetcher | Remix](https://remix.run/docs/en/main/hooks/use-fetcher)

## Code Examples

Verified patterns from existing codebase and official sources:

### Complete Index Page (List View)

```typescript
// Source: app/routes/app.matrices._index.tsx (adapted for option groups)

import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate, useFetcher } from "@remix-run/react";
import {
  Page,
  Box,
  Card,
  EmptyState,
  IndexTable,
  Text,
  Modal,
  BlockStack,
  InlineStack,
  Button,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { authenticate } from "~/shopify.server";
import { prisma } from "~/db.server";
import {
  listOptionGroups,
  deleteOptionGroup,
  countProductsUsingGroup,
} from "~/services/option-group.server";

interface OptionGroup {
  id: string;
  name: string;
  requirement: string;
  choiceCount: number;
  productCount: number;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);

  const store = await prisma.store.findUnique({
    where: { shop: session.shop },
  });

  if (!store) {
    return json({ optionGroups: [] });
  }

  const optionGroups = await listOptionGroups(store.id);

  const serialized: OptionGroup[] = optionGroups.map((group) => ({
    id: group.id,
    name: group.name,
    requirement: group.requirement,
    choiceCount: group._count.choices,
    productCount: group._count.products,
  }));

  return json({ optionGroups: serialized });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");
  const groupId = formData.get("groupId");

  if (!groupId || typeof groupId !== "string") {
    return json({ error: "Group ID is required" }, { status: 400 });
  }

  const store = await prisma.store.findUnique({
    where: { shop: session.shop },
  });

  if (!store) {
    return json({ error: "Store not found" }, { status: 404 });
  }

  if (intent === "delete") {
    const result = await deleteOptionGroup(groupId, store.id);
    if (!result) {
      return json({ error: "Option group not found" }, { status: 404 });
    }
    return json({ success: true });
  }

  return json({ error: "Invalid intent" }, { status: 400 });
};

export default function OptionGroupsIndex() {
  const { optionGroups } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof action>();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<OptionGroup | null>(null);

  const handleDeleteClick = useCallback((group: OptionGroup) => {
    setGroupToDelete(group);
    setDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (!groupToDelete) return;

    const formData = new FormData();
    formData.append("intent", "delete");
    formData.append("groupId", groupToDelete.id);
    fetcher.submit(formData, { method: "post" });

    setDeleteModalOpen(false);
    setGroupToDelete(null);
  }, [groupToDelete, fetcher]);

  if (optionGroups.length === 0) {
    return (
      <Page title="Option Groups">
        <EmptyState
          heading="Create your first option group"
          action={{
            content: "Create option group",
            onAction: () => navigate("/app/option-groups/new"),
            id: "create-group-btn",
          }}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <p>
            Option groups let customers choose add-ons like size, material, or finish.
            Create groups with choices and assign them to products.
          </p>
        </EmptyState>
      </Page>
    );
  }

  const rowMarkup = optionGroups.map((group, index) => (
    <IndexTable.Row
      id={group.id}
      key={group.id}
      position={index}
      onClick={() => navigate(`/app/option-groups/${group.id}/edit`)}
    >
      <IndexTable.Cell>
        <Text as="span" fontWeight="semibold">
          {group.name}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        {group.requirement === "REQUIRED" ? "Required" : "Optional"}
      </IndexTable.Cell>
      <IndexTable.Cell>
        {group.choiceCount} {group.choiceCount === 1 ? "choice" : "choices"}
      </IndexTable.Cell>
      <IndexTable.Cell>
        {group.productCount} {group.productCount === 1 ? "product" : "products"}
      </IndexTable.Cell>
      <IndexTable.Cell>
        <div onClick={(e) => e.stopPropagation()}>
          <InlineStack gap="300">
            <Button
              variant="plain"
              size="slim"
              onClick={() => navigate(`/app/option-groups/${group.id}/edit`)}
            >
              Edit
            </Button>
            <Button
              variant="plain"
              size="slim"
              tone="critical"
              onClick={() => handleDeleteClick(group)}
            >
              Delete
            </Button>
          </InlineStack>
        </div>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Page
      title="Option Groups"
      primaryAction={{
        content: "Create option group",
        onAction: () => navigate("/app/option-groups/new"),
      }}
    >
      <Box paddingInline={{ xs: "200", md: "400" }}>
        <Card padding="0">
          <IndexTable
            resourceName={{ singular: "option group", plural: "option groups" }}
            itemCount={optionGroups.length}
            headings={[
              { title: "Name" },
              { title: "Type" },
              { title: "Choices" },
              { title: "Used by" },
              { title: "Actions" },
            ]}
            selectable={false}
            condensed
          >
            {rowMarkup}
          </IndexTable>
        </Card>
      </Box>

      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete option group"
        primaryAction={{
          content: "Delete",
          onAction: handleDeleteConfirm,
          destructive: true,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: () => setDeleteModalOpen(false),
          },
        ]}
      >
        <Modal.Section>
          <BlockStack gap="200">
            <Text as="p">
              This will permanently delete the option group "{groupToDelete?.name}".
            </Text>
            {groupToDelete && groupToDelete.productCount > 0 && (
              <Text as="p" tone="critical">
                This option group is assigned to {groupToDelete.productCount}{" "}
                {groupToDelete.productCount === 1 ? "product" : "products"}.
                It will be removed from all products.
              </Text>
            )}
          </BlockStack>
        </Modal.Section>
      </Modal>
    </Page>
  );
}
```

### Dynamic Form with Nested Choices

```typescript
// Pattern for create/edit forms with dynamic choice array

import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useNavigate, useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  TextField,
  Select,
  Button,
  BlockStack,
  InlineStack,
  Text,
  Banner,
  Checkbox,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { authenticate } from "~/shopify.server";
import { prisma } from "~/db.server";
import { createOptionGroup } from "~/services/option-group.server";
import {
  OptionGroupCreateSchema,
  type OptionChoiceInput,
} from "~/validators/option-group.validators";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();

  const dataStr = formData.get("data");
  if (!dataStr || typeof dataStr !== "string") {
    return json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    const data = JSON.parse(dataStr);
    const validated = OptionGroupCreateSchema.parse(data);

    const store = await prisma.store.findUnique({
      where: { shop: session.shop },
    });

    if (!store) {
      return json({ error: "Store not found" }, { status: 404 });
    }

    const optionGroup = await createOptionGroup(store.id, validated);

    return redirect(`/app/option-groups/${optionGroup.id}/edit`);
  } catch (error) {
    if (error instanceof Error) {
      return json({ error: error.message }, { status: 400 });
    }
    return json({ error: "Validation failed" }, { status: 400 });
  }
};

type Choice = Omit<OptionChoiceInput, "id">;

export default function NewOptionGroup() {
  const navigate = useNavigate();
  const fetcher = useFetcher<typeof action>();

  const [name, setName] = useState("");
  const [requirement, setRequirement] = useState<"REQUIRED" | "OPTIONAL">("OPTIONAL");
  const [choices, setChoices] = useState<Choice[]>([
    { label: "", modifierType: "FIXED", modifierValue: 0, isDefault: false }
  ]);

  const addChoice = useCallback(() => {
    setChoices([...choices, {
      label: "",
      modifierType: "FIXED",
      modifierValue: 0,
      isDefault: false
    }]);
  }, [choices]);

  const removeChoice = useCallback((index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
  }, [choices]);

  const updateChoice = useCallback((index: number, field: keyof Choice, value: any) => {
    const updated = [...choices];
    updated[index] = { ...updated[index], [field]: value };
    setChoices(updated);
  }, [choices]);

  const handleSubmit = useCallback(() => {
    const data = { name, requirement, choices };

    fetcher.submit(
      { data: JSON.stringify(data) },
      { method: "post" }
    );
  }, [name, requirement, choices, fetcher]);

  const isSubmitting = fetcher.state === "submitting";
  const actionData = fetcher.data;

  return (
    <Page
      title="Create option group"
      backAction={{ onAction: () => navigate("/app/option-groups") }}
    >
      <Layout>
        {actionData && "error" in actionData && (
          <Layout.Section>
            <Banner tone="critical">{actionData.error}</Banner>
          </Layout.Section>
        )}

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <TextField
                label="Group name"
                value={name}
                onChange={setName}
                autoComplete="off"
                maxLength={100}
                placeholder="e.g., Material, Size, Finish"
                helpText="Choose a descriptive name for this option group"
                requiredIndicator
              />

              <Select
                label="Requirement"
                options={[
                  { label: "Optional - customers can skip", value: "OPTIONAL" },
                  { label: "Required - customers must select", value: "REQUIRED" },
                ]}
                value={requirement}
                onChange={(value) => setRequirement(value as "REQUIRED" | "OPTIONAL")}
                helpText={
                  requirement === "REQUIRED"
                    ? "Customers must select a choice from this group"
                    : "Customers can skip this group (optional groups support default choice)"
                }
              />
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="h2" variant="headingMd">
                  Choices
                </Text>
                <Button onClick={addChoice} disabled={choices.length >= 20}>
                  Add choice
                </Button>
              </InlineStack>

              {choices.length >= 20 && (
                <Banner tone="warning">
                  Maximum 20 choices per group. Remove a choice to add another.
                </Banner>
              )}

              <BlockStack gap="300">
                {choices.map((choice, index) => (
                  <Card key={index}>
                    <BlockStack gap="300">
                      <InlineStack align="space-between" blockAlign="center">
                        <Text as="span" variant="bodyMd" fontWeight="semibold">
                          Choice {index + 1}
                        </Text>
                        {choices.length > 1 && (
                          <Button
                            variant="plain"
                            tone="critical"
                            onClick={() => removeChoice(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </InlineStack>

                      <TextField
                        label="Label"
                        value={choice.label}
                        onChange={(value) => updateChoice(index, "label", value)}
                        autoComplete="off"
                        maxLength={100}
                        placeholder="e.g., Premium Glass, Standard Glass"
                        requiredIndicator
                      />

                      <Select
                        label="Modifier type"
                        options={[
                          { label: "Fixed amount (e.g., +$5.00)", value: "FIXED" },
                          { label: "Percentage (e.g., +10%)", value: "PERCENTAGE" },
                        ]}
                        value={choice.modifierType}
                        onChange={(value) => updateChoice(index, "modifierType", value)}
                      />

                      <TextField
                        label="Modifier value"
                        type="number"
                        value={String(choice.modifierValue)}
                        onChange={(value) => updateChoice(index, "modifierValue", parseInt(value) || 0)}
                        autoComplete="off"
                        helpText={
                          choice.modifierType === "FIXED"
                            ? "Enter amount in cents (500 = $5.00). Negative values allowed for discounts."
                            : "Enter percentage in basis points (1000 = 10%). Negative values allowed for discounts."
                        }
                      />

                      {requirement === "OPTIONAL" && (
                        <Checkbox
                          label="Set as default choice"
                          checked={choice.isDefault}
                          onChange={(checked) => updateChoice(index, "isDefault", checked)}
                          helpText="Optional groups can have one default choice pre-selected"
                        />
                      )}
                    </BlockStack>
                  </Card>
                ))}
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <InlineStack gap="300" align="end">
            <Button onClick={() => navigate("/app/option-groups")}>Cancel</Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={!name.trim() || choices.length === 0}
            >
              Create option group
            </Button>
          </InlineStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| ResourceList | IndexTable | Polaris 8.0+ (2022) | IndexTable supports sorting, filtering, subheaders - better for admin tables |
| @shopify/react-form | Zod + local state | 2025+ | react-form deprecated, ecosystem moved to Zod/React Hook Form |
| Polaris Modal | App Bridge Modal | 2024+ | Polaris Modal deprecated, App Bridge Modal recommended (but Polaris Modal still works) |
| Implicit form arrays | JSON serialization | Best practice | FormData doesn't handle nested arrays well, JSON is cleaner for complex structures |
| Manual state updates | Remix revalidation | Remix 2.0+ (2023) | Let Remix refetch loader data automatically after mutations instead of manual state management |
| Page navigation for actions | useFetcher | Remix 1.0+ (2021) | useFetcher enables optimistic UI and concurrent mutations without navigation |

**Deprecated/outdated:**
- **@shopify/react-form:** No longer maintained as of 2025. Use Zod for validation with Remix forms or consider React Hook Form for complex scenarios.
- **ResourceList for tables:** Still works but IndexTable is the recommended component for admin data tables since Polaris 8.0.
- **Polaris Modal:** Deprecated in favor of App Bridge modals, but still functional. Migration can be deferred until App Bridge Modal patterns are stable in the codebase.
- **FormData array encoding:** Never worked well for nested structures. JSON serialization has become standard practice for complex form data in Remix apps.

## Open Questions

1. **Should we implement App Bridge Modal or stick with Polaris Modal?**
   - What we know: Polaris Modal is deprecated, App Bridge Modal is recommended, but Polaris Modal still works and is used throughout existing codebase.
   - What's unclear: Migration effort vs. benefit, stability of App Bridge Modal patterns.
   - Recommendation: Use Polaris Modal for Phase 12 to match existing codebase patterns. Plan migration to App Bridge Modal in a future refactoring phase once it's standardized across the app.

2. **Should we add toast notifications for success actions?**
   - What we know: Shopify admin typically shows toast notifications for successful saves/deletes. App Bridge provides toast API.
   - What's unclear: Existing codebase doesn't use toasts consistently for matrix operations.
   - Recommendation: Add toast notifications for create/update/delete success to match Shopify admin UX conventions. Use `shopify.toast.show()` from App Bridge.

3. **Should product → option group assignment be a separate route or inline on product page?**
   - What we know: Product-matrix assignment is handled inline on matrix edit page. Many-to-many relationships can be managed from either side.
   - What's unclear: Best UX for merchants - manage assignments from product page vs. option group page.
   - Recommendation: Create dedicated route `/app/products/:id/option-groups` for managing assignments per product. This matches the "products using this group" count shown in option group list, making the relationship bidirectional and discoverable.

4. **How to handle display order when alphabetical?**
   - What we know: Phase 11 decision: display order is alphabetical by group name, no manual reordering.
   - What's unclear: Do we need to show/mention alphabetical ordering in UI?
   - Recommendation: Add help text on product assignment page: "Groups are displayed alphabetically by name on the product page." No reordering UI needed, but documentation helps set expectations.

5. **Should we show preview of price calculations in admin UI?**
   - What we know: Phase 11 includes price calculator, Phase 14 will show calculations in customer-facing widget.
   - What's unclear: Whether merchants need to see example calculations while editing option groups.
   - Recommendation: Out of scope for Phase 12. Price preview could be added in Phase 13 (API) or Phase 14 (widget) if testing reveals merchant confusion about modifier calculations.

## Sources

### Primary (HIGH confidence)

- [Index table — Shopify Polaris React](https://polaris-react.shopify.com/components/tables/index-table)
- [Modal — Shopify Polaris React](https://polaris-react.shopify.com/components/deprecated/modal)
- [Resource index layout — Shopify Polaris React](https://polaris-react.shopify.com/patterns/resource-index-layout)
- [useFetcher | Remix](https://remix.run/docs/en/main/hooks/use-fetcher)
- [Optimistic UI | Remix](https://remix.run/docs/en/main/guides/optimistic-ui)
- [Build a Shopify app using Remix](https://shopify.dev/docs/apps/build/build?framework=remix)
- [About Shopify App Bridge](https://shopify.dev/docs/api/app-bridge)
- Existing codebase: app/routes/app.matrices._index.tsx, app/routes/app.matrices.new.tsx, app/routes/app.matrices.$id.edit.tsx, app/components/ProductPicker.tsx

### Secondary (MEDIUM confidence)

- [Arrays and nested data (Remix Validated Form)](https://www.remix-validated-form.io/arrays-and-nested)
- [Using modals in your app](https://shopify.dev/docs/api/app-bridge/using-modals-in-your-app)
- [Common actions — Shopify Polaris React](https://polaris-react.shopify.com/patterns/common-actions/overview)
- [Action list — Shopify Polaris React](https://polaris-react.shopify.com/components/lists/action-list?example=action-list-with-destructive-item)
- [Mastering Modal UX: Best Practices](https://www.eleken.co/blog-posts/modal-ux)
- [What's the best tech stack to handle forms and validation in a Shopify app in 2025?](https://community.shopify.dev/t/what-s-the-best-tech-stack-to-handle-forms-and-validation-in-a-shopify-app-in-2025/22274)
- [Getting started with App Bridge React](https://shopify.dev/docs/api/app-bridge/previous-versions/app-bridge-from-npm/using-react)

### Tertiary (LOW confidence)

None - all key findings verified with official documentation or existing codebase patterns.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already in use, versions verified from package.json
- Architecture: HIGH - Patterns verified from existing codebase (matrices CRUD) and official Shopify/Remix docs
- Pitfalls: HIGH - Documented in official sources and observable in existing codebase patterns

**Research date:** 2026-02-09
**Valid until:** 2026-03-09 (30 days - UI frameworks evolve faster than backend, Polaris updates regularly)
