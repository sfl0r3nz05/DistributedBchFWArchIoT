const express = require("express");
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const router = require('./routes/router');
const swaggerDocs = require('../retrieval-agent.json');
const cors = require('cors')
//this is the main app for the agent.
const app = express();
app.use(cors({origin : true, allowedHeaders : 'Content-Type'}));
app.use(bodyParser.json());
app.use('/', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, { explorer: true }));

module.exports = app;
