import { NextFunction, Request, Response } from "express";
export type typeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
