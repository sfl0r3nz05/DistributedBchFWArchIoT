FROM node:18-alpine
WORKDIR /app
COPY ./ .
RUN ls
RUN npm install
RUN npm test
CMD ["npm","start"]
EXPOSE 3001

