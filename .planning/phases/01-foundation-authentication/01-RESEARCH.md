# Phase 1: Foundation & Authentication - Research

**Researched:** 2026-02-04
**Domain:** Shopify Embedded App Authentication & OAuth
**Confidence:** HIGH

## Summary

Phase 1 establishes the foundational infrastructure for a Shopify embedded app using the official Remix template, implementing OAuth installation flow, session token authentication, GDPR-compliant webhooks, and per-store API key generation for storefront access. Research confirms that Shopify has strict requirements for embedded apps that mandate session tokens (not cookies), proper OAuth flows, and three GDPR webhooks for App Store approval.

The standard approach uses Shopify's official `shopify-app-template-remix` which provides OAuth, session token handling, GraphQL Admin API access, and webhook infrastructure out-of-the-box. Critical considerations include Prisma connection pooling for Vercel's serverless environment, proper session storage using PostgreSQL, and implementing GDPR webhooks from the start to avoid App Store rejection.

**Primary recommendation:** Use Shopify's official Remix template with PostgreSQL session storage, implement Vercel Fluid Compute's `attachDatabasePool` for connection management, register GDPR webhooks immediately, and generate API keys using Node.js `crypto.randomBytes()` with HMAC-SHA256 for storefront API authentication.

## Standard Stack

The established libraries/tools for Shopify embedded app authentication:

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @shopify/shopify-app-remix | Latest | Shopify authentication for Remix apps | Official Shopify library, handles OAuth + session tokens + API access automatically |
| @shopify/polaris | Latest | UI component library | Official Shopify design system, required for consistent merchant experience |
| @shopify/app-bridge | 3.7.11+ (CDN) | Embedded app integration | Official SDK for session tokens, toast notifications, and Admin API access |
| Prisma | Latest | ORM for database access | Standard for TypeScript projects, officially supported by Shopify template |
| @shopify/shopify-app-session-storage-postgresql | Latest | PostgreSQL session storage adapter | Official Shopify session storage implementation |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @vercel/functions | Latest | Vercel Fluid Compute utilities | Required for `attachDatabasePool` to prevent connection exhaustion |
| @prisma/adapter-pg | Latest | PostgreSQL driver adapter for Prisma | Required when using Fluid Compute with Prisma |
| pg | Latest | PostgreSQL client | Required for Vercel Fluid connection pooling |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Remix template | React Router template | Remix merged into React Router v7; Remix template still maintained but React Router is future direction |
| PostgreSQL | SQLite | SQLite works for dev but not production-ready for multi-tenant app |
| Vercel Fluid | Prisma Accelerate | Accelerate is paid service; Fluid is Vercel-native and free |
| Session tokens | Third-party cookies | Cookies blocked by browsers in embedded context; session tokens mandatory since 2025 |

**Installation:**
```bash
# Initialize from Shopify template
npm create @shopify/app@latest

# Or use CLI
shopify app init

# Additional dependencies for Vercel deployment
npm install @vercel/functions @prisma/adapter-pg pg
npm install @shopify/shopify-app-session-storage-postgresql
```

## Architecture Patterns

### Recommended Project Structure

```
app/
├── routes/                    # Remix routes
│   ├── app._index.tsx        # Main dashboard
│   ├── auth.$.tsx            # OAuth callbacks
│   └── webhooks.tsx          # Webhook endpoints
├── shopify.server.ts         # Shopify API configuration
└── db.server.ts              # Prisma client singleton
prisma/
├── schema.prisma             # Database schema
└── migrations/               # Database migrations
public/                        # Static assets
```

### Pattern 1: OAuth Installation Flow

**What:** Authorization code grant with session token exchange for embedded apps

**When to use:** Every app install and reinstall (mandatory)

**Example:**
```typescript
// app/shopify.server.ts
// Source: https://shopify.dev/docs/api/shopify-app-remix/latest
import { shopifyApp } from "@shopify/shopify-app-remix/server";
import { PostgreSQLSessionStorage } from "@shopify/shopify-app-session-storage-postgresql";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL!,
  sessionStorage: new PostgreSQLSessionStorage(
    process.env.DATABASE_URL!
  ),
});

export default shopify;
```

### Pattern 2: Session Token Authentication

**What:** JWT-based authentication for embedded apps using App Bridge

**When to use:** Every authenticated request from frontend to backend (mandatory for embedded apps)

**Example:**
```typescript
// app/routes/app._index.tsx
// Source: https://shopify.dev/docs/apps/build/authentication-authorization/session-tokens
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  // Automatically validates session token from App Bridge
  const { admin, session } = await authenticate.admin(request);

  return json({
    shop: session.shop,
    accessToken: session.accessToken
  });
};
```

