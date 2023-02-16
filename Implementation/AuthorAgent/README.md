# Author Agent
The author agent lets authors perform the registration tasks for the blockchain network. For more information about the data flow and case uses, see [Author Agent Design](../../Design/ClientApplication/AuthorAgent)

The agent serves a REST API accesible through the port 3000 (localhost). It is composed by a node.js application and a database, each contained on it's own image.

## Endpoints

The API serves the following [endpoints](./src/routes/router.js):

- /register/author(POST): This endpoints receives a RegisterPetition JSON object (see [RegisterPetition](../../Design/DataStructures/RegisterAuthorStructures)). It then calls a function that verifies that the input has the correct format. If incorrect, it returns a 405 code. If the input is correct, it makes a POST request to the register agent API containing the data and awaits for an answer. If succesful, the answer contains a register key that is used to create a [keyPair](../../Design/DataStructures/RegisterAuthorStructures) that is stored in the database. Then an answer it sent, containing a 201 code or a 403 code and the error message sent by the register agent.

- /register(POST): This endpoint receives an Update(see [Update](../../Design/DataStructures/Update)) JSON object and a public key. It calls a function that verifies that the input has the correct format. If the format is incorrect, it returns a 405 code. If the format is correct, it queries the database to obtain the registerKey associated with the given public key in the keyPair. It uses the register key to generate an UpdateRegister object. A POST request is sent to the register agent, and the response is sent back. If succesful, a code 201 is sent, while a code 403 is sent if the register agent sends back an error message.

- /api-docs: Also accesible with / and /about. It shows the documentation generated with Swagger, which also offer the posibility to use and test the API. To generate this documentation, the [OpenAPI document](./author-agent.json) is used.

## Instalation
Since the agent comunicates with [RegisterAgent](../RegisterAgent/), is it necesary to instal that agent first.

Copy the address of the running Register Agent into src/config/config.json to allow communication between agents.

The application is contained in a Docker image. To create this image, is posible to use docker build with the [Dockerfile](./Dockerfile). It is based on the Alpine docker image. The application also needs connection to a database, which is contained by the MongoDB image. To ease this process, the [Docker-Compose](./docker-compose.yml) file can be used to build and setup both images.
To further faccilitate the process, a [script](./src/scripts/build.sh) can be used to remove previous containers, run docker compose and run tests. Using this script is recommedable as the tests need both the agent and mongodb images to be up.

## Testing

The application contains several test suites to test the endpoints of the application. As the full flow is executed, the register agent and database need to be up in order for tests to succed.

The [tests](./src/__tests__/test-endpoints.js) include correct and incorrect inputs for both endpoints, and case where the input is correct but the public key is not yet registered.

You can easily run them by using npm test or the build.sh script.

