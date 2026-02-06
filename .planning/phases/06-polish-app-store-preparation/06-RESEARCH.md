# Phase 6: Polish & App Store Preparation - Research

**Researched:** 2026-02-06
**Domain:** Shopify App Store submission, accessibility, CSV import, responsive design
**Confidence:** HIGH

## Summary

Phase 6 prepares the app for Shopify App Store submission by implementing CSV matrix import, responsive UI for desktop and tablet, WCAG 2.1 AA accessibility compliance, and security review readiness.

The standard approach combines proven Node.js CSV parsing (csv-parse), Polaris responsive components (Grid, BlockStack), W3C ARIA grid patterns for keyboard navigation, and Shopify's mandatory compliance requirements (session tokens, GDPR webhooks, appropriate scopes).

The app already has critical security foundations in place: GDPR webhooks implemented, session token handling via @shopify/shopify-app-remix, and minimal scopes (write_draft_orders, read_products, write_products). The polish phase focuses on user-facing quality, bulk operations, and App Store listing preparation.

**Primary recommendation:** Use csv-parse with skip_records_with_error for graceful CSV validation, Polaris Grid with breakpoint-specific columns for responsive layouts, ARIA grid role with full keyboard navigation for the matrix editor, and follow Shopify's App Store listing best practices for screenshots and copy.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**CSV Import Experience:**
- Simple 3-column format: width, height, price — system infers the grid from unique values
- Import option lives on the create matrix page alongside existing template choices (Small, Medium, Custom)
- Preview step before creation: show the parsed grid with row/error counts, merchant confirms or cancels
- Inline row errors: show all valid rows in preview + highlight invalid rows with specific error messages (e.g., "row 5: price is not a number")
- CSV import is a paid-tier feature (freemium gate)

**Responsive Layout:**
- Priority devices: desktop + tablet (phone is low priority)
- Matrix grid editor: horizontal scroll on small screens — keep grid as-is, allow scrolling
- Dashboard and matrix list: single column stack on tablet — cards and tables go full-width vertically
- Breakpoint management (add/remove) accessible on tablet — merchants may manage matrices on the go

**Accessibility (WCAG 2.1 AA):**
- Full spreadsheet keyboard navigation in matrix grid: arrow keys move between cells, Tab moves to next cell, Enter confirms edit
- Screen reader support via proper `<th>` headers — screen readers auto-announce row/column context (standard table a11y)
- Color contrast: audit custom elements only (grid cells, validation highlights) — trust Polaris defaults for standard components
- Focus management: standard a11y patterns — after delete focus moves to next item or empty state, after create focus moves to new matrix editor

**App Store Listing:**
- App name: "Price Matrix"
- Tone: friendly and accessible — speaks to all merchants, emphasizes ease of use and simple pricing
- Pricing model: freemium
  - Free tier: 1 matrix with full functionality (assign products, widget, draft orders)
  - Paid tier ($9-15/mo): unlimited matrices + CSV import

### Claude's Discretion

- Exact paid tier price point within $9-15/mo range
- App Store description copy and keyword optimization
- Screenshot composition and sequence
- Security review checklist implementation details
- CSV file size limits and parsing library choice

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

## Standard Stack

### Core CSV Parsing

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| csv-parse | 5.x | CSV parsing with validation | Industry-standard Node.js CSV parser, RFC 4180 compliant, streaming support, robust error handling |

**Installation:**
```bash
npm install csv-parse
```

**Key capabilities:**
- Stream API for large files, callback API for simplicity
- Built-in error handling with `skip_records_with_error` option
- Type casting and validation
- Detailed error context (line number, column, field position)
- No external dependencies

### Responsive Design (Already Installed)

| Component | Version | Purpose | When to Use |
|-----------|---------|---------|-------------|
| @shopify/polaris | 12.0.0 | Design system | All UI components (already in use) |
| Grid | Built-in | Responsive layouts | Dashboard, matrix list (multi-column → single column) |
| BlockStack | Built-in | Vertical stacking | Mobile-friendly card layouts |

