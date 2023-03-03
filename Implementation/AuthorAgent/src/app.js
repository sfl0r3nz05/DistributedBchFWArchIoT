//Constains the app configuration
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const router = require('./routes/router')
const swaggerDocs = require('../author-agent.json');


const app = express();
app.use(cors({origin : true, allowedHeaders : 'Content-Type'}));
//app.options('*',cors())
//app.use(bodyParser.json());
app.use('/', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, { explorer: true }));
module.exports = app;
