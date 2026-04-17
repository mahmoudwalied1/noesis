import { Queue } from 'bullmq';
import { redis } from '../lib/redis';

export type IngestionQueuePayload = {
  ingestionJobId: string;
  documentId: string;
};

export const ingestionQueue = new Queue<IngestionQueuePayload>('document-ingestion', {
  connection: redis
});

export async function enqueueIngestion(payload: IngestionQueuePayload) {
  return ingestionQueue.add('ingest-document', payload, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: 100,
    removeOnFail: 100
  });
}
