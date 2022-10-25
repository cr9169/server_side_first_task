FROM node:lts-alpine
WORKDIR /backend
COPY "package*.json" ./
RUN npm install
COPY . /backend
CMD ["npm", "start"]
