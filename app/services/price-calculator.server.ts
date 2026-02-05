/**
 * Price Calculator Service
 *
 * Provides price calculation logic for dimension-based pricing matrices.
 * Handles breakpoint lookup, rounding up between breakpoints, and clamping
 * for dimensions outside the defined breakpoint ranges.
 */

export interface MatrixData {
  widthBreakpoints: Array<{ position: number; value: number }>;
  heightBreakpoints: Array<{ position: number; value: number }>;
  cells: Array<{ widthPosition: number; heightPosition: number; price: number }>;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates customer dimensions and quantity.
 *
 * @param width - Width dimension (must be positive)
 * @param height - Height dimension (must be positive)
 * @param quantity - Quantity (must be positive integer)
 * @returns Validation result with error message if invalid
 */
export function validateDimensions(
  width: number,
  height: number,
  quantity: number
): ValidationResult {
  if (width <= 0 || height <= 0) {
    return {
      valid: false,
      error: "Width and height must be positive numbers",
    };
  }

  if (quantity <= 0 || !Number.isInteger(quantity)) {
    return {
      valid: false,
      error: "Quantity must be a positive integer",
    };
  }

  return { valid: true };
}

/**
 * Calculates price for given dimensions using matrix breakpoints.
 *
 * Behavior:
 * - Exact breakpoint match: uses that breakpoint's position
 * - Between breakpoints: rounds UP to next higher breakpoint
 * - Below smallest breakpoint: clamps to position 0
 * - Above largest breakpoint: clamps to last position
 *
 * @param width - Customer width dimension
 * @param height - Customer height dimension
 * @param matrixData - Matrix with breakpoints and price cells
 * @returns Unit price for the dimensions
 * @throws Error if no price cell exists for calculated position
 */
export function calculatePrice(
  width: number,
  height: number,
  matrixData: MatrixData
): number {
  // Sort breakpoints by position to ensure correct ordering
  const sortedWidthBreakpoints = [...matrixData.widthBreakpoints].sort(
    (a, b) => a.position - b.position
  );
  const sortedHeightBreakpoints = [...matrixData.heightBreakpoints].sort(
    (a, b) => a.position - b.position
  );

  // Find width position
  // findIndex returns first breakpoint where dimension <= breakpoint.value
  // This naturally handles "round up" behavior
  const widthIndex = sortedWidthBreakpoints.findIndex(
    (bp) => width <= bp.value
  );

  // If findIndex returns -1, dimension is above all breakpoints -> clamp to last position
  // Otherwise use the found breakpoint's position
  const widthPosition =
    widthIndex === -1
      ? sortedWidthBreakpoints[sortedWidthBreakpoints.length - 1].position
      : sortedWidthBreakpoints[widthIndex].position;

  // Find height position (same logic)
  const heightIndex = sortedHeightBreakpoints.findIndex(
    (bp) => height <= bp.value
  );

  const heightPosition =
    heightIndex === -1
      ? sortedHeightBreakpoints[sortedHeightBreakpoints.length - 1].position
      : sortedHeightBreakpoints[heightIndex].position;

  // Look up price cell for calculated position
  const cell = matrixData.cells.find(
    (c) => c.widthPosition === widthPosition && c.heightPosition === heightPosition
  );

  if (!cell) {
    throw new Error(
      `No price found for position (${widthPosition}, ${heightPosition})`
    );
  }

  return cell.price;
}