**Frontend setup:**
```html
<!-- app/root.tsx -->
<!-- Source: https://shopify.dev/docs/api/app-bridge-library -->
<meta name="shopify-api-key" content={ENV.SHOPIFY_API_KEY} />
<script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
```

### Pattern 3: GDPR Webhook Handlers

**What:** Three mandatory webhooks for App Store compliance

**When to use:** Register immediately during Phase 1 setup

**Example:**
```typescript
// app/shopify.server.ts
// Source: https://shopify.dev/docs/apps/build/compliance/privacy-law-compliance
const shopify = shopifyApp({
  webhooks: {
    CUSTOMERS_DATA_REQUEST: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
    CUSTOMERS_REDACT: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
    SHOP_REDACT: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
  },
});
```

```typescript
// app/routes/webhooks.tsx
// Source: https://shopify.dev/docs/apps/build/webhooks/subscribe/https
export const action = async ({ request }) => {
  const { topic, shop, session, payload } = await authenticate.webhook(request);

  switch (topic) {
    case "CUSTOMERS_DATA_REQUEST":
      // Log request, merchant has 30 days to fulfill
      await prisma.gdprRequest.create({
        data: { shop, type: "data_request", payload }
      });
      break;

    case "CUSTOMERS_REDACT":
      // Delete customer data from database
      await prisma.customerData.deleteMany({
        where: { customerId: payload.customer.id }
      });
      break;

    case "SHOP_REDACT":
      // Delete all shop data (48 hours after uninstall)
      await prisma.store.delete({ where: { shop } });
      break;
  }

  return new Response(null, { status: 200 });
};
```

### Pattern 4: Vercel Connection Pooling with Prisma

**What:** Prevent database connection exhaustion in serverless environment

**When to use:** Production deployment to Vercel (configure from start)

**Example:**
```typescript
// app/db.server.ts
// Source: https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/deploy-to-vercel
import { Pool } from 'pg';
import { attachDatabasePool } from '@vercel/functions';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
attachDatabasePool(pool);

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export default prisma;
```

```json
// package.json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Pattern 5: API Key Generation & Storage

**What:** Cryptographically secure API key for storefront authentication

**When to use:** Generate once per store on install, store hashed in database

**Example:**
```typescript
// Source: https://nodejs.org/api/crypto.html
import crypto from 'node:crypto';

// Generate secure API key
function generateApiKey(): string {
  return crypto.randomBytes(32).toString('hex'); // 64 character hex string
}

// Hash API key for storage
function hashApiKey(apiKey: string): string {
  return crypto.createHash('sha256').update(apiKey).digest('hex');
}

// Verify API key
function verifyApiKey(providedKey: string, storedHash: string): boolean {
  const providedHash = hashApiKey(providedKey);
  return crypto.timingSafeEqual(
    Buffer.from(providedHash),
    Buffer.from(storedHash)
  );
}

// On install
const apiKey = generateApiKey();
await prisma.store.create({
  data: {
    shop: session.shop,
    apiKeyHash: hashApiKey(apiKey),
  }
});

