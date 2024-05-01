FROM node:20.12.2-bookworm

ENV APP_DIR /apps/optimizely-fx-memory-leak

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY package.json package-lock.json $APP_DIR/
RUN npm ci

RUN chown node:node $APP_DIR
COPY --chown=node:node . . 

USER node

RUN npm run build

CMD /usr/local/bin/node --max-http-header-size 16384 --inspect=0.0.0.0 "${APP_DIR}/dist/server.js"

EXPOSE 3000
EXPOSE 9229