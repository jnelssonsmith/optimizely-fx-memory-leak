import express from "express";

import { createAccessLogger } from "./logger";
import {
  renderMiddleware,
  errorMiddleware,
  notFoundMiddleware,
} from "./middleware";

const startApp = () => {
  const app = express();
  const port = 3000;

  app.use(createAccessLogger);

  app.get("/diagnostic/status/heartbeat", (_, res) =>
    res.status(200).send("OK")
  );

  app.get("/", renderMiddleware);

  app.use(notFoundMiddleware);

  app.use(errorMiddleware);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

startApp();
