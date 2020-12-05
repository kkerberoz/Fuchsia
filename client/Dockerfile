# FROM node:14-slim

# ENV PORT=8080


# # set directory of our app and copy  over package.json and package-lock.json
# RUN mkdir -p /app/client

# WORKDIR /app/client

# COPY package.json /app/client/

# RUN npm install 

# # Bundle app source
# COPY . /app/client/

# RUN npm run build

# CMD [ "npm", "run", "start" ]

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


