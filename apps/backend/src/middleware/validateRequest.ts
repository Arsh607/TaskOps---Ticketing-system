import type {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import type { ZodType } from "zod";

interface ValidationSchemas {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}

export function validateRequest(
  schemas: ValidationSchemas,
): RequestHandler {
  return (request: Request, response: Response, next: NextFunction): void => {
    const errors: Record<string, unknown> = {};

    if (schemas.body) {
      const result = schemas.body.safeParse(request.body);

      if (!result.success) {
        errors.body = result.error.flatten();
      } else {
        request.body = result.data;
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(request.params);

      if (!result.success) {
        errors.params = result.error.flatten();
      } else {
        request.params = result.data as Request["params"];
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(request.query);

      if (!result.success) {
        errors.query = result.error.flatten();
      }
    }

    if (Object.keys(errors).length > 0) {
      response.status(400).json({
        error: "Validation failed.",
        details: errors,
      });
      return;
    }

    next();
  };
}
