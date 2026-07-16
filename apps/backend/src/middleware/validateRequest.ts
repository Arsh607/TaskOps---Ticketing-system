import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

interface RequestSchemas {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}

export function validateRequest(schemas: RequestSchemas) {
  return (request: Request, response: Response, next: NextFunction): void => {
    const bodyResult = schemas.body?.safeParse(request.body);
    const paramsResult = schemas.params?.safeParse(request.params);
    const queryResult = schemas.query?.safeParse(request.query);
    const failedResult = [bodyResult, paramsResult, queryResult].find(
      (result) => result?.success === false,
    );

    if (failedResult && !failedResult.success) {
      response.status(400).json({
        error: 'Request validation failed.',
        details: failedResult.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
      return;
    }

    if (bodyResult?.success) {
      request.body = bodyResult.data;
    }

    if (paramsResult?.success) {
      Object.assign(request.params, paramsResult.data);
    }

    next();
  };
}
