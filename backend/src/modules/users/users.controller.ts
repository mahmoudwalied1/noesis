import type { RequestHandler } from 'express';
import * as usersService from './users.service';

function idParam(req: Parameters<RequestHandler>[0]) {
  return req.params.id as string;
}

export const listUsers: RequestHandler = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query as unknown as { page: number; pageSize: number };
    res.json(await usersService.listUsers(page, pageSize));
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    res.json(await usersService.getUser(idParam(req)));
  } catch (error) {
    next(error);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    res.json(await usersService.updateUser(idParam(req), req.body));
  } catch (error) {
    next(error);
  }
};

export const updateUserRoles: RequestHandler = async (req, res, next) => {
  try {
    res.json(await usersService.updateUserRoles(idParam(req), req.body.roles));
  } catch (error) {
    next(error);
  }
};
