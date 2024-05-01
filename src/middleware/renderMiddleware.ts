import { RequestHandler } from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";

import { getDatafileWithCache } from "../utils/fetchDatafile";
import { App } from "../components/App";
import { getOptimizelyClientWithCache } from "../createOptimizelyClient";

const htmlTemplate = (content: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Optimizely Demo Experiment App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">${content}</div>
  </body>
</html>
`;

const renderMiddleware: RequestHandler = async (_req, res) => {
  const userId = Math.floor(Math.random() * (10000 - 1000) + 1000).toString();
  const dataFile = await getDatafileWithCache();
  const optimizelyClient = getOptimizelyClientWithCache(dataFile);

  if (!optimizelyClient) {
    throw new Error("Optimizely client is not initialized");
  }

  const app = React.createElement(App, { optimizelyClient, userId });
  const content = ReactDOMServer.renderToStaticMarkup(app);
  const html = htmlTemplate(content);

  res.set({
    "Content-Type": "text/html",
  });
  res.send(html);
};

export default renderMiddleware;
