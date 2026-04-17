import fs from 'node:fs/promises';
import path from 'node:path';
import mammoth from 'mammoth';
import { PDFParse } from 'pdf-parse';
import { parseOffice } from 'officeparser';
import { AppError } from '../../lib/errors';

async function parseOfficeFile(filePath: string) {
  const ast = await parseOffice(filePath);
  return ast.toText();
}

export async function extractTextFromStoredFile(filePath: string, mimeType?: string | null) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === '.txt' || mimeType?.startsWith('text/')) {
    return fs.readFile(filePath, 'utf8');
  }

  if (extension === '.pdf' || mimeType === 'application/pdf') {
    const buffer = await fs.readFile(filePath);
    const parser = new PDFParse({ data: new Uint8Array(buffer) });
    const parsed = await parser.getText();
    await parser.destroy();
    return parsed.text;
  }

  if (extension === '.docx') {
    const parsed = await mammoth.extractRawText({ path: filePath });
    return parsed.value;
  }

  if (extension === '.pptx' || extension === '.doc' || extension === '.ppt') {
    return parseOfficeFile(filePath);
  }

  throw new AppError(400, 'UNSUPPORTED_EXTRACTION_TYPE', 'Text extraction is not supported for this file type');
}
