FROM node:14-slim

# set directory of our app and copy  over package.json and package-lock.json
RUN mkdir -p /app/client

WORKDIR /app/client

COPY package.json /app/client/

RUN npm install @vue/cli -g

RUN npm install --only=production

# Bundle app source
COPY . .

RUN npm run build

CMD ["npm","run","serve"]