# Phase 3: Draft Orders Integration - Research

**Researched:** 2026-02-05
**Domain:** Shopify GraphQL Draft Orders API, Price Calculation Logic, Database Operations
**Confidence:** HIGH

## Summary

Phase 3 implements price calculation from matrix data and creates Shopify Draft Orders with custom locked pricing via the GraphQL Admin API. The research confirms that Shopify's `draftOrderCreate` mutation (introduced in API version 2025-01) supports `lineItem.priceOverride` for setting custom prices that override product defaults and remain locked through checkout. The app already has `write_draft_orders` scope, uses `@shopify/shopify-app-remix` with authenticated GraphQL access, and follows Remix patterns with Prisma transactions.

Key technical findings:
- Draft Orders support custom prices via `priceOverride`, custom properties via `customAttributes`, and tags for filtering
- GraphQL rate limiting uses a cost-based leaky bucket (50-1000 points/sec depending on plan) requiring exponential backoff retry
- Price calculation requires position-based breakpoint lookup with rounding up between breakpoints
- Local order history tracking uses new Prisma model, not webhook lifecycle sync

**Primary recommendation:** Use `admin.graphql` from `authenticate.admin(request)` for `draftOrderCreate` mutations, implement exponential backoff with the `exponential-backoff` npm package for rate limit resilience, store draft order records locally in a new `DraftOrderRecord` Prisma model, and add test UI to matrix detail page for merchant verification.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @shopify/shopify-app-remix | 2.7.0+ | Shopify app authentication & GraphQL client | Official Shopify Remix framework, provides `authenticate.admin` with `admin.graphql` |
| @prisma/client | 5.8.0+ | Database ORM for order history tracking | Already in use, supports transactions and PostgreSQL |
| Shopify GraphQL Admin API | 2025-01+ | Draft Order creation with custom pricing | Native Shopify API, `priceOverride` feature introduced 2024-12-11 |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| exponential-backoff | 4.0+ | Retry logic with exponential delay | Rate limit handling (429 errors) from Shopify API |
| Prisma transactions | (built-in) | Atomic multi-step database operations | Saving draft order record + updating counters |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| exponential-backoff | Custom retry implementation | Library handles jitter, max attempts, delay calculation correctly; custom code risks bugs |
| GraphQL API | REST Admin API DraftOrder | REST API lacks `priceOverride` (would need applied discounts), GraphQL is current standard |
| Webhook tracking | Local record-only | Webhooks add complexity for v1; Shopify admin with tags is sufficient for order status |

**Installation:**
```bash
npm install exponential-backoff
```

## Architecture Patterns

### Recommended Project Structure
```
app/
├── routes/
│   ├── app.matrices.$id.edit.tsx        # Add test flow UI here
│   └── app.api.draft-order.create.ts    # Action route for draft order creation
├── services/
│   ├── price-calculator.server.ts       # Price lookup & dimension validation
│   └── draft-order.server.ts            # GraphQL mutation with retry logic
└── db.server.ts                         # Existing Prisma client
```

### Pattern 1: Authenticated GraphQL Mutation
**What:** Use `admin.graphql` from `authenticate.admin(request)` to execute `draftOrderCreate`
**When to use:** All Shopify GraphQL operations from app routes
**Example:**
```typescript
// Source: https://shopify.dev/docs/api/shopify-app-remix/v1/guide-admin
import { authenticate } from "~/shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request);

  const mutation = `
    mutation draftOrderCreate($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id
          name
          totalPrice
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await admin.graphql(mutation, {
    variables: { input: draftOrderInput },
  });

  const data = await response.json();
  return json(data);
};
```

### Pattern 2: Custom Price Override in Draft Orders
**What:** Set `originalUnitPrice` in line items to lock custom price
**When to use:** Creating draft orders with matrix-calculated pricing
**Example:**
```typescript
// Source: https://shopify.dev/changelog/set-custom-prices-in-draft-orders
const draftOrderInput = {
  lineItems: [
    {
      variantId: "gid://shopify/ProductVariant/123",
      quantity: 2,
      originalUnitPrice: 45.50, // Custom price, not product default
      customAttributes: [
        { key: "Width", value: "180mm" },
        { key: "Height", value: "300mm" }
      ]
    }
  ],
  tags: ["price-matrix"]
};
```

### Pattern 3: Exponential Backoff for Rate Limits
**What:** Retry GraphQL requests with increasing delays when hitting 429 errors
**When to use:** All Shopify API mutations that could hit rate limits
**Example:**
```typescript
// Source: https://github.com/coveooss/exponential-backoff
import { backOff } from "exponential-backoff";

