---
status: diagnosed
phase: 14-widget-integration
source: 14-01-SUMMARY.md, 14-02-SUMMARY.md, 14-03-SUMMARY.md
started: 2026-02-10T12:00:00Z
updated: 2026-02-10T12:45:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Option Groups API Endpoint
expected: curl the new endpoint for a product with option groups. Response returns JSON `{ optionGroups: [...] }` with groups and choices. For a product without groups, returns `{ optionGroups: [] }`.
result: pass

### 2. Widget Renders Option Dropdowns
expected: Load the widget for a product that has option groups assigned. A dropdown (`<select>`) appears for each assigned option group, labeled with the group name. REQUIRED groups show an asterisk (*) in the label.
result: pass

### 3. Price Modifier Labels on Options
expected: Open a dropdown — each choice shows its modifier in parentheses next to the label. FIXED modifiers display as "(+$15.00)" with proper currency formatting. PERCENTAGE modifiers display as "(+10%)". Zero-modifier choices show no label.
result: issue
reported: "FIXED modifier value of 1500 (cents) displays correctly as +US$15.00 in dropdown label, but price calculation adds $1,500 instead of $15.00 to base matrix price. Total shows $1,900 instead of expected $415."
severity: major

### 4. Live Price Updates on Selection
expected: Select an option from a dropdown. The displayed price updates immediately (no page reload) to reflect the modifier. Changing the selection updates the price again. The total reflects base matrix price + all selected option modifiers.
result: pass

### 5. Backward Compatibility (No Option Groups)
expected: Load the widget for a product that has NO option groups assigned. Widget renders normally with just dimension inputs, quantity, price, and add-to-cart — no dropdown UI visible. Behavior identical to before Phase 14.
result: pass

### 6. Required Option Validation
expected: For a product with a REQUIRED option group, the add-to-cart button is disabled until a choice is selected. If there is a default choice on a REQUIRED group, it should be pre-selected on load and the button enabled (assuming dimensions are valid).
result: pass

### 7. Draft Order Includes Options
expected: Select options and click add-to-cart. The created Draft Order includes the selected options as line item metadata/custom attributes. Verify in Shopify admin that the draft order shows option selections.
result: skipped
reason: Shopify access token expired — environment issue, not Phase 14 code

### 8. Keyboard Accessibility
expected: Tab to an option dropdown — it receives focus with a visible focus ring. Use Arrow Up/Down to navigate options. Press Enter/Space to select. All standard keyboard behaviors of a native select work correctly.
result: pass

## Summary

total: 8
passed: 6
issues: 1
pending: 0
skipped: 1

## Gaps

- truth: "Price modifier correctly applied as cents — FIXED modifier of 1500 should add $15.00 to base price"
  status: failed
  reason: "User reported: FIXED modifier value of 1500 (cents) displays correctly as +US$15.00 in dropdown label, but price calculation adds $1,500 instead of $15.00 to base matrix price. Total shows $1,900 instead of expected $415."
  severity: major
  test: 3
  root_cause: "Unit mismatch in api.v1.products.$productId.price.ts line 197. calculatePrice() returns cell.price in dollars (e.g. 400 for $400), but the variable is named basePriceCents and passed to calculatePriceWithOptions() which expects cents. FIXED modifier value 1500 (cents) is added to 400 (dollars) = 1900, displayed as $1,900 instead of converting base to cents first (40000 + 1500 = 41500 = $415.00)."
  artifacts:
    - path: "app/routes/api.v1.products.$productId.price.ts"
      issue: "Line 197: basePriceCents = calculatePrice(...) returns dollars not cents"
    - path: "app/services/option-price-calculator.server.ts"
      issue: "Expects basePriceCents but receives dollars"
  missing:
    - "Convert base price to cents before passing to calculatePriceWithOptions: basePriceCents = Math.round(calculatePrice(...) * 100)"
    - "Convert totalCents back to dollars for API response: unitPrice = priceBreakdown.totalCents / 100"
    - "Same fix needed in app/routes/api.v1.draft-orders.ts if it uses the same pattern"
  debug_session: ""
