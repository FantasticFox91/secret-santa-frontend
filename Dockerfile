FROM node:18.16.0

ENV APP_ROOT /web

WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN yarn install

RUN yarn build
CMD node .output/server/index.mjs

