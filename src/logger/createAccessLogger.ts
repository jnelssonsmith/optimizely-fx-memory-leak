import { Request, Response, NextFunction } from "express";

import { AccessLog } from "./types";
import { log } from "./logger";
import { getUriFromRequest } from "../utils";

const format = (value: string | number | string[] | undefined) => {
  return Array.isArray(value) ? value.join(", ") : value ?? "-";
};

export const getAccessLog = (
  req: Request,
  res: Response,
  requestStartTime: Date
): AccessLog => {
  const requestEndTime = new Date();
  const requestTime = requestEndTime.getTime() - requestStartTime.getTime();

  return {
    logtype: "access",
    req_time: requestEndTime.toUTCString(),
    uri: format(getUriFromRequest(req)),
    method: format(req.method),
    version: `HTTP/${format(req.httpVersionMajor)}.${format(
      req.httpVersionMinor
    )}`,
    status: format(res.statusCode),
    response_time: requestTime,
  };
};

export const createAccessLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.once("close", () => {
    log.access(getAccessLog(req, res, new Date()));
  });
  next();
};
