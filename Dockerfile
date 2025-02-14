
# build stage

FROM node:18-alpine3.21 AS build-stage

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM node:18-alpine3.21 AS production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install --production
ENV NODE_ENV=production
EXPOSE 3030

CMD ["node", "/app/main.js"]
