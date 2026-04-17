import type { RequestHandler } from 'express';
import * as authService from './auth.service';

export const register: RequestHandler = async (req, res, next) => {
  try {
    res.status(201).json(await authService.register(req.body));
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    res.json(await authService.login(req.body));
  } catch (error) {
    next(error);
  }
};

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    res.json(await authService.refresh(req.body.refreshToken));
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    await authService.logout(req.body.refreshToken);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const me: RequestHandler = async (req, res, next) => {
  try {
    res.json(await authService.me(req.user!.id));
  } catch (error) {
    next(error);
  }
};

export const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    res.json(await authService.updateProfile(req.user!.id, req.body));
  } catch (error) {
    next(error);
  }
};
