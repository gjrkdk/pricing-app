# Phase 4: Public REST API - Research

**Researched:** 2026-02-05
**Domain:** Public REST API in Remix (Shopify embedded app context)
**Confidence:** HIGH

## Summary

Phase 4 implements a public REST API for headless storefronts to retrieve dimension-based prices. The API authenticates external clients via X-API-Key header and returns calculated prices using the existing price-calculator service. This is fundamentally different from the embedded admin app routes - it serves EXTERNAL clients (React storefronts, mobile apps) without Shopify session authentication.

Remix resource routes (routes without default component exports) provide the foundation for REST endpoints. Authentication uses the existing API key infrastructure (SHA-256 hashed keys with timing-safe comparison). Rate limiting prevents abuse, with in-memory storage acceptable for single-instance deployments but Redis required for multi-instance/serverless. Input validation via Zod ensures type safety and clear error messages. Error responses follow RFC 7807 problem details format for consistency.

**Primary recommendation:** Use Remix resource routes at `app/routes/api.v1.products.$productId.price.ts` with loader for GET requests, authenticate via existing api-key.server.ts utilities, validate inputs with Zod, implement in-memory rate limiting for initial MVP (document Redis migration path), and return RFC 7807-compliant JSON error responses.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Remix | 2.5 (existing) | Resource routes for REST endpoints | Native framework support, no additional routing needed |
| Zod | Latest 3.x | Input validation and type safety | Industry standard for TypeScript validation, already recommended in Shopify Remix ecosystem |
| Node.js crypto | Built-in | API key verification (SHA-256, timing-safe compare) | Already implemented in existing api-key.server.ts, zero dependencies |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| express-rate-limit | Latest 7.x | Rate limiting middleware | For Express-based Remix deployments; provides memory store and Redis adapters |
| remix-utils | Latest 7.x | CORS helper for resource routes | When enabling cross-origin requests for headless storefronts |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| In-memory rate limiting | Redis-based distributed rate limiting | In-memory acceptable for single-instance MVP; Redis required for multi-instance/serverless (documented as Phase 4+ enhancement) |
| Zod | Yup or Joi | Zod has superior TypeScript integration and smaller bundle size; already ecosystem standard |
| X-API-Key header | Authorization: Bearer | X-API-Key more explicit for API key auth; Bearer typically used for tokens (OAuth, JWT) |

**Installation:**
```bash
npm install zod express-rate-limit remix-utils
```

## Architecture Patterns

### Recommended Project Structure
```
app/
├── routes/
│   ├── api.v1.products.$productId.price.ts  # GET /api/v1/products/:productId/price
│   └── api.v1.health.ts                      # GET /api/v1/health (optional health check)
├── services/
│   ├── price-calculator.server.ts            # Existing (reused)
│   └── product-matrix-lookup.server.ts       # New: Fetch matrix for product
├── utils/
│   ├── api-key.server.ts                     # Existing (reused)
│   └── rate-limit.server.ts                  # New: Rate limiting config
└── validators/
    └── api.validators.ts                     # New: Zod schemas for API inputs
```

### Pattern 1: Remix Resource Route for REST Endpoints

**What:** Routes without default component exports become REST endpoints. Loaders handle GET requests, actions handle POST/PUT/PATCH/DELETE.

**When to use:** All public API endpoints that don't render UI.

**Example:**
```typescript
// Source: https://remix.run/docs/en/main/guides/resource-routes
// app/routes/api.v1.products.$productId.price.ts

import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { z } from "zod";

// Input validation schema
const PriceQuerySchema = z.object({
  width: z.coerce.number().positive(),
  height: z.coerce.number().positive(),
  quantity: z.coerce.number().int().positive().default(1),
});

export async function loader({ request, params }: LoaderFunctionArgs) {
  // 1. Authenticate API key
  // 2. Validate input (params, query params)
  // 3. Fetch matrix for product
  // 4. Calculate price
  // 5. Return JSON response

  return json({
    price: 99.99,
    currency: "USD",
    dimensions: { width: 24, height: 36 }
  });
}
```

