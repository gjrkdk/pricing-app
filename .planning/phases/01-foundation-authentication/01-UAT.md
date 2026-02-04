---
status: diagnosed
phase: 01-foundation-authentication
source: [01-01-SUMMARY.md, 01-02-SUMMARY.md]
started: 2026-02-04T23:00:00Z
updated: 2026-02-04T23:20:00Z
---

## Current Test

[testing complete]

## Tests

### 1. App Install via OAuth
expected: Navigate to the app URL. Shopify OAuth flow starts. After granting permissions, you land on the embedded dashboard inside Shopify admin.
result: pass

### 2. Dashboard Loads with Welcome Card
expected: After install, the dashboard shows a welcome card with friendly onboarding text ("You're all set! Here's how to get started"), 3 setup steps, and a link to docs. The card has a dismiss button.
result: issue
reported: "Welcome card content is there but no dismiss button, no docs link, and a huge triangle with exclamation mark icon is showing"
severity: major

### 3. API Key Displayed on First Install
expected: The dashboard shows a full API key (starting with pm_) visible in plain text. There's a copy button next to it.
result: issue
reported: "I see the API key but not the copy button next to it"
severity: major

### 4. Copy API Key to Clipboard
expected: Click the copy button next to the API key. A toast notification confirms the key was copied. Pasting from clipboard shows the full key.
result: issue
reported: "Also didn't see this"
severity: major

### 5. Hide API Key After First View
expected: After navigating away or refreshing the page, the API key switches to a masked view (like pm_abc123...) and the full key is no longer visible.
result: pass

### 6. Regenerate API Key
expected: Click "Regenerate Key". A confirmation modal appears warning that the old key will be invalidated. Confirming shows a new full API key and a toast notification.
result: issue
reported: "I don't see the confirmation modal warning and it seems that everything is visible (content) so not hidden"
severity: major

### 7. Dismiss Welcome Card
expected: Click dismiss on the welcome card. A toast confirms dismissal. The card disappears. Refreshing the page — the card stays dismissed.
result: issue
reported: "don't see the dismiss button"
severity: major

### 8. Navigation Between Dashboard and Settings
expected: Sidebar/nav shows Dashboard and Settings links. Clicking Settings opens a placeholder settings page. Clicking Dashboard returns to the main page.
result: issue
reported: "also don't see this"
severity: major

### 9. Matrices Empty State
expected: Below the API key section, there's an empty state for matrices with text and a "Create" CTA button (no illustration image).
result: pass

### 10. GDPR Webhooks Respond
expected: The app has registered GDPR webhook handlers. When Shopify sends APP_UNINSTALLED, CUSTOMERS_DATA_REQUEST, CUSTOMERS_REDACT, or SHOP_REDACT webhooks, they respond with 200 OK (verifiable in Shopify Partner dashboard or logs).
result: pass

## Summary

total: 10
passed: 4
issues: 6
pending: 0
skipped: 0

## Gaps

- truth: "Welcome card has dismiss button and docs link, no warning triangle icon"
  status: failed
  reason: "User reported: Welcome card content is there but no dismiss button, no docs link, and a huge triangle with exclamation mark icon is showing"
  severity: major
  test: 2
  root_cause: "Missing Polaris CSS import in app/routes/app.tsx. Without styles, Banner renders unstyled — dismiss button invisible, SVG icon renders as huge triangle. Docs link was also never added to the Banner content."
  artifacts:
    - path: "app/routes/app.tsx"
      issue: "No Polaris CSS import (needs `import polarisStyles from '@shopify/polaris/build/esm/styles.css?url'` and links export)"
    - path: "app/routes/app._index.tsx"
      issue: "Banner content missing docs link"
  missing:
    - "Add Polaris CSS import and links export to app/routes/app.tsx"
    - "Add docs link to welcome card Banner content"

- truth: "Copy button visible next to API key"
  status: failed
  reason: "User reported: I see the API key but not the copy button next to it"
  severity: major
  test: 3
  root_cause: "Missing Polaris CSS. Button component at line 187 exists but renders unstyled/invisible without CSS."
  artifacts:
    - path: "app/routes/app.tsx"
      issue: "No Polaris CSS import"
  missing:
    - "Add Polaris CSS import to app/routes/app.tsx"

- truth: "Copy button copies API key to clipboard with toast notification"
  status: failed
  reason: "User reported: Also didn't see this (no copy button exists)"
  severity: major
  test: 4
  root_cause: "Same as test 3 — copy button exists (line 187) but invisible without Polaris CSS. Toast also invisible without styles."
  artifacts:
    - path: "app/routes/app.tsx"
      issue: "No Polaris CSS import"
  missing:
    - "Add Polaris CSS import to app/routes/app.tsx"

- truth: "Regenerate Key shows confirmation modal before invalidating old key"
  status: failed
  reason: "User reported: I don't see the confirmation modal warning and it seems that everything is visible (content) so not hidden"
  severity: major
  test: 6
  root_cause: "Missing Polaris CSS. Modal component (lines 233-261) is correctly implemented with open state, backdrop, and actions, but renders without any visual styling — no backdrop, no dialog box, content appears inline."
  artifacts:
    - path: "app/routes/app.tsx"
      issue: "No Polaris CSS import"
  missing:
    - "Add Polaris CSS import to app/routes/app.tsx"

- truth: "Welcome card has dismiss button that persists dismissal across refreshes"
  status: failed
  reason: "User reported: don't see the dismiss button"
  severity: major
  test: 7
  root_cause: "Same as test 2 — Banner onDismiss prop is set (line 135) but dismiss X button invisible without Polaris CSS."
  artifacts:
    - path: "app/routes/app.tsx"
      issue: "No Polaris CSS import"
  missing:
    - "Add Polaris CSS import to app/routes/app.tsx"

- truth: "Navigation sidebar shows Dashboard and Settings links"
  status: failed
  reason: "User reported: also don't see this"
  severity: major
  test: 8
  root_cause: "The <ui-nav-menu> element is a Shopify App Bridge web component that renders navigation in the Shopify admin sidebar. It requires App Bridge to be fully initialized. May not render in all contexts or may appear in the Shopify admin left sidebar rather than in the app content area."
  artifacts:
    - path: "app/routes/app.tsx"
      issue: "<ui-nav-menu> may not be rendering — needs investigation of App Bridge initialization"
  missing:
    - "Verify App Bridge is loading and <ui-nav-menu> renders in Shopify admin sidebar"
