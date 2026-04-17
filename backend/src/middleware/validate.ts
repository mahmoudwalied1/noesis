import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

type ValidationSchema = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

export function validate(schema: ValidationSchema): RequestHandler {
  return (req, _res, next) => {
    if (schema.body) req.body = schema.body.parse(req.body);
    if (schema.params) req.params = schema.params.parse(req.params) as typeof req.params;
    if (schema.query) req.query = schema.query.parse(req.query) as typeof req.query;
    next();
  };
}
