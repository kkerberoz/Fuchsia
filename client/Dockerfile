FROM node:14-slim

ENV PORT=8080


# set directory of our app and copy  over package.json and package-lock.json
RUN mkdir -p /app/client

WORKDIR /app/client

COPY package.json /app/client/

RUN npm install 

# Bundle app source
COPY . /app/client/

RUN npm run build

CMD [ "npm", "run", "start" ]



