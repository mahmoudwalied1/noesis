import { IngestionStatus } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { AppError } from '../../lib/errors';
import { enqueueIngestion } from '../../queues/ingestion.queue';
import { saveUploadedFile } from './storage/localStorage.service';

type DocumentMetadata = {
  title?: string;
  subjectId?: string;
  topicId?: string;
  conceptId?: string;
};

async function createIngestionJob(documentId: string) {
  const ingestionJob = await prisma.ingestionJob.create({
    data: { documentId, status: IngestionStatus.PENDING }
  });
  const bullJob = await enqueueIngestion({ documentId, ingestionJobId: ingestionJob.id });
  return prisma.ingestionJob.update({
    where: { id: ingestionJob.id },
    data: { bullJobId: bullJob.id }
  });
}

export async function createFromUpload(
  userId: string,
  file: Express.Multer.File | undefined,
  metadata: DocumentMetadata
) {
  if (!file) throw new AppError(400, 'FILE_REQUIRED', 'A file is required');

  const storedFile = await saveUploadedFile(file);
  const document = await prisma.document.create({
    data: {
      ownerId: userId,
      title: metadata.title ?? storedFile.originalName,
      sourceType: 'upload',
      originalName: storedFile.originalName,
      mimeType: storedFile.mimeType,
      storagePath: storedFile.storagePath,
      subjectId: metadata.subjectId,
      topicId: metadata.topicId,
      conceptId: metadata.conceptId
    }
  });

  const ingestionJob = await createIngestionJob(document.id);
  return { document, ingestionJob };
}

export async function createFromText(userId: string, input: DocumentMetadata & { title: string; text: string }) {
  const document = await prisma.document.create({
    data: {
      ownerId: userId,
      title: input.title,
      sourceType: 'manual_text',
      manualText: input.text,
      subjectId: input.subjectId,
      topicId: input.topicId,
      conceptId: input.conceptId
    }
  });

  const ingestionJob = await createIngestionJob(document.id);
  return { document, ingestionJob };
}

export async function getDocument(userId: string, isAdmin: boolean, id: string) {
  const document = await prisma.document.findUnique({
    where: { id },
    include: { ingestionJobs: { orderBy: { createdAt: 'desc' }, take: 1 }, chunks: { orderBy: { chunkIndex: 'asc' } } }
  });

  if (!document) throw new AppError(404, 'DOCUMENT_NOT_FOUND', 'Document not found');
  if (!isAdmin && document.ownerId !== userId) throw new AppError(403, 'FORBIDDEN', 'Cannot access this document');

  return document;
}

export async function getIngestionStatus(userId: string, isAdmin: boolean, id: string) {
  const document = await getDocument(userId, isAdmin, id);
  return {
    documentId: document.id,
    ingestionJob: document.ingestionJobs[0] ?? null
  };
}
