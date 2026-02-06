# App Store Listing: Price Matrix

## Security Review Checklist

Before App Store submission, all mandatory Shopify requirements verified:

### 1. Session Tokens ✓
**Location:** `app/shopify.server.ts` line 58
**Status:** PASS
**Evidence:** `unstable_newEmbeddedAuthStrategy: true` enabled in future config

### 2. GDPR Webhooks ✓
**Location:** `app/shopify.server.ts` lines 39-50
**Status:** PASS
**Evidence:** All three required webhooks registered:
- CUSTOMERS_DATA_REQUEST (line 39)
- CUSTOMERS_REDACT (line 43)
- SHOP_REDACT (line 47)

**Handler Location:** `app/routes/webhooks.tsx`
**Status:** PASS
**Evidence:** All webhooks handled with GdprRequest model audit trail (lines 14-20)

### 3. Billing API ✓
**Location:** `app/shopify.server.ts` lines 25-33
**Status:** PASS
**Evidence:** Billing configuration exists with UNLIMITED_PLAN:
- Amount: $12.00 USD
- Interval: Every 30 days
- Trial: 14 days
- Replacement behavior: Apply immediately

### 4. Appropriate Scopes ✓
**Location:** `.env` line 4
**Status:** PASS
**Evidence:** Minimal scopes requested:
- `write_draft_orders` - Required for checkout integration
- `read_products` - Required for product assignment
- `write_products` - Required for product metadata

**Note:** No protected customer data scopes requested (no read_customers beyond what's needed).

### 5. App Bridge Integration ✓
**Location:** `app/root.tsx` line 25
**Status:** PASS
**Evidence:** App Bridge script loaded via CDN: `https://cdn.shopify.com/shopifycloud/app-bridge.js`
**API Key:** Meta tag includes `SHOPIFY_API_KEY` environment variable (line 23)

### 6. No Unprotected Customer Data ✓
**Status:** PASS
**Evidence:**
- No `read_customers` scope requested
- Draft Orders created server-side only
- No customer data stored in app database
- All customer data accessed through Shopify APIs with proper authentication

---

## App Name
**Price Matrix**

## Tagline
Dimension-based pricing for custom products

## Description

Price Matrix makes it easy to offer custom pricing based on dimensions. Whether you sell art prints, fabric, glass, or any made-to-order product, you can set up a simple width × height pricing grid and assign it to your products.

Your customers get real-time pricing as they enter their dimensions, and when they're ready to buy, Price Matrix creates a Shopify Draft Order with accurate custom pricing—no manual quotes needed.

**Perfect for:**
- Art print shops offering custom sizes
- Fabric stores with per-yard pricing
- Glass and custom frame shops
- Any business with dimension-based products

**What you get:**
Set up your pricing in minutes with an intuitive spreadsheet-like grid. Define your width and height breakpoints, fill in prices, and assign the matrix to any product in your store.

**For headless storefronts:**
Price Matrix includes a REST API and drop-in React widget so your custom storefront can fetch pricing and create checkout sessions without any backend work.

**Freemium pricing:**
Start with 1 free pricing matrix to try it out. When you're ready to scale, upgrade to unlimited matrices for just $12/month (includes 14-day free trial).

## Key Features

- **Spreadsheet-like price grid editor** - Define width and height breakpoints with inline editing, keyboard navigation, and visual feedback
- **Flexible breakpoint system** - Set up any grid size you need (3×3, 5×5, 10×10, etc.) with custom breakpoint values in cm or mm
- **Product assignment** - Assign pricing matrices to any product in your Shopify catalog
- **Draft Order integration** - Automatic checkout with accurate custom pricing (no manual quotes)
- **REST API** - Fetch pricing and create checkouts from your headless storefront
- **Drop-in React widget** - Pre-built dimension input component for easy integration
- **CSV import** - Bulk upload pricing grids from spreadsheets (paid plan)
- **Freemium model** - 1 free matrix to start, upgrade for unlimited

## Pricing

### Free Plan
- 1 pricing matrix
- Full grid editor functionality
- Product assignment
- Draft Order integration
- REST API access
- React widget

### Unlimited Plan - $12/month
- Unlimited pricing matrices
- CSV import for bulk setup
- 14-day free trial
- All features from free plan

## Screenshot Descriptions

### Screenshot 1: Dashboard Overview
**What to capture:** The main dashboard showing active matrix count, quick links to create/manage matrices, and the settings card with API key management.

### Screenshot 2: Price Grid Editor
**What to capture:** The matrix editor showing the spreadsheet-like grid with width breakpoints across the top, height breakpoints down the left side, and price cells filled in. Include the unit selector and save button.

### Screenshot 3: Product Assignment
**What to capture:** The product assignment section showing the Shopify resource picker with selected products displayed in a list, demonstrating the product assignment flow.

### Screenshot 4: Widget Preview
**What to capture:** A live example of the React widget embedded on a product page, showing dimension input fields (width and height), calculated price display, and the add-to-cart button.

### Screenshot 5: CSV Import Flow
**What to capture:** The CSV import template selection page showing the four template options (Small, Medium, Custom, CSV Import) on the matrix creation page.

## Category Suggestions

Primary: **Product Customization**
Secondary: **Pricing & Merchandising**

## Keywords

pricing, custom dimensions, price matrix, headless, draft orders, dimension-based pricing, custom products, made to order, print shop, fabric pricing, API integration, React widget, CSV import

## Support & Documentation

**Support Email:** support@pricematrix.app (placeholder)
**Documentation:** Embedded help within app dashboard
**Privacy Policy:** Compliant with Shopify GDPR requirements (webhooks implemented)

---

**Tone:** Friendly, accessible, merchant-focused. Speaks to all merchants regardless of technical expertise. Emphasizes ease of use and practical benefits.

**No unsubstantiated claims:** All features listed are implemented and verified.
**No pricing in screenshots:** Screenshot descriptions reference UI only, not specific dollar amounts.