### Pattern 2: API Key Authentication Middleware

**What:** Extract and verify X-API-Key header before processing request.

**When to use:** All protected API endpoints.

**Example:**
```typescript
// Source: Existing app/utils/api-key.server.ts + industry best practices
import { json } from "@remix-run/node";
import { verifyApiKey } from "~/utils/api-key.server";
import { prisma } from "~/db.server";

export async function authenticateApiKey(request: Request) {
  const apiKey = request.headers.get("X-API-Key");

  if (!apiKey) {
    throw json(
      {
        type: "https://api.example.com/errors/unauthorized",
        title: "Unauthorized",
        status: 401,
        detail: "X-API-Key header is required"
      },
      { status: 401 }
    );
  }

  // Find store by API key prefix (first 8 chars)
  const prefix = apiKey.substring(0, 8);
  const store = await prisma.store.findFirst({
    where: { apiKeyPrefix: prefix },
    select: { id: true, shop: true, apiKeyHash: true }
  });

  if (!store || !store.apiKeyHash) {
    throw json(
      {
        type: "https://api.example.com/errors/unauthorized",
        title: "Unauthorized",
        status: 401,
        detail: "Invalid API key"
      },
      { status: 401 }
    );
  }

  // Timing-safe comparison
  if (!verifyApiKey(apiKey, store.apiKeyHash)) {
    throw json(
      {
        type: "https://api.example.com/errors/unauthorized",
        title: "Unauthorized",
        status: 401,
        detail: "Invalid API key"
      },
      { status: 401 }
    );
  }

  return store;
}
```

### Pattern 3: Zod Input Validation with Type Inference

**What:** Define Zod schemas for query parameters and return validated, typed objects.

**When to use:** All API routes that accept query parameters or request bodies.

**Example:**
```typescript
// Source: https://dev.to/isnan__h/form-validation-in-remix-using-zod-4h3b
import { z } from "zod";

// Define schema
const PriceQuerySchema = z.object({
  width: z.coerce.number().positive("Width must be positive"),
  height: z.coerce.number().positive("Height must be positive"),
  quantity: z.coerce.number().int().positive().default(1),
});

// Validate and extract
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const rawParams = {
    width: url.searchParams.get("width"),
    height: url.searchParams.get("height"),
    quantity: url.searchParams.get("quantity"),
  };

  const result = PriceQuerySchema.safeParse(rawParams);

  if (!result.success) {
    throw json(
      {
        type: "https://api.example.com/errors/validation-failed",
        title: "Validation Failed",
        status: 400,
        detail: "Invalid query parameters",
        errors: result.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  const { width, height, quantity } = result.data;
  // TypeScript knows these are numbers!
}
```

### Pattern 4: RFC 7807 Problem Details for Errors

**What:** Standardized JSON error response format with type, title, status, detail fields.

**When to use:** All error responses (4xx, 5xx).

**Example:**
```typescript
// Source: https://www.mscharhag.com/api-design/rest-error-format
// RFC 7807 compliant error response

// 400 Bad Request
throw json(
  {
    type: "https://api.example.com/errors/invalid-dimensions",
    title: "Invalid Dimensions",
    status: 400,
    detail: "Dimensions exceed matrix range: width=999 (max=144)",
    instance: "/api/v1/products/123/price"
  },
  {
    status: 400,
    headers: { "Content-Type": "application/problem+json" }
  }
);

// 404 Not Found
throw json(
  {
    type: "https://api.example.com/errors/resource-not-found",
    title: "Resource Not Found",
    status: 404,
    detail: "No price matrix assigned to product ID: 456"
  },
  { status: 404 }
);

// 429 Too Many Requests
throw json(
  {
    type: "https://api.example.com/errors/rate-limit-exceeded",
    title: "Rate Limit Exceeded",
    status: 429,
    detail: "Too many requests. Please retry after 60 seconds."
  },
  {
    status: 429,
    headers: { "Retry-After": "60" }
  }
);
```

