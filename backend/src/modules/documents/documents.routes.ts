import { Router } from 'express';
import { authenticate } from '../../middleware/authenticate';
import { validate } from '../../middleware/validate';
import * as controller from './documents.controller';
import { documentIdParamsSchema, documentMetadataSchema, manualTextSchema } from './documents.schemas';
import { uploadMaterial } from './upload.middleware';

export const documentsRouter = Router();

documentsRouter.use(authenticate);
documentsRouter.post(
  '/upload',
  uploadMaterial.single('file'),
  validate({ body: documentMetadataSchema }),
  controller.uploadDocument
);
documentsRouter.post('/text', validate({ body: manualTextSchema }), controller.createTextDocument);
documentsRouter.get('/:id', validate({ params: documentIdParamsSchema }), controller.getDocument);
documentsRouter.get(
  '/:id/ingestion-status',
  validate({ params: documentIdParamsSchema }),
  controller.getIngestionStatus
);
