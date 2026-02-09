/**
 * Option Group Service
 *
 * Provides CRUD operations for option groups, choices, and product assignments.
 * Enforces store ownership validation and application-level caps.
 */

import { prisma } from "~/db.server";
import type { OptionGroupCreateInput, OptionGroupUpdateInput } from "~/validators/option-group.validators";

/**
 * Creates a new option group with choices atomically.
 *
 * @param storeId - Store ID for ownership
 * @param input - Validated option group creation data
 * @returns Created option group with choices included
 */
export async function createOptionGroup(
  storeId: string,
  input: OptionGroupCreateInput
) {
  const optionGroup = await prisma.optionGroup.create({
    data: {
      storeId,
      name: input.name,
      requirement: input.requirement,
      choices: {
        create: input.choices.map((choice) => ({
          label: choice.label,
          modifierType: choice.modifierType,
          modifierValue: choice.modifierValue,
          isDefault: choice.isDefault,
        })),
      },
    },
    include: {
      choices: {
        orderBy: { label: "asc" },
      },
    },
  });

  return optionGroup;
}

/**
 * Gets a single option group by ID with choices and product count.
 *
 * @param id - Option group ID
 * @param storeId - Store ID for ownership validation
 * @returns Option group with choices, or null if not found or unauthorized
 */
export async function getOptionGroup(id: string, storeId: string) {
  const optionGroup = await prisma.optionGroup.findUnique({
    where: { id },
    include: {
      choices: {
        orderBy: { label: "asc" },
      },
      _count: {
        select: { products: true },
      },
    },
  });

  // Not found or wrong store
  if (!optionGroup || optionGroup.storeId !== storeId) {
    return null;
  }

  return optionGroup;
}

/**
 * Lists all option groups for a store with counts.
 *
 * @param storeId - Store ID
 * @returns Array of option groups with choice and product counts
 */
export async function listOptionGroups(storeId: string) {
  const optionGroups = await prisma.optionGroup.findMany({
    where: { storeId },
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          choices: true,
          products: true,
        },
      },
    },
  });

  return optionGroups;
}

/**
 * Updates an option group.
 * Uses replace strategy for choices (delete all, create new).
 *
 * @param id - Option group ID
 * @param storeId - Store ID for ownership validation
 * @param input - Validated update data
 * @returns Updated option group with choices, or null if not found or unauthorized
 */
export async function updateOptionGroup(
  id: string,
  storeId: string,
  input: OptionGroupUpdateInput
) {
  // First verify ownership
  const existing = await prisma.optionGroup.findUnique({
    where: { id },
  });

  if (!existing || existing.storeId !== storeId) {
    return null;
  }

  // If choices provided, use transaction to delete and recreate atomically
  if (input.choices) {
    const updated = await prisma.$transaction(async (tx) => {
      // Delete all existing choices
      await tx.optionChoice.deleteMany({
        where: { optionGroupId: id },
      });

      // Update group and create new choices
      return tx.optionGroup.update({
        where: { id },
        data: {
          ...(input.name !== undefined && { name: input.name }),
          ...(input.requirement !== undefined && { requirement: input.requirement }),
          choices: {
            create: input.choices!.map((choice) => ({
              label: choice.label,
              modifierType: choice.modifierType,
              modifierValue: choice.modifierValue,
              isDefault: choice.isDefault,
            })),
          },
        },
        include: {
          choices: {
            orderBy: { label: "asc" },
          },
        },
      });
    });

    return updated;
  }

  // No choices update - simple update
  const updated = await prisma.optionGroup.update({
    where: { id },
    data: {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.requirement !== undefined && { requirement: input.requirement }),
    },
    include: {
      choices: {
        orderBy: { label: "asc" },
      },
    },
  });

  return updated;
}

/**
 * Deletes an option group.
 * Cascade rules handle choices and product assignments.
 *
 * @param id - Option group ID
 * @param storeId - Store ID for ownership validation
 * @returns Success indicator, or null if not found or unauthorized
 */
export async function deleteOptionGroup(id: string, storeId: string) {
  // Verify ownership first
  const existing = await prisma.optionGroup.findUnique({
    where: { id },
  });

  if (!existing || existing.storeId !== storeId) {
    return null;
  }

  await prisma.optionGroup.delete({
    where: { id },
  });

  return { deleted: true };
}

/**
 * Assigns an option group to a product.
 * Enforces cap of 5 groups per product.
 *
 * @param productId - Product ID (product_id from ProductMatrix)
 * @param optionGroupId - Option group ID
 * @param storeId - Store ID for authorization
 * @returns Assignment record, or throws if cap exceeded
 */
export async function assignOptionGroupToProduct(
  productId: string,
  optionGroupId: string,
  storeId: string
) {
  // Verify option group belongs to store
  const optionGroup = await prisma.optionGroup.findUnique({
    where: { id: optionGroupId },
  });

  if (!optionGroup || optionGroup.storeId !== storeId) {
    throw new Error("Option group not found or unauthorized");
  }

  // Verify product belongs to store (via ProductMatrix -> PriceMatrix -> Store)
  const product = await prisma.productMatrix.findUnique({
    where: { productId },
    include: {
      matrix: {
        select: { storeId: true },
      },
    },
  });

  if (!product || product.matrix.storeId !== storeId) {
    throw new Error("Product not found or unauthorized");
  }

  // Check existing assignment count - enforce cap of 5
  const existingCount = await prisma.productOptionGroup.count({
    where: { productId },
  });

  if (existingCount >= 5) {
    throw new Error("Maximum 5 option groups per product");
  }

  // Create assignment
  const assignment = await prisma.productOptionGroup.create({
    data: {
      productId,
      optionGroupId,
    },
  });

  return assignment;
}

/**
 * Unassigns an option group from a product.
 *
 * @param productId - Product ID
 * @param optionGroupId - Option group ID
 * @returns Success indicator, or null if not found
 */
export async function unassignOptionGroupFromProduct(
  productId: string,
  optionGroupId: string
) {
  const assignment = await prisma.productOptionGroup.findFirst({
    where: {
      productId,
      optionGroupId,
    },
  });

  if (!assignment) {
    return null;
  }

  await prisma.productOptionGroup.delete({
    where: { id: assignment.id },
  });

  return { removed: true };
}

/**
 * Gets all option groups assigned to a product with full choices.
 *
 * @param productId - Product ID
 * @param storeId - Store ID for authorization
 * @returns Array of option groups with choices, or null if product not found/unauthorized
 */
export async function getProductOptionGroups(
  productId: string,
  storeId: string
) {
  // Verify product belongs to store
  const product = await prisma.productMatrix.findUnique({
    where: { productId },
    include: {
      matrix: {
        select: { storeId: true },
      },
    },
  });

  if (!product || product.matrix.storeId !== storeId) {
    return null;
  }

  // Fetch all assigned option groups with choices
  const assignments = await prisma.productOptionGroup.findMany({
    where: { productId },
    include: {
      optionGroup: {
        include: {
          choices: {
            orderBy: { label: "asc" },
          },
        },
      },
    },
    orderBy: {
      optionGroup: { name: "asc" },
    },
  });

  // Return just the option groups (flatten the structure)
  return assignments.map((a) => a.optionGroup);
}

/**
 * Counts how many products are using an option group.
 * Used for "Used by N products" warning.
 *
 * @param optionGroupId - Option group ID
 * @returns Count of products using this group
 */
export async function countProductsUsingGroup(optionGroupId: string) {
  return prisma.productOptionGroup.count({
    where: { optionGroupId },
  });
}
