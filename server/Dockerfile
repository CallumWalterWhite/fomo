FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm install --force 
COPY . /usr/src/app

EXPOSE 6001

CMD [ "npm", "start"]