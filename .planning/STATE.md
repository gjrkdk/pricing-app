# Project State: Shopify Price Matrix App

**Last Updated:** 2026-02-08
**Status:** v1.1 Milestone In Progress

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-06)

**Core Value:** Merchants can offer custom-dimension pricing on their headless Shopify storefronts without building their own pricing infrastructure

**Current Focus:** v1.1 Publish & Polish — production deploy, npm publish, App Store submission

## Current Position

**Milestone:** v1.1 Publish & Polish
**Phase:** 08 of 4 (Production Deploy to Vercel)
**Plan:** 2 of 2 complete
**Status:** Phase 08 complete — deployed to quote-flow-one.vercel.app
**Last activity:** 2026-02-08 — Completed 08-02-PLAN.md (Production Deployment)

Progress: ██████████████████████████████ 100% (27/27 plans)
[Phases 01-06: Complete] [Phase 07: Complete] [Phase 08: Complete]

## Archived

- `.planning/milestones/v1.0-ROADMAP.md` — Full phase details
- `.planning/milestones/v1.0-REQUIREMENTS.md` — All v1 requirements
- `.planning/milestones/v1.0-MILESTONE-AUDIT.md` — Audit report

## Accumulated Context

- Billing gates disabled for testing (TODO markers in `billing.server.ts`)
- Competitor research completed — Apippa is market leader, key gaps identified (true matrix grid, admin lookup, REST API, CSV import)
- Template CSV file added at `public/template.csv`
- Widget package prepared for npm: MIT license, comprehensive README (145 lines), all metadata complete
- npm package verified at 194.7 kB tarball with pack/publish dry-run checks passing
- Widget published to npm as @gjrkdk/pricing-matrix-widget@0.1.0 (scope changed from @pricing-matrix due to unavailability)
- Local .npmrc added to override global GitHub Package Registry redirect
- App renamed to QuoteFlow for production branding
- Production deployment: https://quote-flow-one.vercel.app (Vercel fra1 + Neon EU Central)
- Vercel builds use `remix vite:build` directly (Shopify CLI not available on Vercel)
- Root .npmrc has legacy-peer-deps=true for vitest/@shopify/cli-kit peer dep conflict

## Session Continuity

**Last session:** 2026-02-08 13:30:00 UTC
**Stopped at:** Completed 08-02-PLAN.md (Production Deployment)
**Resume file:** None

---
*State tracked since: 2026-02-03*
