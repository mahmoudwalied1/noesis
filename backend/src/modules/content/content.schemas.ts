import { z } from 'zod';

export const idParamsSchema = z.object({ id: z.string().min(1) });

export const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(50)
});

export const subjectSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(120),
  description: z.string().max(1000).optional().nullable(),
  order: z.number().int().optional()
});

export const topicSchema = z.object({
  subjectId: z.string().min(1),
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(120),
  description: z.string().max(1000).optional().nullable(),
  order: z.number().int().optional()
});

export const conceptSchema = z.object({
  topicId: z.string().min(1),
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(120),
  description: z.string().max(2000).optional().nullable(),
  order: z.number().int().optional()
});

export const updateSubjectSchema = subjectSchema.partial();
export const updateTopicSchema = topicSchema.partial();
export const updateConceptSchema = conceptSchema.partial();

export const prerequisiteSchema = z.object({
  prerequisiteConceptId: z.string().min(1)
});
