import { prisma } from "~/db.server";
import { GdprRequestType } from "@prisma/client";

/**
 * Process SHOP_REDACT webhook - delete all store data
 *
 * Deletes the store record, which cascades to:
 * - All price matrices and their breakpoints/cells/product assignments
 * - All option groups and their choices/product assignments
 * - All draft order records
 */
export async function processShopRedact(payload: { shop: string }): Promise<void> {
  await prisma.$transaction(async (tx) => {
    // Delete the store - this cascades to all related data
    await tx.store.deleteMany({
      where: { shop: payload.shop },
    });

    // Mark all SHOP_REDACT GDPR requests for this shop as processed
    await tx.gdprRequest.updateMany({
      where: {
        shop: payload.shop,
        type: GdprRequestType.SHOP_REDACT,
        processedAt: null,
      },
      data: {
        processedAt: new Date(),
      },
    });
  });

  console.log(`[GDPR] Shop redact completed for ${payload.shop}`);
}

/**
 * Process CUSTOMERS_REDACT webhook - acknowledge request
 *
 * This app does NOT store customer-specific PII. Draft orders are product-based
 * quotes, not tied to customer accounts. The draft order records store dimensions,
 * quantities, and calculated prices - but no customer names, emails, or addresses.
 *
 * If the app adds customer data in the future (e.g., storing customer emails,
 * linking draft orders to customer IDs, or storing any PII), add deletion logic here.
 */
export async function processCustomerRedact(payload: {
  shop: string;
  customer?: { id: string; email: string };
}): Promise<void> {
  // Mark all CUSTOMERS_REDACT GDPR requests for this shop as processed
  await prisma.gdprRequest.updateMany({
    where: {
      shop: payload.shop,
      type: GdprRequestType.CUSTOMERS_REDACT,
      processedAt: null,
    },
    data: {
      processedAt: new Date(),
    },
  });

  console.log(`[GDPR] Customer redact acknowledged for ${payload.shop} - no customer PII stored`);
}
