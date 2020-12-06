#run on local stage
FROM node:14-slim as dev-stage
ENV PORT=8080
RUN mkdir -p /app/client
WORKDIR /app/client
COPY package.json /app/client/
RUN npm install 
COPY . /app/client/
RUN npm run build

# build stage
FROM node:14-slim as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


