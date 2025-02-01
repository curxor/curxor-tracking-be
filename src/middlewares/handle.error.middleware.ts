import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
export default function errorHandler(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);
  res
    .status(error.status || 500)
    .json({ message: error.message, status: error.status || 500 });
}
