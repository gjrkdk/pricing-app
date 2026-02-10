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

/**
 * Validates request body for Draft Order creation endpoint.
 */
export const DraftOrderSchema = z.object({
  productId: z.string().refine(
    (id) => /^\d+$/.test(id) || /^gid:\/\/shopify\/Product\/\d+$/.test(id),
    { message: "Product ID must be numeric or GID format" }
  ),
  width: z.number().positive("Width must be a positive number"),
  height: z.number().positive("Height must be a positive number"),
  quantity: z.number().int().positive().default(1),
});

/**
 * Validates a single option selection.
 * Used for both query parameters and POST body arrays.
 */
export const OptionSelectionSchema = z.object({
  optionGroupId: z.string().min(1, "Option group ID is required"),
  choiceId: z.string().min(1, "Choice ID is required"),
});

/**
 * Validates the JSON-encoded options parameter for GET requests.
 * Max 5 selections matches the 5 option groups per product cap.
 */
export const OptionSelectionsSchema = z.object({
  selections: z.array(OptionSelectionSchema).max(5, "Maximum 5 option selections allowed"),
});

/**
 * Extends PriceQuerySchema with optional option selections.
 * Used for GET /api/stores/:storeId/products/:productId/price endpoint.
 * Options parameter is JSON-encoded string for query params.
 */
export const PriceQueryWithOptionsSchema = PriceQuerySchema.extend({
  options: z.string().optional(),
});

/**
 * Extends DraftOrderSchema with optional option selections.
 * Used for POST /api/stores/:storeId/draft-orders endpoint.
 * Options parameter is direct array for POST body.
 */
export const DraftOrderWithOptionsSchema = DraftOrderSchema.extend({
  options: z.array(OptionSelectionSchema).max(5, "Maximum 5 option selections allowed").optional(),
});

// Inferred TypeScript types
export type OptionSelection = z.infer<typeof OptionSelectionSchema>;
export type OptionSelections = z.infer<typeof OptionSelectionsSchema>;
export type PriceQueryWithOptions = z.infer<typeof PriceQueryWithOptionsSchema>;
export type DraftOrderWithOptions = z.infer<typeof DraftOrderWithOptionsSchema>;
