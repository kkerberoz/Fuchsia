FROM node:14-slim

RUN mkdir -p /app/server

WORKDIR /app/server

COPY /sever/package.json /app/server/

RUN npm install --only=production

# Bundle app source
COPY . .

CMD  ["npm", "run", "start"]