// Return plaintext key ONCE (merchant must save it)
return { apiKey }; // Show in dashboard, never stored plaintext
```

### Pattern 6: App Bridge Toast Notifications

**What:** Non-intrusive feedback messages for user actions

**When to use:** Success confirmations, non-critical errors

**Example:**
```typescript
// Source: https://shopify.dev/docs/api/app-bridge-library/reference/toast
// Frontend component
function ApiKeyDisplay({ apiKey }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    shopify.toast.show('API key copied', { duration: 3000 });
  };

  return (
    <Button onClick={handleCopy}>Copy API key</Button>
  );
}
```

### Anti-Patterns to Avoid

- **Third-party cookies for sessions:** Blocked by browsers in embedded context. Use session tokens exclusively.
- **Hard-coded OAuth redirect URLs:** Environment-specific. Use env vars and update Partner Dashboard per environment.
- **Prisma without connection pooling on Vercel:** Causes connection exhaustion under load. Configure pooling from start.
- **Missing GDPR webhooks:** Automatic App Store rejection. Register all three webhooks immediately.
- **Plaintext API key storage:** Security risk. Hash with SHA-256, verify with timing-safe comparison.
- **Ignoring webhook HMAC verification:** Security vulnerability. Always verify `X-Shopify-Hmac-SHA256` header.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| OAuth flow | Custom OAuth implementation | `@shopify/shopify-app-remix` | Handles authorization code grant, token exchange, session storage, HMAC verification, scope changes |
| Session token validation | Manual JWT verification | `authenticate.admin(request)` from shopify.server | Validates signature, checks expiration, extracts shop domain, handles token refresh |
| Database connection pooling | Manual pool management | Vercel Fluid's `attachDatabasePool` | Releases connections before function suspension, prevents exhaustion, no additional cost |
| Webhook HMAC verification | Custom crypto logic | `authenticate.webhook(request)` | Verifies signature with timing-safe comparison, extracts payload, prevents replay attacks |
| API key generation | `Math.random()` or UUIDs | `crypto.randomBytes()` | Cryptographically secure random generation, proper entropy, no predictability |
| Toast notifications | Custom notification system | App Bridge Toast API | Consistent with Shopify admin, auto-dismiss, accessibility built-in |

**Key insight:** Shopify's official libraries handle edge cases like scope changes, token expiration, HMAC verification, and browser compatibility. Building custom solutions introduces security vulnerabilities and maintenance burden. The official Remix template is battle-tested by thousands of apps.

## Common Pitfalls

### Pitfall 1: Third-Party Cookies for Embedded Sessions

**What goes wrong:** Using traditional cookie-based sessions in embedded apps causes authentication failures in Safari, Firefox, and Chrome Incognito due to third-party cookie blocking.

**Why it happens:** Developers assume standard web auth patterns work in iframe context.

**How to avoid:**
- Use session tokens exclusively (JWT format)
- Session tokens have 1-minute lifetime
- App Bridge automatically includes session token in fetch requests
- Backend validates token signature using shared secret
- Never store session in cookies for embedded context

**Warning signs:**
- Authentication works in standalone browser but fails when embedded
- Network tab shows blocked cookies
- Users report "stuck in login loop"

### Pitfall 2: Prisma Connection Exhaustion on Vercel

**What goes wrong:** Each serverless function invocation opens new database connections, quickly hitting PostgreSQL's connection limit (~100 default), causing "too many connections" errors.

**Why it happens:** Serverless functions don't maintain persistent connections. Prisma creates connection pools per invocation.

**How to avoid:**
- Use Vercel Fluid Compute with `attachDatabasePool(pool)`
- Alternative: Prisma Accelerate (paid) or external pooler (PgBouncer)
- Set low `connection_limit` in Prisma schema
- Configure connection pooling from Phase 1 (cannot retrofit easily)

**Warning signs:**
- "remaining connection slots reserved" errors
- App works fine with low traffic, crashes under load
- Database refuses new connections during tests

### Pitfall 3: Missing GDPR Webhooks

**What goes wrong:** Apps without all three GDPR webhooks (`customers/data_request`, `customers/redact`, `shop/redact`) face automatic App Store rejection.

**Why it happens:** Developers focus on functional features first, assume compliance can be added later.

**How to avoid:**
- Register all three webhooks in Phase 1
- Respond with 200 OK immediately (process async)
- Implement actual data deletion logic (not stub endpoints)
- Test with Shopify's webhook testing tool
- Document 30-day fulfillment process for data requests

**Warning signs:**
- Partner Dashboard shows missing webhook URLs
- App review feedback mentions GDPR compliance
- No webhook handler code in routes

### Pitfall 4: Production OAuth Redirect Mismatch

**What goes wrong:** OAuth works in development but fails in production with "redirect_uri mismatch" errors because redirect URLs weren't updated in Partner Dashboard.

**Why it happens:** Developers test installation once in dev, assume production works identically.

**How to avoid:**
- Update Partner Dashboard URLs when deploying to production
- Set "App URL" to production domain (e.g., `https://pricing-app.vercel.app`)
- Set "Allowed redirection URL(s)" to callback (e.g., `https://pricing-app.vercel.app/api/auth/callback`)
- Use environment variables for URLs (`.env.production`)
- Test full OAuth flow on production URL before submission

**Warning signs:**
- Fresh install attempts fail with redirect error
- Browser shows URL mismatch in error message
- App reviewers cannot complete installation

### Pitfall 5: Vercel Environment Variables Not Set

**What goes wrong:** Production deployment crashes with "SHOPIFY_API_KEY is not defined" because environment variables weren't configured in Vercel dashboard.

**Why it happens:** `.env` file is local only (gitignored). Developers forget to configure production environment.

**How to avoid:**
- Set variables in Vercel Project Settings → Environment Variables
- Required: `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`, `SHOPIFY_API_SCOPES`, `DATABASE_URL`, `HOST`
- Add for Production, Preview, and Development environments
- Use `vercel env pull` to sync locally
- Document required vars in README

