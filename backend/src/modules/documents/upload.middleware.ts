import path from 'node:path';
import multer from 'multer';
import { uploadConfig } from '../../config/upload';
import { AppError } from '../../lib/errors';

export const uploadMaterial = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: uploadConfig.maxBytes },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!uploadConfig.acceptedExtensions.includes(ext)) {
      cb(new AppError(400, 'INVALID_FILE_TYPE', 'Unsupported file type'));
      return;
    }
    cb(null, true);
  }
});
