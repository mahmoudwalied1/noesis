import { z } from 'zod';

export const documentIdParamsSchema = z.object({ id: z.string().min(1) });

export const documentMetadataSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  subjectId: z.string().min(1).optional(),
  topicId: z.string().min(1).optional(),
  conceptId: z.string().min(1).optional()
});

export const manualTextSchema = documentMetadataSchema.extend({
  title: z.string().min(1).max(200),
  text: z.string().min(1)
});