**Warning signs:**
- Vercel function logs show "undefined" errors
- OAuth initialization fails
- Prisma cannot connect to database

## Code Examples

Verified patterns from official sources:

### Complete Shopify App Configuration

```typescript
// app/shopify.server.ts
// Source: https://shopify.dev/docs/api/shopify-app-remix/latest
import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PostgreSQLSessionStorage } from "@shopify/shopify-app-session-storage-postgresql";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  apiVersion: ApiVersion.January26, // Use latest stable
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || process.env.HOST!,
  authPathPrefix: "/auth",
  sessionStorage: new PostgreSQLSessionStorage(process.env.DATABASE_URL!),
  distribution: AppDistribution.AppStore,
  webhooks: {
    CUSTOMERS_DATA_REQUEST: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
    CUSTOMERS_REDACT: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
    SHOP_REDACT: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
  },
});

export default shopify;
export const authenticate = shopify.authenticate;
```

### Dashboard with Session Token Authentication

```typescript
// app/routes/app._index.tsx
// Source: https://shopify.dev/docs/apps/build/authentication-authorization/session-tokens
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Page, Card, Text } from "@shopify/polaris";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);

  // Query shop info
  const response = await admin.graphql(
    `#graphql
      query {
        shop {
          name
          email
          myshopifyDomain
        }
      }
    `
  );

  const { data } = await response.json();

  return json({
    shop: data.shop,
  });
};

export default function Index() {
  const { shop } = useLoaderData<typeof loader>();

  return (
    <Page title="Dashboard">
      <Card>
        <Text as="h2" variant="headingMd">
          Welcome to {shop.name}
        </Text>
        <Text as="p">
          Your app is successfully installed and authenticated.
        </Text>
      </Card>
    </Page>
  );
}
```

### API Key Generation on Install

```typescript
// app/routes/auth.callback.tsx
// Generate API key after successful OAuth install
import { redirect } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import crypto from "node:crypto";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  // Check if store already exists (reinstall)
  const existingStore = await prisma.store.findUnique({
    where: { shop: session.shop }
  });

  if (!existingStore) {
    // First install: generate API key
    const apiKey = crypto.randomBytes(32).toString('hex');
    const apiKeyHash = crypto.createHash('sha256')
      .update(apiKey)
      .digest('hex');

    await prisma.store.create({
      data: {
        shop: session.shop,
        accessToken: session.accessToken,
        apiKeyHash,
        scope: session.scope,
      }
    });

    // Store plaintext key in session to show once
    session.apiKey = apiKey;
  }

  return redirect("/app");
};
```

### Webhook HMAC Verification (Manual)

