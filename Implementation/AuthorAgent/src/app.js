const express = require("express");
const jest = require("jest");
const swaggerJsonDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const app = express();
const port = 3000;

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: "Author Agent",
			description: "This API serves as the author agent for https://github.com/sfl0r3nz05/DistributedBchFWArchIoT",
			servers: ['http://localhost:3000']
		},
		"components": {
			
		}
	},
	apis: ['index.js']
}

const swaggerDocs = swaggerJsonDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))


/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - /
 *     description: sends hello world!
 *     responses:
 *       200:
 *         description: YEAH BABY LIGHTWEIGHT!
 *       500:
 *         description: SERVER ERROR
 */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
