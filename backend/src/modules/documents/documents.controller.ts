import type { RequestHandler } from 'express';
import * as documentsService from './documents.service';

function idParam(req: Parameters<RequestHandler>[0]) {
  return req.params.id as string;
}

function isAdmin(req: Parameters<RequestHandler>[0]) {
  return Boolean(req.user?.roles.some((role) => role.name === 'Admin'));
}

export const uploadDocument: RequestHandler = async (req, res, next) => {
  try {
    res.status(201).json(await documentsService.createFromUpload(req.user!.id, req.file, req.body));
  } catch (error) {
    next(error);
  }
};

export const createTextDocument: RequestHandler = async (req, res, next) => {
  try {
    res.status(201).json(await documentsService.createFromText(req.user!.id, req.body));
  } catch (error) {
    next(error);
  }
};

export const getDocument: RequestHandler = async (req, res, next) => {
  try {
    res.json(await documentsService.getDocument(req.user!.id, isAdmin(req), idParam(req)));
  } catch (error) {
    next(error);
  }
};

export const getIngestionStatus: RequestHandler = async (req, res, next) => {
  try {
    res.json(await documentsService.getIngestionStatus(req.user!.id, isAdmin(req), idParam(req)));
  } catch (error) {
    next(error);
  }
};
