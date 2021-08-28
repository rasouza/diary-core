ARG NODE_VERSION=16
ARG APP_DIR=/app

FROM node:$NODE_VERSION

ARG APP_DIR
WORKDIR $APP_DIR

COPY dist/ ./dist/
COPY node_modules/ ./node_modules/
COPY package.json .

CMD ["yarn", "start:prod"]
