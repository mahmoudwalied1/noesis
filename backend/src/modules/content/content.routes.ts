import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import * as controller from './content.controller';
import {
  conceptSchema,
  idParamsSchema,
  listQuerySchema,
  prerequisiteSchema,
  subjectSchema,
  topicSchema,
  updateConceptSchema,
  updateSubjectSchema,
  updateTopicSchema
} from './content.schemas';
import { z } from 'zod';

export const contentRouter = Router();

const topicQuerySchema = z.object({ subjectId: z.string().optional() });
const conceptQuerySchema = z.object({ topicId: z.string().optional() });
const prerequisiteParamsSchema = z.object({ id: z.string().min(1), prerequisiteConceptId: z.string().min(1) });

contentRouter.use(authenticate);

contentRouter.get('/subjects', validate({ query: listQuerySchema }), controller.listSubjects);
contentRouter.get('/subjects/:id', validate({ params: idParamsSchema }), controller.getSubject);
contentRouter.post('/subjects', authorize('Admin'), validate({ body: subjectSchema }), controller.createSubject);
contentRouter.patch(
  '/subjects/:id',
  authorize('Admin'),
  validate({ params: idParamsSchema, body: updateSubjectSchema }),
  controller.updateSubject
);
contentRouter.delete(
  '/subjects/:id',
  authorize('Admin'),
  validate({ params: idParamsSchema }),
  controller.deleteSubject
);

contentRouter.get('/topics', validate({ query: topicQuerySchema }), controller.listTopics);
contentRouter.get('/topics/:id', validate({ params: idParamsSchema }), controller.getTopic);
contentRouter.post('/topics', authorize('Admin'), validate({ body: topicSchema }), controller.createTopic);
contentRouter.patch(
  '/topics/:id',
  authorize('Admin'),
  validate({ params: idParamsSchema, body: updateTopicSchema }),
  controller.updateTopic
);
contentRouter.delete('/topics/:id', authorize('Admin'), validate({ params: idParamsSchema }), controller.deleteTopic);

contentRouter.get('/concepts', validate({ query: conceptQuerySchema }), controller.listConcepts);
contentRouter.get('/concepts/:id', validate({ params: idParamsSchema }), controller.getConcept);
contentRouter.post('/concepts', authorize('Admin'), validate({ body: conceptSchema }), controller.createConcept);
contentRouter.patch(
  '/concepts/:id',
  authorize('Admin'),
  validate({ params: idParamsSchema, body: updateConceptSchema }),
  controller.updateConcept
);
contentRouter.delete(
  '/concepts/:id',
  authorize('Admin'),
  validate({ params: idParamsSchema }),
  controller.deleteConcept
);
contentRouter.post(
  '/concepts/:id/prerequisites',
  authorize('Admin'),
  validate({ params: idParamsSchema, body: prerequisiteSchema }),
  controller.addPrerequisite
);
contentRouter.delete(
  '/concepts/:id/prerequisites/:prerequisiteConceptId',
  authorize('Admin'),
  validate({ params: prerequisiteParamsSchema }),
  controller.removePrerequisite
);