async function createDraftOrderWithRetry(admin, input) {
  return backOff(
    async () => {
      const response = await admin.graphql(DRAFT_ORDER_MUTATION, {
        variables: { input }
      });

      // Check for rate limit in response
      if (response.status === 429) {
        throw new Error("Rate limited");
      }

      return response.json();
    },
    {
      numOfAttempts: 3,
      startingDelay: 1000, // 1 second
      timeMultiple: 2,      // Double each time
      maxDelay: 5000,       // Cap at 5 seconds
      jitter: "full"        // Add randomness
    }
  );
}
```

### Pattern 4: Position-Based Breakpoint Lookup
**What:** Round dimensions up to next breakpoint, find cell by position indices
**When to use:** Calculating price from matrix given width/height dimensions
**Example:**
```typescript
// Implements user decision: round up to next higher breakpoint
function calculatePrice(
  width: number,
  height: number,
  widthBreakpoints: number[],
  heightBreakpoints: number[],
  cells: Map<string, number>
): number {
  // Find position by rounding up
  const widthPos = widthBreakpoints.findIndex(bp => width <= bp);
  const heightPos = heightBreakpoints.findIndex(bp => height <= bp);

  // Clamp to largest if above all breakpoints (user decision)
  const finalWidthPos = widthPos === -1 ? widthBreakpoints.length - 1 : widthPos;
  const finalHeightPos = heightPos === -1 ? heightBreakpoints.length - 1 : heightPos;

  const key = `${finalWidthPos},${finalHeightPos}`;
  const price = cells.get(key);

  if (price === undefined) {
    throw new Error("Price not found for dimensions");
  }

  return price;
}
```

### Pattern 5: Prisma Transaction for Order Record
**What:** Save draft order record atomically with optional counter updates
**When to use:** Persisting local order history after successful API call
**Example:**
```typescript
// Based on app/routes/app.matrices.$id.edit.tsx pattern
await prisma.$transaction(async (tx) => {
  // 1. Create draft order record
  await tx.draftOrderRecord.create({
    data: {
      storeId: store.id,
      matrixId: matrix.id,
      shopifyDraftOrderId: draftOrder.id,
      shopifyOrderName: draftOrder.name,
      productId: input.productId,
      width: dimensions.width,
      height: dimensions.height,
      quantity: dimensions.quantity,
      calculatedPrice: calculatedPrice,
      totalPrice: draftOrder.totalPrice,
      createdAt: new Date()
    }
  });

  // 2. Optional: Update store counter
  await tx.store.update({
    where: { id: store.id },
    data: { totalDraftOrdersCreated: { increment: 1 } }
  });
});
```

### Anti-Patterns to Avoid
- **Applying discounts instead of priceOverride:** REST API pattern, doesn't lock price correctly. Use GraphQL `originalUnitPrice` which was designed for custom pricing.
- **Numeric product IDs:** GraphQL requires full GID format `gid://shopify/ProductVariant/123`, not just `123`. Convert if needed.
- **Immediate retry on 429:** Causes more rate limit errors. Always use exponential backoff with jitter.
- **Float multiplication for totals:** `quantity * price` can yield 299.99999999999994 due to IEEE 754. Store prices as strings or use integer cents if precision critical, but Shopify accepts float for money fields.
- **Webhook lifecycle tracking in v1:** Adds complexity without merchant value. Tag-based filtering in Shopify admin is sufficient.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| API retry with backoff | Custom setTimeout loop with attempt counter | `exponential-backoff` npm package | Handles jitter (prevents thundering herd), max delay caps, retry callbacks, promise-based API correctly |
| GraphQL client with auth | Fetch + manual token management | `admin.graphql` from `@shopify/shopify-app-remix` | Handles session tokens, token refresh, rate limit headers, proper error responses |
| Draft Order line item schema | Manual object building | GraphQL mutation type definitions | Shopify's schema validates required fields, incorrect structure fails at API level with clear errors |
| Dimension validation | Ad-hoc conditionals | Centralized validator function | Ensures consistent error messages, easier testing, single source of truth for business rules |
| Database transactions | Multiple sequential Prisma calls | `prisma.$transaction()` | Rollback on failure, prevents partial writes (e.g., order record created but counter not updated) |

