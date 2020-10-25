FROM node

# set directory of our app and copy  over package.json and package-lock.json
RUN mkdir -p /app/client

WORKDIR /app/client

COPY package*.json /app/client/

RUN npm install

# Bundle app source
COPY . /app/client/

CMD ["npm","run","serve"]