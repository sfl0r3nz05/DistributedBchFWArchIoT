//Constains the app configuration
const express = require("express");
const bodyParser = require('body-parser');

const swaggerUI = require('swagger-ui-express');

const router = require('./routes/router')


const app = express();


const swaggerDocs = require('../author-agent.json');

app.use(bodyParser.json());
app.use('/', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, { explorer: true }));


module.exports = app;