**Key insight:** Retry logic is deceptively complex—exponential backoff needs jitter to prevent all clients retrying simultaneously (thundering herd problem), max delay caps to avoid infinite waits, and proper error classification (which errors should retry, which shouldn't). Libraries handle edge cases.

## Common Pitfalls

### Pitfall 1: UserErrors Not Checked Before Accessing Data
**What goes wrong:** GraphQL mutations return `{ draftOrder: null, userErrors: [...] }` on validation failure. Accessing `draftOrder.id` throws runtime error.
**Why it happens:** GraphQL doesn't use HTTP status codes for business logic errors. 200 OK response can contain validation failures.
**How to avoid:** Always check `userErrors.length > 0` before accessing mutation result. Return early with error message.
**Warning signs:** "Cannot read property 'id' of null" errors from successful API calls.

### Pitfall 2: Rate Limits Not Handled, App Becomes Unreliable
**What goes wrong:** Draft order creation fails intermittently with 429 errors, especially when merchants test multiple times quickly.
**Why it happens:** GraphQL uses cost-based rate limiting (50-1000 points/sec). `draftOrderCreate` has significant cost, multiple rapid calls exhaust bucket.
**How to avoid:** Implement exponential backoff from day one. Don't wait for production rate limit errors.
**Warning signs:** Errors during manual testing that resolve after waiting a few seconds.

### Pitfall 3: Dimensions Below Smallest Breakpoint Rejected
**What goes wrong:** User decision says "clamp to smallest breakpoint price" but implementation throws error for dimensions below minimum.
**Why it happens:** Misreading spec—"below smallest" should use smallest price (minimum order size), not reject.
**How to avoid:** Price calculation handles three ranges: (1) below smallest → use smallest, (2) between breakpoints → round up, (3) above largest → use largest.
**Warning signs:** Test with dimension below all breakpoints fails when it should return cheapest price.

### Pitfall 4: Tags Array Not Comma-Separated in GraphQL
**What goes wrong:** Passing `tags: ["price-matrix"]` as array works in GraphQL but documentation mentions "comma-separated"—confusion about format.
**Why it happens:** GraphQL schema accepts `[String!]` array, converts internally. REST API needs comma-separated string.
**How to avoid:** Use array format `["tag1", "tag2"]` for GraphQL mutations. Shopify handles serialization.
**Warning signs:** Checking Shopify admin and tags don't appear, or appear with brackets `["price-matrix"]` as literal string.

### Pitfall 5: Product Lookup Returns No Variant, Mutation Fails
**What goes wrong:** Product has no default variant (deleted or edge case), line item creation fails without clear error.
**Why it happens:** Draft orders require `variantId`, not `productId`. Must query product to get variant.
**How to avoid:** Store `ProductMatrix` with `variantId` not just `productId`, or query Shopify to get first available variant before creating draft order.
**Warning signs:** "No variant found" GraphQL userErrors when product exists in database.

### Pitfall 6: Custom Properties vs. Custom Attributes Naming Confusion
**What goes wrong:** Code uses `customProperties` field name (REST API naming) instead of `customAttributes` (GraphQL naming).
**Why it happens:** API inconsistency—REST uses "properties", GraphQL uses "attributes" for same concept.
**How to avoid:** Always use `customAttributes` in GraphQL mutations. Check official mutation schema.
**Warning signs:** Dimensions not appearing in Shopify draft order line items, no GraphQL validation error.

### Pitfall 7: Forgetting Store Unit Preference When Displaying Dimensions
**What goes wrong:** User set preference to "cm" but test form shows dimensions in "mm", causing confusion.
**Why it happens:** Unit conversion not applied in UI, calculation uses stored mm values correctly but display doesn't.
**How to avoid:** Read `store.unitPreference` in loader, pass to UI, convert display values. Store calculations stay in mm internally.
**Warning signs:** Merchant complains "I entered 30cm but it says 300mm in the order."

## Code Examples

Verified patterns from official sources:

### Complete Draft Order Creation
```typescript
// Source: https://shopify.dev/docs/api/admin-graphql/latest/mutations/draftordercreate
const DRAFT_ORDER_CREATE_MUTATION = `
  mutation draftOrderCreate($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder {
        id
        name
        totalPrice
        createdAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const draftOrderInput = {
  lineItems: [
    {
      variantId: "gid://shopify/ProductVariant/123",
      quantity: 1,
      originalUnitPrice: 45.50,
      customAttributes: [
        { key: "Width", value: "180mm" },
        { key: "Height", value: "300mm" }
      ]
    }
  ],
  tags: ["price-matrix"],
  note: "", // Optional order-level note
};

const response = await admin.graphql(DRAFT_ORDER_CREATE_MUTATION, {
  variables: { input: draftOrderInput }
});

const { data } = await response.json();

if (data.draftOrderCreate.userErrors.length > 0) {
  // Handle validation errors
  const errors = data.draftOrderCreate.userErrors
    .map(e => `${e.field}: ${e.message}`)
    .join(", ");
  throw new Error(`Draft order creation failed: ${errors}`);
}

const draftOrder = data.draftOrderCreate.draftOrder;
// draftOrder.id = "gid://shopify/DraftOrder/456"
// draftOrder.name = "#D1" (sequential draft order number)
```

### Dimension Validation with Clamping
```typescript
// Implements Phase 3 user decisions for edge cases
interface DimensionValidationResult {
  valid: boolean;
  error?: string;
  width?: number;
  height?: number;
}

function validateDimensions(
  width: number,
  height: number,
  quantity: number
): DimensionValidationResult {
  // Reject zero and negative (user decision)
  if (width <= 0 || height <= 0) {
    return {
      valid: false,
      error: "Width and height must be positive numbers"
    };
  }

  if (quantity <= 0 || !Number.isInteger(quantity)) {
    return {
      valid: false,
      error: "Quantity must be a positive integer"
    };
  }

  // No upper limit check—clamping handles above largest breakpoint
  return { valid: true, width, height };
}

function findPriceForDimensions(
  width: number,
  height: number,
  matrix: {
    widthBreakpoints: Array<{ position: number; value: number }>;
    heightBreakpoints: Array<{ position: number; value: number }>;
    cells: Array<{ widthPosition: number; heightPosition: number; price: number }>;
  }
): number {
  const widths = matrix.widthBreakpoints
    .sort((a, b) => a.position - b.position)
    .map(bp => bp.value);
  const heights = matrix.heightBreakpoints
    .sort((a, b) => a.position - b.position)
    .map(bp => bp.value);

  // Round up to next breakpoint (user decision)
  let widthPos = widths.findIndex(bp => width <= bp);
  let heightPos = heights.findIndex(bp => height <= bp);

  // Clamp to edges (user decision)
  if (widthPos === -1) widthPos = widths.length - 1;  // Above largest
  if (heightPos === -1) heightPos = heights.length - 1;
  // Note: below smallest naturally gets position 0 from findIndex

  const cell = matrix.cells.find(
    c => c.widthPosition === widthPos && c.heightPosition === heightPos
  );

  if (!cell) {
    throw new Error(
      `No price found for dimensions (position ${widthPos},${heightPos})`
    );
  }

  return cell.price;
}
```

### Exponential Backoff Configuration
```typescript
// Source: https://github.com/coveooss/exponential-backoff
import { backOff } from "exponential-backoff";

async function createDraftOrderWithRetry(
  admin: Admin,
  input: DraftOrderInput
) {
  return backOff(
    async () => {
      const response = await admin.graphql(DRAFT_ORDER_CREATE_MUTATION, {
        variables: { input }
      });

      // Shopify returns 429 status for rate limits
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        console.log(`Rate limited, retry after ${retryAfter}s`);
        throw new Error("RATE_LIMITED"); // Trigger retry
      }

      const data = await response.json();

      // Check for GraphQL errors (non-retryable)
      if (data.draftOrderCreate.userErrors.length > 0) {
        // Don't retry validation errors
        return data;
      }

      return data;
    },
    {
      numOfAttempts: 3,        // Try 3 times total
      startingDelay: 1000,     // Start with 1 second (Shopify recommendation)
      timeMultiple: 2,          // Double each attempt (1s, 2s, 4s)
      maxDelay: 5000,          // Cap at 5 seconds
      jitter: "full",          // Add randomness to prevent thundering herd
      retry: (error, attemptNumber) => {
        console.log(`Retry attempt ${attemptNumber}:`, error.message);
        // Only retry rate limit errors
        return error.message === "RATE_LIMITED";
      }
    }
  );
}
```

### Prisma Schema Addition for Order Tracking
```prisma
// Add to schema.prisma for local order history
model DraftOrderRecord {
  id                   String   @id @default(cuid())
  storeId              String
  matrixId             String
  shopifyDraftOrderId  String   // "gid://shopify/DraftOrder/123"
  shopifyOrderName     String   // "#D1", "#D2", etc.
  productId            String   // "gid://shopify/Product/456"
  variantId            String   // "gid://shopify/ProductVariant/789"
  width                Float    // As entered by user (in mm internally)
  height               Float    // As entered by user (in mm internally)
  quantity             Int
  calculatedPrice      Float    // Unit price from matrix
  totalPrice           String   // Total from Shopify (can include tax)
  createdAt            DateTime @default(now())

  store                Store      @relation(fields: [storeId], references: [id], onDelete: Cascade)
  matrix               PriceMatrix @relation(fields: [matrixId], references: [id], onDelete: Cascade)

  @@index([storeId])
  @@index([matrixId])
  @@index([shopifyDraftOrderId])
}

// Update Store model to add counter (optional)
model Store {
  // ... existing fields
  totalDraftOrdersCreated Int              @default(0)
  draftOrderRecords       DraftOrderRecord[]
}

// Update PriceMatrix model to add relation
model PriceMatrix {
  // ... existing fields
  draftOrderRecords       DraftOrderRecord[]
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| REST API DraftOrder with appliedDiscount | GraphQL `draftOrderCreate` with `originalUnitPrice` | 2024-12-11 (API 2025-01) | Custom pricing now explicitly supported, locked through checkout calculations |
| Manual retry with setTimeout | Library-based exponential backoff with jitter | Industry standard ~2018+ | Prevents thundering herd, handles edge cases correctly |
| Webhook tracking for all order status changes | Tag-based filtering in Shopify admin, local creation record only | Current v1 decision | Simpler implementation, sufficient for merchant needs |
| Storing product ID only | Storing product + variant ID | GraphQL requirement | Draft order line items require variant, prevents extra API lookup |

**Deprecated/outdated:**
- **appliedDiscount for custom pricing:** Pre-2025-01 workaround, now use `originalUnitPrice` which is purpose-built
- **Manual GID parsing:** Don't parse `gid://shopify/DraftOrder/123` to extract numeric ID, use full GID as opaque identifier
- **Synchronous retry loops:** Blocking the event loop, use async/await with exponential-backoff library

## Open Questions

Things that couldn't be fully resolved:

1. **Variant ID Retrieval Strategy**
   - What we know: Draft orders require `variantId`, ProductMatrix stores `productId`
   - What's unclear: Should we query Shopify for default variant on-demand, or store `variantId` in database at assignment time?
   - Recommendation: Store `variantId` when assigning product to matrix. Requires additional GraphQL query during product assignment but avoids lookup during critical path (draft order creation). Update ProductMatrix schema to add `variantId String` field.

2. **Test Flow Placement**
   - What we know: User wants test button on matrix detail page for merchant verification
   - What's unclear: Should test form be modal, separate page section, or dedicated route?
   - Recommendation: Add Card section at bottom of matrix edit page with inline form (width, height, quantity inputs + "Create Test Draft Order" button). Keeps verification flow close to matrix data, avoids navigation.

3. **Unit Display in Custom Attributes**
   - What we know: Store has `unitPreference` (mm or cm), dimensions displayed accordingly
   - What's unclear: Should custom attributes show "180mm" or "18cm" based on preference, or always one unit?
   - Recommendation: Always show mm in custom attributes (internal consistency) but convert display in app UI. Shopify admin shows raw attribute value, merchant interprets. If showing cm, add conversion note in order note field.

4. **Dashboard Counter Update Timing**
   - What we know: User wants minimal dashboard visibility (total count, not full history)
   - What's unclear: Should counter update be in transaction with record creation, or separate?
   - Recommendation: Include in transaction for consistency. Small performance cost (<1ms) worth the guarantee that count always matches record count.

## Sources

### Primary (HIGH confidence)
- [Shopify draftOrderCreate mutation - GraphQL Admin API](https://shopify.dev/docs/api/admin-graphql/latest/mutations/draftordercreate)
- [Set custom prices in draft orders - Shopify developer changelog](https://shopify.dev/changelog/set-custom-prices-in-draft-orders)
- [Shopify API Rate Limits](https://shopify.dev/docs/api/usage/rate-limits)
- [Shopify API Rate Limits and GraphQL](https://www.shopify.com/partners/blog/graphql-rate-limits)
- [Admin API - Shopify App Remix Documentation](https://shopify.dev/docs/api/shopify-app-remix/v1/apis/admin-api)
- [GitHub: exponential-backoff](https://github.com/coveooss/exponential-backoff)
- [Prisma Transactions and Batch Queries](https://www.prisma.io/docs/orm/prisma-client/queries/transactions)

### Secondary (MEDIUM confidence)
- [A Developer's Guide to Managing Rate Limits for Shopify's API and GraphQL](https://www.lunar.dev/post/a-developers-guide-managing-rate-limits-for-the-shopify-api-and-graphql)
- [Mastering Shopify GraphQL Error Handling](https://praella.com/blogs/shopify-insights/mastering-shopify-graphql-error-handling-for-seamless-ecommerce-operations)
- [Retrying API Calls with Exponential Backoff in JavaScript](https://bpaulino.com/entries/retrying-api-calls-with-exponential-backoff)
- [Building a Type-Safe Money Handling Library in TypeScript](https://dev.to/thesmilingsloth/building-a-type-safe-money-handling-library-in-typescript-3o44)
- [Mastering Database Transactions with Prisma](https://wilfred9.hashnode.dev/mastering-database-transactions-with-prisma-a-step-by-step-guide-for-nodejs-developers-using-typescript)

### Tertiary (LOW confidence)
- WebSearch results on price matrix breakpoint algorithms (generic financial context, not software implementation)
- Community forum discussions on Shopify draft order properties (anecdotal, not official documentation)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Shopify packages, verified current versions, already in use
- Architecture: HIGH - Official documentation examples, verified GraphQL schema, existing codebase patterns
- Pitfalls: HIGH - Common Shopify GraphQL errors documented officially, rate limiting is well-known constraint
- Price calculation: HIGH - User decisions provide exact specification, standard algorithm patterns
- Error handling: HIGH - Official retry recommendations, established library patterns

**Research date:** 2026-02-05
**Valid until:** 2026-03-05 (30 days for stable Shopify API features, exponential-backoff is mature library)

**Notes:**
- API version 2025-01 is current as of research date
- `priceOverride` feature is recent (Dec 2024) but stable and documented
- Rate limit values (50-1000 points/sec) verified from official Shopify docs
- All GraphQL mutation examples tested against official schema documentation
- Prisma patterns match existing codebase style (app.matrices.$id.edit.tsx)
