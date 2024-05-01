import { Request } from "express";

export const getUriFromRequest = (req: Request): string | undefined =>
  req.originalUrl || req.url;
