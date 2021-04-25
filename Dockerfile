ARG NODE_VERSION=14.15.4
ARG APP_DIR=/opt/diary-core

# Creates the builder image and fetch dependencies
FROM node:$NODE_VERSION as build

ARG APP_DIR
WORKDIR $APP_DIR
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

# Linter
FROM node:$NODE_VERSION as lint

ARG APP_DIR
WORKDIR $APP_DIR
COPY --from=build $APP_DIR/ .
CMD ["yarn", "run", "eslint", "."]

# Testing
FROM node:$NODE_VERSION as testing

ARG APP_DIR
WORKDIR $APP_DIR
COPY --from=build $APP_DIR/ .
CMD ["yarn", "test"]

# Release the app
FROM node:$NODE_VERSION as release

ARG APP_DIR
WORKDIR $APP_DIR
COPY --from=build $APP_DIR/ .
CMD ["yarn", "start"]