```typescript
// If not using authenticate.webhook, verify manually
// Source: https://shopify.dev/docs/apps/build/webhooks/subscribe/https
import crypto from 'node:crypto';

function verifyWebhookHmac(request: Request, secret: string): boolean {
  const hmac = request.headers.get('X-Shopify-Hmac-SHA256');
  if (!hmac) return false;

  const body = await request.text(); // Raw body required
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body, 'utf8')
    .digest('base64');

  return crypto.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(hash)
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Script Tag API for theme injection | Theme App Extensions (App Blocks) | 2022 | Theme code auto-removed on uninstall; no ghost code |
| Third-party cookies in iframes | Session tokens (JWT) | 2021, mandatory 2025 | Works in all browsers; Safari/Firefox compatible |
| Authorization code grant for embedded apps | Token exchange | 2023 | Faster auth; no full OAuth redirect for active sessions |
| REST Admin API | GraphQL Admin API | 2024 (REST deprecated Oct 2024) | Required for new apps as of April 2025 |
| Legacy custom apps | Dev Dashboard apps | Jan 2026 | Custom apps disabled; all new apps via Dev Dashboard |
| Remix | React Router v7 | Late 2025 | Remix merged into React Router; both supported |
| npm-managed App Bridge | CDN-loaded App Bridge | 2024 | Auto-updates; no version management needed |
| Separate session storage packages | Built-in session storage | Ongoing | PostgreSQL storage official; Redis/MySQL/SQLite available |

**Deprecated/outdated:**
- **Script Tag API:** Use Theme App Extensions instead (auto-removal on uninstall)
- **Cookie-based sessions:** Use session tokens (browser compatibility)
- **REST Admin API:** Use GraphQL (mandatory for new apps April 2025)
- **Legacy custom apps:** Create via Dev Dashboard or CLI (custom apps disabled Jan 2026)
- **Third-party billing:** Use Shopify Billing API (mandatory for App Store)

## Open Questions

Things that couldn't be fully resolved:

1. **API Key Regeneration Flow**
   - What we know: User decisions defer to Claude's discretion; common patterns show masked display with "Regenerate" button
   - What's unclear: Whether to support multiple active keys simultaneously or single key rotation
   - Recommendation: Start with single key + regeneration for v1; can add multi-key support in Phase 6 if needed

2. **Welcome Card Dismissal Persistence**
   - What we know: User wants dismissible welcome card; dismissed manually (not auto-dismiss)
   - What's unclear: Whether dismissal state persists across sessions or resets
   - Recommendation: Persist dismissal in database (store.onboardingCompleted boolean); prevents annoyance on each login

3. **Dashboard Navigation Structure**
   - What we know: User defers to Claude's discretion; should follow Shopify embedded app conventions
   - What's unclear: Tabs vs sidebar vs single page for Phase 1 (no matrices yet)
   - Recommendation: Single page dashboard for Phase 1; add tabs in Phase 2 when matrices exist

4. **Reinstall Data Handling**
   - What we know: User defers to Claude's discretion; should follow Shopify conventions
   - What's unclear: Preserve matrices on reinstall or start fresh?
   - Recommendation: Preserve all data on reinstall (common pattern); delete only on shop/redact webhook (48 hours after uninstall)

## Sources

### Primary (HIGH confidence)

- [Shopify Session Tokens Documentation](https://shopify.dev/docs/apps/build/authentication-authorization/session-tokens) - Session token implementation, validation, lifecycle
- [Shopify Authorization Code Grant](https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens/authorization-code-grant) - OAuth flow details, security requirements
- [Shopify GDPR Compliance](https://shopify.dev/docs/apps/build/compliance/privacy-law-compliance) - Mandatory webhooks, data handling requirements
- [Shopify App Store Requirements](https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements) - Technical requirements, authentication standards, API requirements
- [Shopify Remix Template GitHub](https://github.com/Shopify/shopify-app-template-remix) - Official template structure, configuration patterns
- [App Bridge Library](https://shopify.dev/docs/api/app-bridge-library) - Setup, authentication integration, APIs
- [App Bridge Toast API](https://shopify.dev/docs/api/app-bridge-library/reference/toast) - Toast notifications usage
- [Token Exchange Documentation](https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens/token-exchange) - Token exchange vs authorization code grant
- [Prisma Vercel Deployment](https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/deploy-to-vercel) - Connection pooling, Vercel Fluid setup
- [Node.js Crypto Module](https://nodejs.org/api/crypto.html) - Secure random generation, HMAC functions
- [PostgreSQL Session Storage Package](https://www.npmjs.com/package/@shopify/shopify-app-session-storage-postgresql) - Official session storage implementation
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables) - Environment configuration, secrets management
- [Vercel Connection Pooling](https://vercel.com/docs/integrations/connection-pooling-with-functions) - Fluid Compute setup

### Secondary (MEDIUM confidence)

- [Shopify Webhook Implementation Guide (Medium)](https://medium.com/@muhammadehsanullah123/how-to-configure-gdpr-compliance-webhooks-in-shopify-public-apps-b2107721a58f) - GDPR webhook configuration examples
- [Shopify App Testing Guide](https://shopify.dev/docs/apps/store/review/testing) - Development store setup, OAuth testing
- [API Security Best Practices (multiple sources)](https://www.tokenmetrics.com/blog/hmac-authentication-rest-api-endpoints) - HMAC authentication patterns
- [Secure API Key Generation Best Practices (LogRocket, Nearform)](https://blog.logrocket.com/uuids-node-js/) - Crypto.randomBytes vs alternatives
- [Polaris Onboarding Patterns](https://shopify.dev/docs/apps/design/user-experience/onboarding) - Welcome card best practices

### Tertiary (LOW confidence)

- Community discussions about API key display patterns (Stripe, Shopify blogs) - No authoritative UX specification found; rely on common patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Shopify documentation and packages
- Architecture patterns: HIGH - All patterns verified with official docs and template source
- Pitfalls: HIGH - Cross-referenced with official docs and project's PITFALLS.md
- Connection pooling: HIGH - Official Prisma and Vercel documentation
- API key generation: HIGH - Official Node.js crypto documentation
- GDPR webhooks: HIGH - Official Shopify compliance documentation
- Dashboard UX patterns: MEDIUM - User decisions defer to Claude's discretion; following Polaris conventions

**Research date:** 2026-02-04
**Valid until:** March 2026 (30 days for stable frameworks; Shopify API versions update quarterly)