### Pattern 5: Rate Limiting with express-rate-limit

**What:** Limit requests per IP address within a time window using in-memory or Redis storage.

**When to use:** All public API endpoints to prevent abuse.

**Example:**
```typescript
// Source: https://www.launchway.dev/blog/remix-rate-limiting
// app/utils/rate-limit.server.ts

import rateLimit from "express-rate-limit";

// In-memory rate limiter (single instance only)
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  handler: (req, res) => {
    res.status(429).json({
      type: "https://api.example.com/errors/rate-limit-exceeded",
      title: "Rate Limit Exceeded",
      status: 429,
      detail: `Too many requests from this IP, please try again after 15 minutes.`
    });
  },
});

// Apply in resource route
export async function loader({ request }: LoaderFunctionArgs) {
  // Note: express-rate-limit requires Express middleware integration
  // For Remix on Express, apply in server.ts
  // For other runtimes, use alternative like @remix-utils/rate-limiter
}
```

### Pattern 6: CORS Configuration for Public API

**What:** Enable cross-origin requests from external headless storefronts.

**When to use:** Public API endpoints called from browser-based storefronts.

**Example:**
```typescript
// Source: https://sergiodxa.github.io/remix-utils/functions/server_cors.cors.html
import { cors } from "remix-utils/cors";

export async function loader({ request }: LoaderFunctionArgs) {
  // ... API logic ...

  const response = json({ price: 99.99 });

  // Enable CORS for specific origins
  return await cors(request, response, {
    origin: true, // Or specify allowed origins: ["https://store.example.com"]
    credentials: true,
  });
}
```

### Anti-Patterns to Avoid

- **Don't parse Shopify GIDs manually:** Always use admin_graphql_api_id from REST or legacyResourceId from GraphQL for ID conversion
- **Don't log API keys:** Never log the full API key in application logs; use prefix only for debugging
- **Don't use API keys in query parameters:** Always require X-API-Key header to prevent accidental exposure in logs/browser history
- **Don't skip rate limiting:** Even authenticated requests need rate limiting to prevent abuse
- **Don't return detailed errors to clients:** Return generic messages for auth failures; log details server-side only
- **Don't use memory store in multi-instance deployments:** express-rate-limit memory store doesn't share state across instances; use Redis for distributed systems

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Input validation | Custom regex/parsing for numbers, types | Zod schemas | Handles coercion, nested objects, custom error messages, type inference |
| API key comparison | String equality `===` | crypto.timingSafeEqual() | Prevents timing attacks; already in api-key.server.ts |
| Rate limiting | Custom in-memory counter with setTimeout | express-rate-limit or @remix-utils/rate-limiter | Handles sliding windows, cleanup, distributed storage, Retry-After headers |
| Error responses | Ad-hoc `{ error: string }` objects | RFC 7807 problem details format | Industry standard, machine-readable, extensible |
| CORS headers | Manual header setting | remix-utils cors() helper | Handles preflight, credentials, multiple origins, edge cases |

**Key insight:** Security primitives (timing-safe compare), rate limiting algorithms (sliding windows), and validation logic (type coercion) have subtle edge cases that libraries solve. The existing codebase already uses crypto.timingSafeEqual in api-key.server.ts - don't deviate from this pattern.

## Common Pitfalls

### Pitfall 1: Memory Store in Serverless/Multi-Instance Deployments

**What goes wrong:** express-rate-limit default MemoryStore keeps counters in local memory. In serverless (Vercel, AWS Lambda) or multi-instance deployments, each instance has separate memory. A client can bypass limits by hitting different instances, and counters reset on every cold start.

**Why it happens:** MemoryStore documentation warns about this but developers miss it during initial implementation. It works perfectly in local development (single process) so the issue only appears in production.