**Polaris breakpoints:**
- xs: 0rem (0px) - Extra small
- sm: 30.625rem (490px) - Small devices
- md: 48rem (768px) - Tablets
- lg: 65rem (1040px) - Desktop
- xl: 90rem (1440px) - Large desktop

### Accessibility Tools

| Tool | Purpose | When to Use |
|------|---------|-------------|
| WebAIM Contrast Checker | Verify color contrast ratios | Custom UI elements (grid cells, validation highlights) |
| axe DevTools | Automated a11y testing | Pre-submission validation |
| NVDA/VoiceOver | Screen reader testing | Verify table navigation announcements |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| csv-parse | papaparse | Papa Parse works browser+server, but csv-parse has better streaming for large files |
| csv-parse | csv-parser | csv-parser is simpler but less configurable for validation |
| ARIA grid | Standard table | Grid role enables advanced keyboard navigation; tables are simpler but less powerful |

## Architecture Patterns

### CSV Import Flow (Server-Side Processing)

**Pattern:** Upload → Parse → Validate → Preview → Confirm → Create

```
Client                    Server
  |                         |
  |-- POST /matrices/new ---|
  |    (CSV file)           |
  |                         |--- csv-parse stream
  |                         |--- Validate dimensions/prices
  |                         |--- Build grid preview
  |                         |
  |<--- Return preview -----|
  |    (grid, errors)       |
  |                         |
  |-- POST /matrices/new ---|
  |    (confirmed)          |
  |                         |--- Prisma transaction
  |                         |    - Create matrix
  |                         |    - Create breakpoints
  |                         |    - Create cells
  |                         |
  |<--- Redirect to edit ---|
```

**Key implementation points:**
- Parse CSV in memory for preview (files are small: ~100 rows max for typical pricing matrices)
- Use `skip_records_with_error: true` to collect all errors, not just first
- Store errors with line numbers for inline display
- Generate preview grid from unique width/height values
- Confirm step shows grid dimensions and error count before creation

### Responsive Layout Pattern

**Pattern:** Mobile-first with breakpoint-specific columns

```tsx
// Dashboard: 2-column on desktop, 1-column on tablet
<Grid columns={{xs: 1, sm: 1, md: 2, lg: 2, xl: 2}} gap="400">
  <Grid.Cell>
    <Card>Matrix stats</Card>
  </Grid.Cell>
  <Grid.Cell>
    <Card>Recent activity</Card>
  </Grid.Cell>
</Grid>

// Matrix list: Full-width table on mobile, standard on desktop
<Box paddingInline={{xs: "200", md: "400"}}>
  <IndexTable>
    {/* Table wraps naturally on small screens */}
  </IndexTable>
</Box>

// Matrix editor: Horizontal scroll on small screens
<div style={{overflowX: 'auto'}}>
  <table role="grid" aria-label="Price matrix editor">
    {/* Fixed-width grid, scrolls horizontally */}
  </table>
</div>
```

### ARIA Grid Keyboard Navigation Pattern

**Pattern:** W3C ARIA Grid with edit mode toggle

Required ARIA structure:
```tsx
<table role="grid" aria-labelledby="matrix-title">
  <thead>
    <tr role="row">
      <th role="columnheader">Width (cm)</th>
      <th role="columnheader">Height (cm)</th>
    </tr>
  </thead>
  <tbody>
    <tr role="row">
      <th role="rowheader">50</th>
      <td role="gridcell" tabIndex={isFocused ? 0 : -1}>
        <input aria-label="Price for 50cm x 60cm" />
      </td>
    </tr>
  </tbody>
</table>
```

**Keyboard interaction (W3C spec):**
- **Arrow keys:** Move focus between cells (stops at edges)
- **Tab/Shift+Tab:** Move to next/previous cell
- **Enter:** Enter edit mode (focus input)
- **Escape:** Exit edit mode (restore grid navigation)
- **Home/End:** First/last cell in row
- **Ctrl+Home/Ctrl+End:** First/last cell in grid

