import type { RequestHandler } from 'express';
import * as contentService from './content.service';

function idParam(req: Parameters<RequestHandler>[0]) {
  return req.params.id as string;
}

function prerequisiteConceptIdParam(req: Parameters<RequestHandler>[0]) {
  return req.params.prerequisiteConceptId as string;
}

export const listSubjects: RequestHandler = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query as unknown as { page: number; pageSize: number };
    res.json(await contentService.listSubjects(page, pageSize));
  } catch (error) {
    next(error);
  }
};

export const getSubject: RequestHandler = async (req, res, next) => {
  try {
    res.json(await contentService.getSubject(idParam(req)));
  } catch (error) {
    next(error);
  }
};

export const createSubject: RequestHandler = async (req, res, next) => {
  try {
    res.status(201).json(await contentService.createSubject(req.body));
  } catch (error) {
    next(error);
  }
};

export const updateSubject: RequestHandler = async (req, res, next) => {
  try {
    res.json(await contentService.updateSubject(idParam(req), req.body));
  } catch (error) {
    next(error);
  }
};

export const deleteSubject: RequestHandler = async (req, res, next) => {
  try {
    await contentService.deleteSubject(idParam(req));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const listTopics: RequestHandler = async (req, res, next) => {
  try {
    res.json(await contentService.listTopics(req.query.subjectId as string | undefined));
  } catch (error) {
    next(error);
  }
};

export const getTopic: RequestHandler = async (req, res, next) => {
  try {
    res.json(await contentService.getTopic(idParam(req)));
  } catch (error) {
    next(error);
  }
};

export const createTopic: RequestHandler = async (req, res, next) => {
  try {
    res.status(201).json(await contentService.createTopic(req.body));
  } catch (error) {
    next(error);
  }
};

export const updateTopic: RequestHandler = async (req, res, next) => {
  try {
    res.json(await contentService.updateTopic(idParam(req), req.body));
  } catch (error) {
    next(error);
  }
};

export const deleteTopic: RequestHandler = async (req, res, next) => {
  try {
    await contentService.deleteTopic(idParam(req));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const listConcepts: RequestHandler = async (req, res, next) => {
  try {
    res.json(await contentService.listConcepts(req.query.topicId as string | undefined));
  } catch (error) {
    next(error);
  }
};

export const getConcept: RequestHandler = async (req, res, next) => {
  try {
    res.json(await contentService.getConcept(idParam(req)));
  } catch (error) {
    next(error);
  }
};

export const createConcept: RequestHandler = async (req, res, next) => {
  try {
    res.status(201).json(await contentService.createConcept(req.body));
  } catch (error) {
    next(error);
  }
};

export const updateConcept: RequestHandler = async (req, res, next) => {
  try {
    res.json(await contentService.updateConcept(idParam(req), req.body));
  } catch (error) {
    next(error);
  }
};

export const deleteConcept: RequestHandler = async (req, res, next) => {
  try {
    await contentService.deleteConcept(idParam(req));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const addPrerequisite: RequestHandler = async (req, res, next) => {
  try {
    res.status(201).json(await contentService.addPrerequisite(idParam(req), req.body.prerequisiteConceptId));
  } catch (error) {
    next(error);
  }
};

export const removePrerequisite: RequestHandler = async (req, res, next) => {
  try {
    await contentService.removePrerequisite(idParam(req), prerequisiteConceptIdParam(req));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
