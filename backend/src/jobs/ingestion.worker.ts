import { Worker } from 'bullmq';
import { IngestionStatus } from '@prisma/client';
import { redis } from '../lib/redis';
import { logger } from '../lib/logger';
import { prisma } from '../lib/prisma';
import { chunkText } from '../modules/documents/chunking.service';
import { extractTextFromStoredFile } from '../modules/documents/textExtraction.service';
import type { IngestionQueuePayload } from '../queues/ingestion.queue';

export const ingestionWorker = new Worker<IngestionQueuePayload>(
  'document-ingestion',
  async (job) => {
    const { documentId, ingestionJobId } = job.data;

    await prisma.ingestionJob.update({
      where: { id: ingestionJobId },
      data: { status: IngestionStatus.PROCESSING, progress: 10 }
    });

    const document = await prisma.document.findUnique({ where: { id: documentId } });
    if (!document) throw new Error(`Document not found: ${documentId}`);

    const text = document.manualText
      ? document.manualText
      : document.storagePath
        ? await extractTextFromStoredFile(document.storagePath, document.mimeType)
        : '';

    const chunks = chunkText(text);
    await prisma.documentChunk.createMany({
      data: chunks.map((chunk) => ({
        documentId,
        chunkIndex: chunk.chunkIndex,
        text: chunk.text,
        tokenCount: chunk.tokenCount
      })),
      skipDuplicates: true
    });

    await prisma.ingestionJob.update({
      where: { id: ingestionJobId },
      data: { status: IngestionStatus.COMPLETED, progress: 100 }
    });
  },
  { connection: redis }
);

ingestionWorker.on('failed', async (job, error) => {
  logger.error({ jobId: job?.id, error }, 'Document ingestion failed');
  const ingestionJobId = job?.data.ingestionJobId;
  if (ingestionJobId) {
    await prisma.ingestionJob.update({
      where: { id: ingestionJobId },
      data: { status: IngestionStatus.FAILED, error: error.message }
    });
  }
});
