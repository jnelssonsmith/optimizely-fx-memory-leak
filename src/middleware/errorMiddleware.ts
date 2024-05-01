import { ErrorRequestHandler } from "express";

import { log } from "../logger";
import { getUriFromRequest } from "../utils";

const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  res.status(500).end();
  log.error({
    message: error.message,
    status: res.statusCode,
    uri: getUriFromRequest(req) || "-",
  });
};

export default errorMiddleware;