**How to avoid:**
- For single-instance deployments (single server, single Docker container): MemoryStore is acceptable
- For serverless or multi-instance: Use Redis with rate-limit-redis adapter
- Document this limitation explicitly in code comments and plan migration before multi-instance deployment

**Warning signs:**
- Rate limits don't work consistently across requests
- Limits reset unexpectedly after deployments
- Different clients report different limit counts

**Reference:** [express-rate-limit documentation](https://github.com/express-rate-limit/express-rate-limit/blob/main/readme.md) - "The default MemoryStore keeps the hit counts for clients in memory, and thus produces inconsistent results when running multiple servers or processes."

### Pitfall 2: Product ID Format Confusion (REST vs GraphQL)

**What goes wrong:** External clients may provide Shopify product IDs in REST format (numeric: `"12345"`) or GraphQL format (GID: `"gid://shopify/Product/12345"`). Developers might attempt to manually parse or construct these IDs, causing breakage when Shopify changes ID structure.

**Why it happens:** Documentation shows both formats. Developers see the pattern `gid://shopify/{Type}/{ID}` and assume they can extract the numeric part with string splitting.

**How to avoid:**
- Accept BOTH formats in the API (validate with Zod union schema)
- If numeric ID provided, query Shopify ProductMatrix by numeric product ID (stored in database)
- If GID provided, use it directly for Shopify API queries
- NEVER manually parse or construct GIDs
- Use Shopify's admin_graphql_api_id and legacyResourceId fields for conversion

**Warning signs:**
- ID validation breaks after Shopify API updates
- Some products work, others fail with same input format
- Hard-coded string splitting logic like `gid.split('/')[4]`

**Reference:** [Shopify Global IDs documentation](https://shopify.dev/docs/api/usage/gids) - "Don't generate IDs programmatically. Always treat the admin_graphql_api_id string as an opaque ID."

### Pitfall 3: Exposing Detailed Error Messages to External Clients

**What goes wrong:** Returning detailed database errors, stack traces, or internal implementation details (e.g., "Prisma query failed: Table 'Store' not found") to external API clients leaks information useful for attackers.

**Why it happens:** Development error responses show helpful debugging details. Developers forget to sanitize these in production or use the same error handling for internal admin routes and public API routes.

**How to avoid:**
- Return generic error messages for authentication failures: "Invalid API key" (not "API key hash mismatch")
- Return generic errors for server issues: "Internal server error" (not Prisma/database details)
- Log detailed errors server-side with request IDs for debugging
- Use RFC 7807 problem details with carefully chosen `detail` fields
- Never return stack traces in production

**Warning signs:**
- API responses contain database table names
- Error messages mention internal service names
- Stack traces visible in API responses

**Reference:** [OWASP REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html) - "Ensure that error messages do not disclose information about the application's architecture or internal state."

### Pitfall 4: Skipping CORS Configuration

**What goes wrong:** Browser-based headless storefronts (React SPAs) make API requests and receive CORS errors: "blocked by CORS policy: No 'Access-Control-Allow-Origin' header". Developers then enable CORS with `origin: "*"` allowing ANY domain to call the API, including malicious sites.

**Why it happens:** CORS only affects browser requests (not server-to-server), so developers testing with curl/Postman don't encounter the issue until browser testing. The quickest fix is `origin: "*"` which works but removes an important security layer.

**How to avoid:**
- Enable CORS explicitly for public API routes using remix-utils cors()
- Use `origin: true` to allow the requesting origin (validated against X-API-Key)
- OR specify allowed origins explicitly: `origin: ["https://store.example.com"]`
- For public APIs with API key auth, CORS is a defense-in-depth layer (not primary security)
- Document that API keys should NOT be exposed in client-side code (use backend proxy)

**Warning signs:**
- Wildcard CORS: `Access-Control-Allow-Origin: *` with credentials
- API keys committed to frontend repositories
- Public API endpoints accessible without authentication

**Reference:** [MDN CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) and [remix-utils CORS helper](https://sergiodxa.github.io/remix-utils/functions/server_cors.cors.html)

### Pitfall 5: Ignoring Rate Limit Headers

**What goes wrong:** API returns 429 Too Many Requests without Retry-After header, or clients ignore the header and immediately retry, causing exponential backoff failures and wasted server resources.

**Why it happens:** Rate limiting middleware is configured but response headers aren't customized. Client libraries may not automatically respect Retry-After.

**How to avoid:**
- Always include `Retry-After` header in 429 responses (seconds format: `Retry-After: 60`)
- Use express-rate-limit standardHeaders: true for automatic RateLimit-* headers
- Document retry behavior in API documentation
- Test with rate-limited scenarios (not just happy path)

**Warning signs:**
- 429 responses missing Retry-After header
- Client logs show immediate retries after 429
- Exponential increase in 429 responses under load

**Reference:** [RFC 6585 HTTP 429](https://datatracker.ietf.org/doc/html/rfc6585) and [MDN Retry-After header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After)

## Code Examples

### Complete Resource Route with Authentication + Validation + Error Handling

```typescript
// app/routes/api.v1.products.$productId.price.ts
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { authenticateApiKey } from "~/utils/api-auth.server";
import { calculatePrice, validateDimensions } from "~/services/price-calculator.server";
import { prisma } from "~/db.server";

// Zod validation schema
const PriceQuerySchema = z.object({
  width: z.coerce.number().positive("Width must be positive"),
  height: z.coerce.number().positive("Height must be positive"),
  quantity: z.coerce.number().int().positive().default(1),
});

// Shopify product ID can be numeric or GID format
const ProductIdSchema = z.union([
  z.string().regex(/^\d+$/, "Invalid numeric product ID"),
  z.string().regex(/^gid:\/\/shopify\/Product\/\d+$/, "Invalid GID format"),
]);

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    // 1. Authenticate API key
    const store = await authenticateApiKey(request);

    // 2. Validate product ID
    const productIdResult = ProductIdSchema.safeParse(params.productId);
    if (!productIdResult.success) {
      throw json(
        {
          type: "https://api.example.com/errors/invalid-product-id",
          title: "Invalid Product ID",
          status: 400,
          detail: "Product ID must be numeric (e.g., '12345') or GID format (e.g., 'gid://shopify/Product/12345')",
        },
        { status: 400 }
      );
    }

    // 3. Validate query parameters
    const url = new URL(request.url);
    const queryResult = PriceQuerySchema.safeParse({
      width: url.searchParams.get("width"),
      height: url.searchParams.get("height"),
      quantity: url.searchParams.get("quantity"),
    });

    if (!queryResult.success) {
      throw json(
        {
          type: "https://api.example.com/errors/validation-failed",
          title: "Validation Failed",
          status: 400,
          detail: "Invalid query parameters",
          errors: queryResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { width, height, quantity } = queryResult.data;

    // 4. Validate dimensions (business logic)
    const dimensionValidation = validateDimensions(width, height, quantity);
    if (!dimensionValidation.valid) {
      throw json(
        {
          type: "https://api.example.com/errors/invalid-dimensions",
          title: "Invalid Dimensions",
          status: 400,
          detail: dimensionValidation.error,
        },
        { status: 400 }
      );
    }

    // 5. Fetch product matrix
    const productMatrix = await prisma.productMatrix.findUnique({
      where: { productId: params.productId },
      include: {
        matrix: {
          include: {
            widthBreakpoints: true,
            cells: true,
          },
        },
      },
    });

    if (!productMatrix) {
      throw json(
        {
          type: "https://api.example.com/errors/no-matrix-assigned",
          title: "No Matrix Assigned",
          status: 404,
          detail: `No price matrix assigned to product: ${params.productId}`,
        },
        { status: 404 }
      );
    }

    // 6. Calculate price using existing service
    const matrixData = {
      widthBreakpoints: productMatrix.matrix.widthBreakpoints
        .filter((bp) => bp.axis === "width")
        .map((bp) => ({ position: bp.position, value: bp.value })),
      heightBreakpoints: productMatrix.matrix.widthBreakpoints
        .filter((bp) => bp.axis === "height")
        .map((bp) => ({ position: bp.position, value: bp.value })),
      cells: productMatrix.matrix.cells.map((cell) => ({
        widthPosition: cell.widthPosition,
        heightPosition: cell.heightPosition,
        price: cell.price,
      })),
    };

    const unitPrice = calculatePrice(width, height, matrixData);
    const totalPrice = unitPrice * quantity;

    // 7. Return success response
    return json({
      success: true,
      data: {
        productId: params.productId,
        unitPrice,
        totalPrice,
        quantity,
        dimensions: {
          width,
          height,
          unit: store.unitPreference,
        },
      },
    });

  } catch (error) {
    // Re-throw JSON responses (from authenticateApiKey, validation, etc.)
    if (error instanceof Response) {
      throw error;
    }

    // Catch unexpected errors and return generic 500
    console.error("Unexpected error in price API:", error);
    throw json(
      {
        type: "https://api.example.com/errors/internal-server-error",
        title: "Internal Server Error",
        status: 500,
        detail: "An unexpected error occurred while processing your request",
      },
      { status: 500 }
    );
  }
}
```

### Health Check Endpoint

```typescript
// app/routes/api.v1.health.ts
import { json } from "@remix-run/node";
import { prisma } from "~/db.server";

export async function loader() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;

    return json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "price-matrix-api",
      version: "1.0.0",
    });
  } catch (error) {
    return json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Database connection failed",
      },
      { status: 503 }
    );
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual CORS header setting | remix-utils cors() helper | 2023-2024 | Simplified CORS config, handles preflight automatically |
| Custom validation logic | Zod schemas with safeParse() | 2022-2023 | Type inference, better error messages, composable schemas |
| API versioning in headers | URL path versioning (/api/v1/) | Ongoing standard | More visible, better caching, easier client routing |
| Basic error objects | RFC 7807 problem details | 2016 RFC, adopted widely | Machine-readable, standardized, extensible with custom fields |
| Global rate limiting | Per-route or per-key rate limiting | Ongoing evolution | More granular control, different limits for different endpoints/users |

**Deprecated/outdated:**
- **Remix v1 response helpers:** Old `json()` from @remix-run/node replaced with built-in Response objects in some examples (but json() is still recommended for simplicity)
- **express-rate-limit v6:** Version 7 changed default headers to use standard RateLimit-* headers instead of X-RateLimit-*
- **API keys in query strings:** Previously common but now considered security anti-pattern; headers required

## Open Questions

1. **Rate limiting strategy for Phase 4 MVP**
   - What we know: MemoryStore works for single instance; Redis required for multi-instance
   - What's unclear: What's the deployment target? Single server vs serverless vs multi-instance?
   - Recommendation: Start with MemoryStore for MVP, add Redis migration task to Phase 5/6 if multi-instance deployment planned. Document this decision and limitation in code.

2. **Product ID format to accept**
   - What we know: External clients might use REST numeric IDs or GraphQL GIDs; both are valid
   - What's unclear: Does ProductMatrix.productId store numeric or GID format?
   - Recommendation: Check database schema during planning. Accept both formats in API validation, normalize internally.

3. **CORS origin allowlist strategy**
   - What we know: API keys authenticate requests; CORS is defense-in-depth for browser requests
   - What's unclear: Should merchants configure allowed origins, or allow all origins (relying on API key)?
   - Recommendation: Phase 4 MVP allows all origins (origin: true) with API key required. Add merchant-configured allowlist as Phase 6 enhancement.

4. **Rate limit values per endpoint**
   - What we know: Industry standard is ~100-1000 requests per 15min window per IP
   - What's unclear: Should pricing endpoint have different limits than Draft Order creation?
   - Recommendation: Start conservative (100 req/15min for pricing, 20 req/15min for order creation). Add monitoring in Phase 5 and adjust based on metrics.

5. **API response format for successful price lookups**
   - What we know: Should include price, dimensions, quantity. Currency assumed to be store's default.
   - What's unclear: Should response include breakpoint details (which breakpoint was used)?
   - Recommendation: Return only calculated price for MVP. Add breakpoint metadata (for debugging) as optional query param `?debug=true` in Phase 6.

## Sources

### Primary (HIGH confidence)

- [Remix Resource Routes Official Docs](https://remix.run/docs/en/main/guides/resource-routes) - Resource route fundamentals
- [Remix API Routes Official Docs](https://remix.run/docs/en/main/guides/api-routes) - API design patterns
- [OWASP REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html) - Security best practices
- [RFC 7807 Problem Details for HTTP APIs](https://www.mscharhag.com/api-design/rest-error-format) - Error response standard
- [express-rate-limit GitHub](https://github.com/express-rate-limit/express-rate-limit) - Rate limiting library documentation
- [Shopify Global IDs Documentation](https://shopify.dev/docs/api/usage/gids) - Product ID format specification
- [MDN HTTP 429 Status Code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429) - Rate limiting response format
- [MDN Retry-After Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After) - Retry header specification

### Secondary (MEDIUM confidence)

- [Remix Rate Limiting Tutorial](https://www.launchway.dev/blog/remix-rate-limiting) - express-rate-limit integration with Remix
- [Zod with Remix Actions](https://dev.to/isnan__h/form-validation-in-remix-using-zod-4h3b) - Input validation patterns
- [REST API Validation with Zod](https://jeffsegovia.dev/blogs/rest-api-validation-using-zod) - API validation examples
- [API Authentication Best Practices 2026](https://dev.to/apiverve/api-authentication-best-practices-in-2026-3k4a) - API key security patterns
- [Node.js Logging Best Practices](https://blog.logrocket.com/node-js-logging-best-practices-essential-guide/) - Logging sensitive data handling
- [API Versioning Strategies](https://www.oreateai.com/blog/mastering-rest-api-versioning-best-practices-for-seamless-integration/c2aba91c8f8732048f9df1ded50b5b07) - URL path versioning rationale
- [Distributed Rate Limiting Design](https://medium.com/@goyalarchana17/rate-limiter-design-why-what-how-and-the-case-for-distributed-vs-single-instance-3b4f09418b7d) - In-memory vs Redis tradeoffs
- [API Key Rotation Best Practices](https://blog.gitguardian.com/api-key-rotation-best-practices/) - Key management patterns

### Tertiary (LOW confidence)

- [Remix Integration Testing with Vitest](https://www.simplethread.com/isolated-integration-testing-with-remix-vitest-and-prisma/) - Testing patterns for resource routes
- [remix-utils CORS Helper](https://sergiodxa.github.io/remix-utils/functions/server_cors.cors.html) - CORS configuration utility
- [JSON:API Specification](https://jsonapi.org/format/) - Alternative error response format (not used, but reference for comparison)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Remix resource routes are native framework feature; Zod is ecosystem standard; existing crypto utilities proven
- Architecture: HIGH - Resource route patterns from official docs; error format from RFC 7807; validation patterns from multiple verified sources
- Pitfalls: HIGH - MemoryStore limitation documented by library maintainers; Shopify GID parsing anti-pattern from official docs; security issues from OWASP

**Research date:** 2026-02-05
**Valid until:** 60 days (Remix patterns stable; Zod stable; rate limiting libraries stable; security standards long-lived)

**Phase-specific notes:**
- Existing services can be directly reused (price-calculator, api-key utilities)
- No new external dependencies required for MVP (Zod is only new addition)
- Rate limiting can start simple (in-memory) with documented migration path
- CORS and API versioning decisions made (origin: true, /api/v1/ path)
