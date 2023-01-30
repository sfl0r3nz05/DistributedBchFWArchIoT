FROM node:18-alpine
WORKDIR /app
COPY ./ .
RUN ls
RUN npm install
CMD ["npm","start"]
RUN npm test
EXPOSE 3000
