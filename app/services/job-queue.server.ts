import { prisma } from "~/db.server";
import type { Prisma } from "@prisma/client";
import { processShopRedact, processCustomerRedact } from "./gdpr-deletion.server";

/**
 * Enqueue a new job for async processing
 */
export async function enqueueJob(
  type: string,
  payload: Record<string, unknown>
): Promise<string> {
  const job = await prisma.jobQueue.create({
    data: {
      type,
      payload: payload as Prisma.InputJsonValue,
      status: "pending",
    },
  });

  console.log(`[JobQueue] Job enqueued: ${job.id} (type: ${type})`);
  return job.id;
}

/**
 * Process the next available job atomically
 */
export async function processNextJob(): Promise<{
  processed: boolean;
  jobId?: string;
  type?: string;
  error?: string;
}> {
  // Atomically claim the next pending job
  const job = await prisma.$transaction(async (tx) => {
    // Find first pending job that's ready to process
    const pendingJob = await tx.jobQueue.findFirst({
      where: {
        status: "pending",
        scheduledAt: {
          lte: new Date(),
        },
      },
      orderBy: {
        scheduledAt: "asc",
      },
    });

    if (!pendingJob) {
      return null;
    }

    // Claim the job by updating status to processing
    const claimedJob = await tx.jobQueue.update({
      where: { id: pendingJob.id },
      data: {
        status: "processing",
        attempts: {
          increment: 1,
        },
      },
    });

    return claimedJob;
  });

  if (!job) {
    console.log("[JobQueue] No jobs available");
    return { processed: false };
  }

  console.log(`[JobQueue] Job claimed: ${job.id} (type: ${job.type}, attempt ${job.attempts})`);

  try {
    // Execute the job
    await executeJob(job.type, job.payload);

    // Mark as completed
    await prisma.jobQueue.update({
      where: { id: job.id },
      data: {
        status: "completed",
        processedAt: new Date(),
      },
    });

    console.log(`[JobQueue] Job completed: ${job.id}`);
    return { processed: true, jobId: job.id, type: job.type };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[JobQueue] Job failed: ${job.id} - ${errorMessage}`);

    // Check if we should retry
    if (job.attempts >= job.maxAttempts) {
      // Max attempts reached - mark as failed
      await prisma.jobQueue.update({
        where: { id: job.id },
        data: {
          status: "failed",
          error: errorMessage,
        },
      });

      console.log(`[JobQueue] Job permanently failed after ${job.attempts} attempts: ${job.id}`);
      return { processed: true, jobId: job.id, type: job.type, error: errorMessage };
    } else {
      // Schedule retry with exponential backoff (2s, 4s, 8s)
      const backoffSeconds = Math.pow(2, job.attempts);
      const scheduledAt = new Date(Date.now() + backoffSeconds * 1000);

      await prisma.jobQueue.update({
        where: { id: job.id },
        data: {
          status: "pending",
          scheduledAt,
          error: errorMessage,
        },
      });

      console.log(`[JobQueue] Job retry scheduled in ${backoffSeconds}s: ${job.id}`);
      return { processed: true, jobId: job.id, type: job.type, error: errorMessage };
    }
  }
}

/**
 * Execute a job by dispatching to the appropriate handler
 */
async function executeJob(type: string, payload: any): Promise<void> {
  switch (type) {
    case "shop_redact":
      await processShopRedact(payload);
      break;

    case "customer_redact":
      await processCustomerRedact(payload);
      break;

    default:
      throw new Error(`Unknown job type: ${type}`);
  }
}