**Focus management:**
- Only one cell has `tabIndex={0}` at a time (roving tabindex pattern)
- Other cells have `tabIndex={-1}`
- Arrow key handlers update focused cell and move tabindex
- Visual focus indicator required (CSS outline or border)

### Security Review Checklist Pattern

**Pattern:** Verify mandatory requirements before submission

1. **Session Tokens** ✓ (Already implemented via @shopify/shopify-app-remix)
   - Embedded app uses session tokens (not cookies)
   - Works in Chrome incognito mode
   - Token exchange for API calls

2. **GDPR Webhooks** ✓ (Already implemented in webhooks.tsx)
   - customers/data_request
   - customers/redact
   - shop/redact
   - All respond with 200 status

3. **Appropriate Scopes** ✓ (Already configured)
   - write_draft_orders (for custom pricing orders)
   - read_products, write_products (for matrix assignment)
   - No unnecessary protected customer data scopes

4. **App Bridge** ✓ (Already implemented)
   - Latest App Bridge via @shopify/app-bridge-react
   - OAuth redirect using App Bridge

5. **Billing API** (To implement in Phase 6)
   - Use Shopify Billing API for freemium
   - Free tier: 1 matrix
   - Paid tier: unlimited matrices + CSV import

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| CSV parsing | Custom split/regex parser | csv-parse | RFC 4180 compliance, quote handling, encoding issues, escape characters |
| Keyboard navigation | Custom keydown handlers | W3C ARIA Grid pattern | Roving tabindex, focus management, screen reader compatibility |
| Color contrast checking | Visual inspection | WebAIM Contrast Checker | WCAG 2.1 AA requires 4.5:1 for text, 3:1 for UI components |
| Responsive breakpoints | Custom media queries | Polaris breakpoints | Consistent with Shopify Admin, pre-tested values |
| Freemium billing | Custom payment tracking | Shopify Billing API | Required for App Store, handles plan changes, prorated billing |
| File upload handling | Custom multipart parser | Remix built-in | Request formData(), secure file handling |

**Key insight:** App Store submission has mandatory requirements (session tokens, GDPR webhooks, Billing API). Custom implementations will be rejected.

## Common Pitfalls

### Pitfall 1: CSV Parsing - Stopping on First Error

**What goes wrong:** Parser throws on first error, merchant sees "Failed to parse CSV" with no context

**Why it happens:** Default csv-parse behavior is to throw on errors, halting execution

**How to avoid:**
- Use `skip_records_with_error: true` option
- Collect errors with line numbers: `parser.on('skip', (error) => errors.push(error))`
- Show all valid rows + all errors in preview
- Let merchants fix CSV and retry

**Warning signs:**
- CSV import fails with generic error message
- Merchants can't see which rows are problematic
- Import all-or-nothing (no partial success)

### Pitfall 2: Responsive Design - Forgetting Horizontal Scroll for Tables

**What goes wrong:** Matrix editor breaks layout on tablet, grid becomes unusable

**Why it happens:** CSS Grid/Flexbox try to shrink grid to fit screen, cells become too narrow

**How to avoid:**
- Wrap grid in `<div style={{overflowX: 'auto'}}>`
- Set minimum cell width: `min-width: 80px` on gridcells
- Test on actual tablet (1024px width)
- Dashboard/list views use responsive Grid, but editor allows scrolling

**Warning signs:**
- Grid cells collapse to unreadable widths
- Input fields too narrow to see values
- Merchants can't edit prices on tablet

### Pitfall 3: ARIA Grid - Missing Roving Tabindex

**What goes wrong:** Tab key visits every cell, keyboard navigation unusable for large grids

**Why it happens:** Setting `tabIndex={0}` on all cells makes Tab stop at each one

**How to avoid:**
- Only focused cell has `tabIndex={0}`
- All other cells have `tabIndex={-1}`
- Arrow key handlers update which cell has tabIndex={0}
- Tab/Shift+Tab move between grid and other page elements

