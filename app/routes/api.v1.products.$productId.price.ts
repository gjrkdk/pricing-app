/**
 * REST API Endpoint: GET /api/v1/products/:productId/price
 *
 * Returns dimension-based price for a product with assigned matrix.
 * Requires API key authentication, validates input, enforces rate limits.
 */

import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { authenticateApiKey } from "~/utils/api-auth.server";
import {
  PriceQueryWithOptionsSchema,
  ProductIdSchema,
  normalizeProductId,
  OptionSelectionsSchema,
  type OptionSelection,
} from "~/validators/api.validators";
import { checkRateLimit, getRateLimitHeaders } from "~/utils/rate-limit.server";
import { lookupProductMatrix } from "~/services/product-matrix-lookup.server";
import {
  calculatePrice,
  validateDimensions,
} from "~/services/price-calculator.server";
import { validateOptionSelections } from "~/services/option-validator.server";
import {
  calculatePriceWithOptions,
  type PriceModifier,
} from "~/services/option-price-calculator.server";

/**
 * Adds CORS headers to a response to allow cross-origin requests.
 */
function withCors(response: Response): Response {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "X-API-Key, Content-Type");
  return response;
}

/**
 * Handles GET requests to fetch price for given dimensions.
 */
export async function loader({ request, params }: LoaderFunctionArgs) {
  // Handle OPTIONS preflight before authentication
  if (request.method === "OPTIONS") {
    return withCors(new Response(null, { status: 204 }));
  }

  try {
    // 1. Authentication
    const store = await authenticateApiKey(request);

    // 2. Rate limiting
    checkRateLimit(store.id);

    // 3. Validate product ID
    const productIdValidation = ProductIdSchema.safeParse(params.productId);
    if (!productIdValidation.success) {
      throw json(
        {
          type: "about:blank",
          title: "Bad Request",
          status: 400,
          detail: "Invalid product ID format",
        },
        { status: 400 }
      );
    }
    const normalizedProductId = normalizeProductId(productIdValidation.data);

    // 4. Validate query parameters
    const url = new URL(request.url);
    const queryParams: Record<string, string> = {};
    const widthParam = url.searchParams.get("width");
    const heightParam = url.searchParams.get("height");
    const quantityParam = url.searchParams.get("quantity");
    const optionsParam = url.searchParams.get("options");
    if (widthParam !== null) queryParams.width = widthParam;
    if (heightParam !== null) queryParams.height = heightParam;
    if (quantityParam !== null) queryParams.quantity = quantityParam;
    if (optionsParam !== null) queryParams.options = optionsParam;

    const queryValidation = PriceQueryWithOptionsSchema.safeParse(queryParams);
    if (!queryValidation.success) {
      throw json(
        {
          type: "about:blank",
          title: "Validation Failed",
          status: 400,
          detail: "Invalid query parameters",
          errors: queryValidation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { width, height, quantity, options } = queryValidation.data;

    // 5. Validate dimensions (business logic)
    const dimensionValidation = validateDimensions(width, height, quantity);
    if (!dimensionValidation.valid) {
      throw json(
        {
          type: "about:blank",
          title: "Bad Request",
          status: 400,
          detail: dimensionValidation.error || "Invalid dimensions",
        },
        { status: 400 }
      );
    }

    // 5a. Parse and validate option selections if provided
    let parsedSelections: OptionSelection[] = [];
    let validatedGroups: any[] | undefined;

    if (options) {
      // Parse JSON
      let parsedOptions: unknown;
      try {
        parsedOptions = JSON.parse(options);
      } catch (error) {
        throw json(
          {
            type: "about:blank",
            title: "Bad Request",
            status: 400,
            detail: "Invalid options JSON",
          },
          { status: 400 }
        );
      }

      // Validate format
      const optionsValidation = OptionSelectionsSchema.safeParse(parsedOptions);
      if (!optionsValidation.success) {
        throw json(
          {
            type: "about:blank",
            title: "Validation Failed",
            status: 400,
            detail: "Invalid options format",
            errors: optionsValidation.error.flatten().fieldErrors,
          },
          { status: 400 }
        );
      }

      parsedSelections = optionsValidation.data.selections;

      // Validate selections against product's option groups
      if (parsedSelections.length > 0) {
        const validationResult = await validateOptionSelections(
          normalizedProductId,
          parsedSelections,
          store.id
        );

        if (!validationResult.valid) {
          throw json(
            {
              type: "about:blank",
              title: "Bad Request",
              status: 400,
              detail: validationResult.error || "Invalid option selections",
            },
            { status: 400 }
          );
        }

        validatedGroups = validationResult.validatedGroups;
      }
    }

    // 6. Look up product matrix
    const productMatrix = await lookupProductMatrix(
      normalizedProductId,
      store.id
    );
    if (!productMatrix) {
      throw json(
        {
          type: "about:blank",
          title: "Not Found",
          status: 404,
          detail: "No price matrix assigned to this product",
        },
        { status: 404 }
      );
    }

    // 7. Calculate price (with or without options)
    let unitPrice: number;
    let basePriceCents: number;
    let priceBreakdown: any;

    try {
      basePriceCents = calculatePrice(width, height, productMatrix.matrixData);
    } catch (error) {
      // Price calculation failed (missing cell) - return 500
      console.error("Price calculation error:", error);
      throw json(
        {
          type: "about:blank",
          title: "Internal Server Error",
          status: 500,
          detail: "Failed to calculate price",
        },
        { status: 500 }
      );
    }

    // Calculate with options if provided
    if (parsedSelections.length > 0 && validatedGroups) {
      // Build price modifiers from selections and validated groups
      const modifiers: PriceModifier[] = [];

      for (const selection of parsedSelections) {
        const group = validatedGroups.find((g: any) => g.id === selection.optionGroupId);
        if (group) {
          const choice = group.choices.find((c: any) => c.id === selection.choiceId);
          if (choice) {
            modifiers.push({
              type: choice.modifierType,
              value: choice.modifierValue,
              label: `${group.name}: ${choice.label}`,
            });
          }
        }
      }

      priceBreakdown = calculatePriceWithOptions(basePriceCents, modifiers);
      unitPrice = priceBreakdown.totalCents;
    } else {
      // No options: use base price
      unitPrice = basePriceCents;
    }

    // 8. Return success response with CORS and rate limit headers
    const total = unitPrice * quantity;
    const rateLimitHeaders = getRateLimitHeaders(store.id);

    // Build response based on whether options were provided
    const responseBody: any = {
      price: unitPrice,
      currency: productMatrix.currency,
      dimensions: {
        width,
        height,
        unit: productMatrix.unit,
      },
      quantity,
      total,
      matrix: productMatrix.matrixName,
      dimensionRange: productMatrix.dimensionRange,
    };

    // Add breakdown if options were used
    if (priceBreakdown) {
      responseBody.basePrice = priceBreakdown.basePriceCents;
      responseBody.optionModifiers = priceBreakdown.modifiers.map((m: any) => {
        // Split label on ": " to get group name and choice label
        const [groupName, choiceLabel] = m.label.split(": ");
        return {
          optionGroup: groupName,
          choice: choiceLabel,
          modifierType: m.type,
          modifierValue: m.originalValue,
          appliedAmount: m.appliedAmountCents,
        };
      });
    }

    const response = json(responseBody, {
      headers: rateLimitHeaders,
    });

    return withCors(response);
  } catch (error) {
    // Global error handler: add CORS to all error responses
    if (error instanceof Response) {
      return withCors(error);
    }

    // Unexpected error - return 500 with generic message
    console.error("Unexpected API error:", error);
    return withCors(
      json(
        {
          type: "about:blank",
          title: "Internal Server Error",
          status: 500,
          detail: "An unexpected error occurred",
        },
        { status: 500 }
      )
    );
  }
}

/**
 * Handles non-GET methods (OPTIONS for CORS preflight, 405 for others).
 */
export async function action({ request }: LoaderFunctionArgs) {
  // Handle OPTIONS preflight for CORS
  if (request.method === "OPTIONS") {
    return withCors(new Response(null, { status: 204 }));
  }

  // All other methods: 405 Method Not Allowed
  return withCors(
    json(
      {
        type: "about:blank",
        title: "Method Not Allowed",
        status: 405,
        detail: `Method ${request.method} is not allowed. Use GET to fetch price.`,
      },
      { status: 405 }
    )
  );
}
