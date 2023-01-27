FROM node:18-alpine
WORKDIR /
COPY . .
RUN npm cache clear --force
RUN npm install
CMD ["npm","start"]
RUN npm test
EXPOSE 3000