**Warning signs:**
- Tab key stops at every cell (should skip to next page element)
- Keyboard users can't quickly navigate large grids
- Screen reader announces every cell when tabbing

### Pitfall 4: Focus Management - Losing Focus After Delete

**What goes wrong:** After deleting a matrix, focus returns to `<body>`, keyboard users must navigate entire page again

**Why it happens:** React removes element without explicitly managing focus

**How to avoid:**
- After delete, focus next item: `nextItemRef.current?.focus()`
- If last item, focus "Create matrix" button
- If empty state, focus empty state heading or action button
- Use `useEffect` to set focus after state update

**Warning signs:**
- Focus disappears after delete operations
- Keyboard users tab through entire page to resume work
- Screen readers announce "document" instead of next logical element

### Pitfall 5: Color Contrast - Assuming Polaris Handles Everything

**What goes wrong:** Custom validation highlights fail contrast requirements (e.g., light yellow on white)

**Why it happens:** Polaris components meet WCAG, but custom CSS may not

**How to avoid:**
- Audit custom colors with WebAIM Contrast Checker
- Normal text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI components (borders, icons): 3:1 minimum
- Validation errors: Use Polaris `Banner` or `Text` with `tone="critical"` (pre-tested)

**Warning signs:**
- Error messages hard to read in bright light
- Validation highlights too subtle
- Focus indicators barely visible

### Pitfall 6: App Store Listing - Screenshots with Pricing/Reviews

**What goes wrong:** App rejected for including pricing info or testimonials in screenshots

**Why it happens:** Shopify prohibits pricing/reviews in listing images (must be in dedicated sections)

**How to avoid:**
- Screenshots show functionality only
- No "$9/month" or "Unlimited for $15"
- No "5-star reviews" or customer quotes
- No claims like "Guaranteed 20% sales increase"
- Keep pricing in pricing section, reviews in review section

**Warning signs:**
- Screenshots include dollar amounts
- Images contain star ratings or testimonials
- Marketing claims ("Best app for...") in images

### Pitfall 7: CSV Import - No File Size Limit

**What goes wrong:** Merchants upload 10MB CSV, server runs out of memory

**Why it happens:** No validation on file size before parsing

**How to avoid:**
- Set file size limit: 1MB max (covers ~20,000 rows, far more than typical pricing matrix)
- Validate in Remix action: `const file = await request.formData(); if (file.size > 1048576) throw error`
- Show user-friendly error: "CSV file must be under 1MB. Your file is 10MB."
- Use streaming parse only if needed (unlikely for pricing matrices)

**Warning signs:**
- Server memory spikes during CSV upload
- Timeouts on large file uploads
- No file size feedback before processing

### Pitfall 8: Freemium Gate - Blocking Free Users from Seeing Feature

**What goes wrong:** Free users don't know CSV import exists, no upgrade prompt

**Why it happens:** Feature completely hidden from free tier

**How to avoid:**
- Show CSV import option to all users
- Free tier: clicking shows upgrade modal with feature benefits
- Paid tier: clicking opens file picker
- Upgrade modal: "CSV Import is available on paid plans. Import hundreds of prices at once. Upgrade for $X/month."

**Warning signs:**
- Free users unaware of paid features
- No clear upgrade path
- Merchants ask "Does this app support CSV?" (it does, but hidden)

## Code Examples

### CSV Parsing with Error Collection

