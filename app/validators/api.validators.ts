import { z } from "zod";

/**
 * Validates query parameters for the price endpoint.
 * Coerces string query params to numbers.
 */
export const PriceQuerySchema = z.object({
  width: z.coerce.number().positive("Width must be a positive number"),
  height: z.coerce.number().positive("Height must be a positive number"),
  quantity: z.coerce.number().int().positive().default(1),
});

/**
 * Validates productId URL parameter.
 * Accepts both numeric strings (e.g., "12345") and full GID format (e.g., "gid://shopify/Product/12345").
 */
export const ProductIdSchema = z.string().refine(
  (id) => {
    // Accept numeric strings
    if (/^\d+$/.test(id)) return true;
    // Accept full GID format
    if (/^gid:\/\/shopify\/Product\/\d+$/.test(id)) return true;
    return false;
  },
  {
    message:
      'Product ID must be numeric (e.g., "12345") or full GID format (e.g., "gid://shopify/Product/12345")',
  }
);

/**
 * Normalizes a product ID to GID format.
 * Converts numeric IDs to gid://shopify/Product/{id} format.
 * Leaves GID-formatted IDs unchanged.
 *
 * @param id - Product ID (numeric string or GID)
 * @returns Normalized GID format
 */
export function normalizeProductId(id: string): string {
  // If already in GID format, return as-is
  if (id.startsWith("gid://")) {
    return id;
  }
  // Convert numeric ID to GID format
  return `gid://shopify/Product/${id}`;
}
