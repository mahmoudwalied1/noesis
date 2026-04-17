import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { uploadConfig } from '../../../config/upload';
import type { StoredFile } from '../documents.types';

export async function saveUploadedFile(file: Express.Multer.File): Promise<StoredFile> {
  await fs.mkdir(uploadConfig.uploadDir, { recursive: true });
  const ext = path.extname(file.originalname).toLowerCase();
  const filename = `${crypto.randomUUID()}${ext}`;
  const storagePath = path.join(uploadConfig.uploadDir, filename);

  await fs.writeFile(storagePath, file.buffer);

  return {
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    storagePath
  };
}