```typescript
// Source: https://csv.js.org/parse/errors/
import { parse } from 'csv-parse';

export async function parseCSV(fileContent: string) {
  const errors: Array<{line: number, message: string}> = [];
  const validRows: Array<{width: number, height: number, price: number}> = [];

  return new Promise((resolve, reject) => {
    parse(fileContent, {
      columns: ['width', 'height', 'price'],
      skip_empty_lines: true,
      trim: true,
      cast: true,
      skip_records_with_error: true,
      from_line: 2, // Skip header row
    })
    .on('readable', function() {
      let record;
      while ((record = this.read()) !== null) {
        // Validate types and ranges
        if (typeof record.width !== 'number' || record.width <= 0) {
          errors.push({line: this.info.lines, message: 'Width must be a positive number'});
          continue;
        }
        if (typeof record.height !== 'number' || record.height <= 0) {
          errors.push({line: this.info.lines, message: 'Height must be a positive number'});
          continue;
        }
        if (typeof record.price !== 'number' || record.price < 0) {
          errors.push({line: this.info.lines, message: 'Price must be a non-negative number'});
          continue;
        }

        validRows.push(record);
      }
    })
    .on('skip', (error) => {
      errors.push({
        line: error.lines,
        message: `Parse error: ${error.message}`
      });
    })
    .on('end', () => {
      resolve({ validRows, errors });
    })
    .on('error', (error) => {
      reject(error);
    });
  });
}
```

### Responsive Grid Layout

```tsx
// Source: https://polaris-react.shopify.com/components/layout-and-structure/grid
import { Grid, Card } from '@shopify/polaris';

function Dashboard() {
  return (
    <Grid columns={{xs: 1, sm: 1, md: 2, lg: 2, xl: 2}} gap="400">
      <Grid.Cell>
        <Card>
          <Text variant="headingMd">Active Matrices</Text>
          <Text variant="heading2xl">{count}</Text>
        </Card>
      </Grid.Cell>
      <Grid.Cell>
        <Card>
          <Text variant="headingMd">Products Assigned</Text>
          <Text variant="heading2xl">{productCount}</Text>
        </Card>
      </Grid.Cell>
    </Grid>
  );
}
```

### ARIA Grid Keyboard Navigation

```tsx
// Source: https://www.w3.org/WAI/ARIA/apg/patterns/grid/
import { useState, useRef, useCallback } from 'react';

function MatrixGrid({ rows, columns }) {
  const [focusedCell, setFocusedCell] = useState({ row: 0, col: 0 });

  const handleKeyDown = useCallback((e: React.KeyboardEvent, row: number, col: number) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        if (col < columns - 1) setFocusedCell({ row, col: col + 1 });
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (col > 0) setFocusedCell({ row, col: col - 1 });
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (row < rows - 1) setFocusedCell({ row: row + 1, col });
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (row > 0) setFocusedCell({ row: row - 1, col });
        break;
      case 'Home':
        e.preventDefault();
        setFocusedCell({ row, col: 0 });
        break;
      case 'End':
        e.preventDefault();
        setFocusedCell({ row, col: columns - 1 });
        break;
    }
  }, [rows, columns]);

  return (
    <table role="grid" aria-label="Price matrix editor">
      <tbody>
        {data.map((rowData, rowIdx) => (
          <tr key={rowIdx} role="row">
            {rowData.map((cellData, colIdx) => {
              const isFocused = focusedCell.row === rowIdx && focusedCell.col === colIdx;
              return (
                <td
                  key={colIdx}
                  role="gridcell"
                  tabIndex={isFocused ? 0 : -1}
                  onKeyDown={(e) => handleKeyDown(e, rowIdx, colIdx)}
                  ref={isFocused ? (el) => el?.focus() : null}
                >
                  <input aria-label={`Row ${rowIdx + 1}, Column ${colIdx + 1}`} />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Focus Management After Delete

```tsx
// Source: https://design.va.gov/accessibility/focus-management
import { useEffect, useRef } from 'react';

function MatrixList({ matrices, onDelete }) {
  const nextFocusRef = useRef<HTMLButtonElement>(null);

  const handleDelete = async (id: string, index: number) => {
    await onDelete(id);

    // Focus next item, or previous if last, or create button if empty
    if (matrices.length > 1) {
      const nextIndex = index < matrices.length - 1 ? index : index - 1;
      // Focus will be managed by React re-render with ref
    } else {
      // Focus "Create matrix" button
      document.getElementById('create-matrix-btn')?.focus();
    }
  };

  return (
    <IndexTable>
      {matrices.map((matrix, index) => (
        <IndexTable.Row key={matrix.id}>
          <IndexTable.Cell>{matrix.name}</IndexTable.Cell>
          <IndexTable.Cell>
            <Button
              ref={index === 0 ? nextFocusRef : null}
              onClick={() => handleDelete(matrix.id, index)}
            >
              Delete
            </Button>
          </IndexTable.Cell>
        </IndexTable.Row>
      ))}
    </IndexTable>
  );
}
```

### Freemium Billing Check

```typescript
// Source: https://shopify.dev/docs/apps/launch/billing/subscription-billing
import { authenticate } from '../shopify.server';

