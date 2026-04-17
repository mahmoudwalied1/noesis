import path from 'node:path';
import { env } from './env';

export const uploadConfig = {
  uploadDir: path.resolve(process.cwd(), env.UPLOAD_DIR),
  maxBytes: env.MAX_UPLOAD_MB * 1024 * 1024,
  acceptedExtensions: ['.pdf', '.txt', '.doc', '.docx', '.ppt', '.pptx', '.png', '.jpg', '.jpeg', '.webp']
};
