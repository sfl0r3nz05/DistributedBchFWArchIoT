const express = require("express");
const bodyParser = require('body-parser');
const jest = require("jest");
const options = require("./config/config.json");

const swaggerUI = require('swagger-ui-express');

const router = require('./routes/router')


const app = express();

const swaggerDocs = require('../author-agent.json');

app.use(bodyParser.json());
app.use('/', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, { explorer: true }));




app.listen(options.port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${options.port}!`);
});