export async function requirePaidPlan(request: Request) {
  const { billing, session } = await authenticate.admin(request);

  // Check for active subscription
  const { hasActivePayment, appSubscriptions } = await billing.check({
    plans: ['UNLIMITED_PLAN'],
    isTest: process.env.NODE_ENV !== 'production',
  });

  if (!hasActivePayment) {
    // Redirect to billing page or return upgrade modal data
    return {
      needsUpgrade: true,
      plan: 'UNLIMITED_PLAN',
      price: '$12/month',
      features: ['Unlimited matrices', 'CSV import'],
    };
  }

  return { needsUpgrade: false };
}

// In route loader/action
export async function action({ request }: ActionFunctionArgs) {
  const billingCheck = await requirePaidPlan(request);

  if (billingCheck.needsUpgrade) {
    return json({
      error: 'CSV import requires a paid plan',
      upgrade: billingCheck,
    });
  }

  // Proceed with CSV import
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Third-party cookies | Session tokens | 2023 (Chrome SameSite) | Embedded apps must use JWT session tokens |
| REST Admin API | GraphQL Admin API | April 2025 (mandatory) | New apps must use GraphQL only |
| Manual billing | Shopify Billing API | Always required | App Store rejects off-platform billing |
| Fixed pricing | Freemium + usage-based | 2024 trend | 40% higher retention with hybrid pricing |
| Custom ARIA patterns | W3C ARIA Authoring Practices | Updated 2023 | Follow standardized keyboard patterns |
| WCAG 2.0 | WCAG 2.1/2.2 | 2018/2023 | New criteria: focus visibility, mobile usability |

**Deprecated/outdated:**
- **Polaris React library:** Deprecated October 2025, replaced by Polaris Web Components (but React still supported in Remix apps via Polaris 12)
- **REST Admin API:** Deprecated October 2024, mandatory GraphQL for new apps from April 2025
- **Cookie-based auth:** Blocked by browsers, session tokens mandatory for embedded apps

## Open Questions

### 1. Exact Paid Tier Price Point

**What we know:**
- User decided $9-15/mo range
- Shopify app market prefers simple pricing (75% of high-performing apps use subscription-only)
- Free tier: 1 matrix; Paid tier: unlimited + CSV import
- Average app conversion: 13% of installs become paid

**What's unclear:**
- Optimal price point within range for price matrix niche
- Whether to include usage-based component (e.g., draft orders created)
- Trial period length (14 days standard)

**Recommendation:**
- Start at $12/mo (mid-range, psychological pricing)
- Pure subscription (simpler than hybrid)
- 14-day free trial (Shopify standard)
- Can A/B test pricing post-launch

### 2. CSV File Size Limit

**What we know:**
- Typical pricing matrix: 5-20 breakpoints = 25-400 cells
- CSV-parse handles streaming for large files
- Remix file uploads default to in-memory
- Largest realistic matrix: 50x50 = 2,500 cells

**What's unclear:**
- Max file size before streaming required
- Whether to parse in-memory or stream
- Error handling for timeout on large files

**Recommendation:**
- 1MB file size limit (covers 20,000 rows, far more than needed)
- Parse in-memory (simpler, fast enough for <1MB)
- Show error if >1MB: "Pricing matrices are typically under 100 rows. Please verify your CSV."

### 3. App Store Screenshot Sequence

**What we know:**
- Need 3-6 screenshots at 1600x900px
- Must show functionality, not marketing claims
- Crop to app UI (no browser chrome)
- Desktop-focused (primary use case)

**What's unclear:**
- Optimal screenshot order for conversion
- Whether to include widget rendering screenshot
- Whether to show draft order creation flow

**Recommendation:**
- Screenshot 1: Dashboard with active matrix
- Screenshot 2: Matrix grid editor (spreadsheet-like)
- Screenshot 3: Product assignment (assign to variants)
- Screenshot 4: Widget in storefront (customer view)
- Screenshot 5: Draft order with custom pricing
- Screenshot 6: CSV import preview (paid feature teaser)

## Sources

### Primary (HIGH confidence)

- [Shopify App Store Requirements](https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements) - Official technical requirements
- [Shopify App Requirements Checklist](https://shopify.dev/docs/apps/launch/app-requirements-checklist) - Complete submission checklist
- [Polaris Breakpoints](https://polaris-react.shopify.com/tokens/breakpoints) - Responsive design values
- [Polaris Grid Component](https://polaris-react.shopify.com/components/layout-and-structure/grid) - Responsive layout API
- [Polaris BlockStack Component](https://polaris-react.shopify.com/components/layout-and-structure/block-stack) - Vertical layout API
- [csv-parse Documentation](https://csv.js.org/parse/) - CSV parsing API
- [csv-parse Error Handling](https://csv.js.org/parse/errors/) - Error types and handling
- [W3C ARIA Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) - Keyboard navigation spec
- [Shopify Session Tokens](https://shopify.dev/docs/apps/build/authentication-authorization/session-tokens) - Authentication requirements
- [Shopify Privacy Law Compliance](https://shopify.dev/docs/apps/build/compliance/privacy-law-compliance) - GDPR webhook requirements
- [Shopify Billing API - Subscription Billing](https://shopify.dev/docs/apps/launch/billing/subscription-billing) - Freemium implementation
- [Shopify Protected Customer Data](https://shopify.dev/docs/apps/launch/protected-customer-data) - Scope requirements

### Secondary (MEDIUM confidence)

- [WebAIM WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist) - WCAG 2.1 AA requirements
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Color contrast validation
- [WCAG 2.1 AA Compliance Guide](https://www.webability.io/blog/wcag-2-1-aa-the-standard-for-accessible-web-design) - 2026 checklist
- [Shopify App Store Best Practices](https://shopify.dev/docs/apps/launch/shopify-app-store/best-practices) - Listing optimization
- [VA.gov Focus Management](https://design.va.gov/accessibility/focus-management) - Post-delete focus patterns
- [DigitalOcean - CSV Files in Node.js](https://www.digitalocean.com/community/tutorials/how-to-read-and-write-csv-files-in-node-js-using-node-csv) - Node CSV best practices
- [Shopify Managed Pricing Guide](https://www.shopify.com/partners/blog/managed_app_pricing) - Freemium strategy

### Tertiary (LOW confidence)

- [Top 5 Javascript CSV Parsers](https://www.oneschema.co/blog/top-5-javascript-csv-parsers) - Library comparison
- [Shopify Freemium Business Model](https://www.shopify.com/blog/freemium-business-model) - Pricing strategy
- [Shopify App Store Listing Optimization](https://cartcoders.com/blog/shopify-apps/shopify-app-store-listing-that-converts/) - Screenshot best practices
- [How to Pass Shopify App Store Review](https://gadget.dev/blog/how-to-pass-the-shopify-app-store-review-the-first-time-part-1-the-technical-bit) - Technical checklist

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - csv-parse is industry standard, Polaris components documented
- Architecture: HIGH - W3C ARIA patterns are standardized, Shopify requirements are official
- Pitfalls: HIGH - Common mistakes verified through official docs and community reports
- Freemium pricing: MEDIUM - Best practices documented, but optimal price point for this niche is untested

**Research date:** 2026-02-06
**Valid until:** 2026-03-06 (30 days - stable domain, WCAG and W3C specs don't change frequently)
