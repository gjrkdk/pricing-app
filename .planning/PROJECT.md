# Shopify Price Matrix App

## What This Is

A public Shopify app that lets merchants create dimension-based price matrices (width x height) and assign them to products. Merchants manage matrices through an embedded dashboard in Shopify admin using Polaris. Headless storefront customers get real-time pricing through a REST API and an optional drop-in React widget. Orders are created via Shopify Draft Orders with custom locked prices.

## Core Value

Merchants can offer custom-dimension pricing on their headless Shopify storefronts without building their own pricing infrastructure.

## Requirements

### Validated

- Merchant can create a price matrix with fixed width and height breakpoints and a price at each intersection — v1.0
- Merchant can assign a shared matrix to multiple products (one matrix per product) — v1.0
- Merchant can manage matrices through an embedded Polaris dashboard in Shopify admin — v1.0
- Headless storefront can look up price by product + width + height via REST API — v1.0
- Prices round up to the next breakpoint when customer dimensions fall between defined steps — v1.0
- Storefront customers see a drop-in React widget with dimension inputs, live price display, and add-to-cart — v1.0
- Orders are created as Shopify Draft Orders with the custom calculated price locked in — v1.0
- Each store gets an API key for storefront-to-API authentication — v1.0
- App is installable as a public Shopify app (App Store listed) — v1.0

### Active

(None — define for next milestone)

### Out of Scope

- Formula-based pricing — v1 uses fixed breakpoint matrices only
- Add-on options (edge finishing, tinting, etc.) — matrix price is the full price in v1
- Multiple matrices per product — use separate products for different material pricing
- Interpolation between breakpoints — round-up strategy keeps it simple and predictable
- Non-headless storefronts — this targets headless/custom storefronts specifically
- OAuth/Storefront token auth — custom API key is simpler for headless integration

## Context

- **Target merchants:** Shops selling custom-cut or custom-sized products (glass, fabric, wood, metal, etc.) on headless Shopify storefronts
- **Pricing model:** Fixed breakpoint grid — merchants define discrete width steps, height steps, and a price at each (width, height) intersection. Customer dimensions that fall between breakpoints snap up to the next higher step.
- **Storefront integration:** Two paths — (1) REST API for custom integrations, (2) drop-in React widget with full UX (inputs + price + add-to-cart)
- **Order flow:** Widget/API → calculate price → create Shopify Draft Order with locked custom price → convert to real order
- **Matrix sharing:** Matrices are reusable — one "6mm Glass" matrix can be assigned to multiple glass products. Each product links to exactly one matrix.
- **Current state:** v1.0 shipped with 6,810 LOC TypeScript across 145 files. Tech stack: Remix 2.5, React 18, Polaris 12, Prisma 5.8, PostgreSQL.

## Constraints

- **Tech stack**: Remix + Prisma + Polaris — Shopify's official app template and conventions
- **Hosting**: Vercel — serverless deployment
- **Shopify API**: Must use Shopify's current app framework (App Bridge, session tokens, OAuth install flow)
- **Public app**: Must meet Shopify App Store review requirements

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Fixed breakpoints over formulas | Simpler for merchants to understand, simpler to implement, covers the core use case | Good |
| Round-up for in-between dimensions | Predictable pricing, no fractional math, merchants always get at least the breakpoint price | Good |
| Draft Orders for custom pricing | Only reliable way to lock a custom price in Shopify without checkout extensions | Good |
| API key per store (not Storefront token) | Storefront API tokens are scoped to Shopify's APIs, won't authenticate custom endpoints | Good |
| One matrix per product | Keeps data model simple; merchants use separate products for variant pricing | Good |
| Remix + Polaris on Vercel | Follows Shopify's official conventions; Vercel supports Remix well | Good |
| Custom line items for Draft Orders | Shopify ignores originalUnitPrice when variantId is present; custom line items give full control | Good |
| Custom HTML table over Polaris DataGrid | Needed full spreadsheet control for inline editing, tab nav, dynamic breakpoint headers | Good |
| Shadow DOM with CSS-in-JS for widget | react-loading-skeleton incompatible with Shadow DOM; CSS shimmer animation works | Good |
| In-memory rate limiting | MVP choice for single-instance; Redis migration path documented | Revisit |

---
*Last updated: 2026-02-06 after v1.0 milestone*
