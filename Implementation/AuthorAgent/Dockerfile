FROM node:18-alpine
WORKDIR /
COPY . .
RUN npm install
CMD ["npm","start"]
RUN npm test
EXPOSE 3000
