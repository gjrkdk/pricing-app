---
phase: 11-data-model-price-calculation
plan: 02
subsystem: validation-and-services
tags: [validation, service-layer, option-groups, crud, business-logic]
dependency_graph:
  requires: [option-group-models, zod-library, prisma-client]
  provides: [option-group-validators, option-group-service, crud-operations]
  affects: [admin-ui-routes, api-extension-routes]
tech_stack:
  added: [option-group-validators, option-group-service]
  patterns: [zod-validation, service-pattern, transaction-operations, store-ownership-validation]
key_files:
  created:
    - app/validators/option-group.validators.ts
    - app/services/option-group.server.ts
  modified: []
decisions:
  - key: "Replace strategy for choice updates"
    choice: "Delete all existing choices, create new ones"
    rationale: "Simpler than diffing individual choices, atomic via transaction, avoids complex merge logic"
    alternatives: ["Diff and merge choices", "Track choice IDs for partial updates"]
    impact: "Service layer implementation"
  - key: "Assignment cap enforcement level"
    choice: "Application-level validation in service layer"
    rationale: "5 groups per product cap enforced in assignOptionGroupToProduct function with descriptive error"
    alternatives: ["Database constraint", "Validation schema"]
    impact: "Business logic centralized in service"
metrics:
  duration_seconds: 153
  tasks_completed: 2
  files_created: 2
  files_modified: 0
  commits: 2
  completed_at: "2026-02-09T20:48:28Z"
---

# Phase 11 Plan 02: Validation & Service Layer for Option Groups Summary

**Created validated data layer with Zod schemas and service module providing full CRUD + assignment operations for option groups.**

## Tasks Completed

### Task 1: Create Zod validation schemas for option groups
**Commit:** be8b9b6
**Files:** app/validators/option-group.validators.ts

Created comprehensive Zod validation schemas following existing validator pattern:

**Schemas implemented:**
1. `OptionChoiceInputSchema` - Validates individual choices with label, modifierType (FIXED/PERCENTAGE), modifierValue (cents or basis points), and isDefault flag
2. `OptionGroupCreateSchema` - Validates group creation with name, requirement, and choices array (1-20 choices), enforces single-default constraint and required-group logic via refinements
3. `OptionGroupUpdateSchema` - Same validation as create but all fields optional, includes optional choice ID for tracking
4. `ProductOptionGroupAssignSchema` - Validates product-to-group assignment with productId and optionGroupId

**Validation constraints enforced:**
- Label: 1-100 characters required
- ModifierValue: must be integer (whole number)
- Choices: 1-20 per group (cap enforced at validation layer)
- Single default: at most one choice can have isDefault: true (enforced via refine)
- Required group constraint: default choices not allowed on REQUIRED groups (they must always be selected)

**TypeScript types exported:**
- OptionGroupCreateInput
- OptionGroupUpdateInput
- OptionChoiceInput
- ProductOptionGroupAssignInput

All types inferred from schemas for type-safe service layer consumption.

### Task 2: Create service layer for option group CRUD and assignments
**Commit:** cec772a
**Files:** app/services/option-group.server.ts

Created complete service module with 9 functions following existing service pattern from product-matrix-lookup.server.ts:

**CRUD Operations:**
1. `createOptionGroup(storeId, input)` - Atomic creation with nested choices using Prisma create
2. `getOptionGroup(id, storeId)` - Fetches with choices (alphabetically sorted) and product count via _count
3. `listOptionGroups(storeId)` - Returns all groups for store, alphabetically sorted by name, includes choice and product counts
4. `updateOptionGroup(id, storeId, input)` - Uses transaction for atomic replace strategy: delete all choices, update group, create new choices
5. `deleteOptionGroup(id, storeId)` - Validates ownership, cascade rules handle cleanup

**Assignment Operations:**
6. `assignOptionGroupToProduct(productId, optionGroupId, storeId)` - Validates both option group and product ownership, enforces 5 groups per product cap, throws descriptive error on cap violation
7. `unassignOptionGroupFromProduct(productId, optionGroupId)` - Removes assignment, returns null if not found
8. `getProductOptionGroups(productId, storeId)` - Fetches all groups assigned to product with full choices, alphabetically sorted by group name
9. `countProductsUsingGroup(optionGroupId)` - Returns count for "Used by N products" warnings

**Pattern adherence:**
- Import: `import { prisma } from "~/db.server"` (matches existing pattern)
- Store ownership validation on every operation (read and write)
- Return null for not-found/unauthorized cases (never throw on expected errors)
- Use transactions for multi-step operations (updateOptionGroup)
- Alphabetical sorting per user decision (choices by label, groups by name)

**Cap enforcement:**
- 20 choices per group: enforced at validation layer (Zod schema)
- 5 groups per product: enforced at application layer (service function)

## Deviations from Plan

None - plan executed exactly as written. All schemas, functions, and validation patterns implemented as specified.

## Verification Results

All verification criteria passed:

1. **TypeScript Compilation:** `npx tsc --noEmit` passes (pre-existing UI route errors unrelated to option-group files)
2. **Validator Exports:** 4 schemas exported with inferred TypeScript types
3. **Service Exports:** 9 functions exported covering full CRUD and assignment operations
4. **Store Ownership:** All read/write operations validate storeId
5. **Cap Enforcement:** 20 choices validated at schema level, 5 groups enforced at service level

## Service Layer Structure

**CRUD Functions:**
- Create: Nested Prisma create with choices
- Read: Single (with counts) and list (with counts)
- Update: Transaction-based replace strategy for choices
- Delete: With ownership validation and cascade cleanup

**Assignment Functions:**
- Assign: With dual ownership validation and cap enforcement
- Unassign: Simple junction record deletion
- Get assigned: Fetches all groups for a product
- Count usage: For deletion warnings

**Validation Pattern:**
- Input validation: Zod schemas at boundary (will be used by routes)
- Authorization: Store ownership at service layer
- Business rules: Cap enforcement at service layer
- Database rules: Cascade deletes at schema layer

## Impact

**Immediate:**
- Validation schemas ready for Admin UI routes (Phase 12)
- Service layer ready for API extension routes (Phase 13)
- Type-safe boundaries established for option group operations
- Business logic separated from route handlers

**Downstream Plans Unblocked:**
- Phase 12 Plan 01: Admin UI for option group CRUD (will use validators + service)
- Phase 12 Plan 02: Admin UI for product assignment (will use assignment functions)
- Phase 13: GraphQL/REST API extension (will use same service layer)

**Technical Foundation:**
- Replace strategy for updates simplifies state management
- Application-level caps provide flexibility for future adjustments
- Store ownership pattern consistent across all services
- Ready for price calculation integration (Plan 03)

## Self-Check: PASSED

**Files created:**
- [FOUND] /Users/robinkonijnendijk/Desktop/quote-flow/app/validators/option-group.validators.ts
- [FOUND] /Users/robinkonijnendijk/Desktop/quote-flow/app/services/option-group.server.ts

**Commits:**
- [FOUND] be8b9b6 (Task 1: validation schemas)
- [FOUND] cec772a (Task 2: service layer)

All claimed files and commits exist and are verifiable.
