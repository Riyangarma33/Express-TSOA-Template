# Build Stage
FROM node:20-alpine as BUILD
WORKDIR /usr/api
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

# Clean Stage
FROM node:20-alpine as CLEAN
RUN apk add --no-cache rsync
WORKDIR /usr/api
COPY --from=BUILD /usr/api .
# Use rsync to remove unnecessary files while copying
RUN rsync -av \
  --exclude 'src' --exclude 'node_modules' \
  --exclude 'tsconfig.json' --exclude 'tsoaConfig.json' \
  --progress /usr/api/ /usr/clean_api

# Run Stage
FROM node:20-alpine as RUN
WORKDIR /usr/api
COPY --from=CLEAN /usr/clean_api .
RUN yarn install --production --frozen-lockfile
CMD [ "yarn", "start:prod" ]
