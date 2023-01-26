const express = require("express");
const bodyParser = require('body-parser');
const jest = require("jest");

const swaggerUI = require('swagger-ui-express');

const router = require('./routes/router')


const app = express();
const port = 3000;

const swaggerDocs = require('../author-agent.json');

app.use(bodyParser.json());
app.use('/', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, { explorer: true }));




app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
