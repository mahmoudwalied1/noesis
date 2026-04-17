import { AppError } from '../../lib/errors';

const CHUNK_SIZE = 1200;
const CHUNK_OVERLAP = 150;

export function chunkText(text: string) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (!clean) throw new AppError(400, 'EMPTY_TEXT', 'Document text cannot be empty');

  const chunks: Array<{ chunkIndex: number; text: string; tokenCount: number }> = [];
  let start = 0;

  while (start < clean.length) {
    const end = Math.min(start + CHUNK_SIZE, clean.length);
    const chunk = clean.slice(start, end).trim();
    chunks.push({
      chunkIndex: chunks.length,
      text: chunk,
      tokenCount: Math.ceil(chunk.length / 4)
    });
    if (end === clean.length) break;
    start = Math.max(end - CHUNK_OVERLAP, start + 1);
  }

  return chunks;
}
