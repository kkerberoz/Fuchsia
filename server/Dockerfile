FROM node

RUN mkdir -p /app/server

WORKDIR /app/server

COPY package.json * /app/server/

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install;  \
    else npm install --only=production; \
    fi

# Bundle app source
COPY . /app/server/

CMD  ["npm", "run", "dev"]