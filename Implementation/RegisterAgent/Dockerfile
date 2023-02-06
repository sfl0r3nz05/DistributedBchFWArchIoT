FROM node:18-alpine
WORKDIR /app
COPY ./ .
RUN ls
RUN npm install
#RUN node ./src/services/enrollAdmin.js
#RUN node ./src/services/registerUser.js
RUN npm test
CMD ["npm","start"]
EXPOSE 3001

