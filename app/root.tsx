import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="shopify-api-key" content={process.env.SHOPIFY_API_KEY || ""} />
        <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="shopify-api-key" content={process.env.SHOPIFY_API_KEY || ""} />
        <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js" />
        <Meta />
        <Links />
      </head>
      <body>
        <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
          <h1>Something went wrong</h1>
          {isRouteErrorResponse(error) ? (
            <div>
              <h2>
                {error.status} {error.statusText}
              </h2>
              <p>{error.data}</p>
            </div>
          ) : error instanceof Error ? (
            <div>
              <h2>Error</h2>
              <p>{error.message}</p>
            </div>
          ) : (
            <h2>Unknown Error</h2>
          )}
          <a href="/auth/login" style={{ marginTop: "1rem", display: "inline-block" }}>
            Try installing again
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
