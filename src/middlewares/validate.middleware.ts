import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import catchError from "./catch-error.middleware";

const validate = (schema: AnySchema) =>
  catchError(async (req: Request, res: Response, next: NextFunction) => {
    await schema.validate(req.body, { abortEarly: false });
    next();
  });

export default validate;
