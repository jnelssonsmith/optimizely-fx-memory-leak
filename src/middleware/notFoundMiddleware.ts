import { Request, Response } from "express";

import { log } from "../logger";
import { getUriFromRequest } from "../utils";

const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).end();
  log.info({
    message: "Not found",
    status: res.statusCode,
    uri: getUriFromRequest(req) || "-",
  });
};

export default notFoundMiddleware;
