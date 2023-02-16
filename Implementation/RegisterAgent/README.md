# Register Agent
The register agent acts as an intermediary between the author agent (that handles direct author input) and the blockchain application. It is the publicly available service that enables users to comunicate with the blockchain and IPFS network and where all user clients should send their petitions. 

For more information about the data flow and case uses, see [Register Agent Design](../../Design/ClientApplication/RegisterAgent)

The agent serves a REST API accesible through the port 3001 (localhost). It is composed by a node.js application contained in an Docker image.

## Endpoints

The API serves the following [endpoints](./src/routes/router.js):

- /register/author(POST): This endpoints receives a RegisterPetition JSON object (see [RegisterPetition](../../Design/DataStructures/RegisterAuthorStructures)). It then calls a function that verifies that the input has the correct format. If incorrect, it returns a 405 code. If the input is correct, it makes a call to the Register chaincode, containing the data, and awaits for an answer. If succesful, the answer contains a register key that that authors will use for update registration. Then an answer it sent, containing a 201 code or a 403 code and the error message sent by the register chaincode.

- /register(POST): This endpoint receives an UpdateRegister JSON object (see [UpdateRegister](../../Design/DataStructures/Update)) JSON object. It calls a function that verifies that the input has the correct format. If the format is incorrect, it returns a 405 code. If the format is correct, it calls the register chaincode, and the response is sent back. If succesful, a code 201 is sent, while a code 403 is sent if the register agent sends back an error message.

- /api-docs: Also accesible with / and /about. It shows the documentation generated with Swagger, which also offer the posibility to use and test the API. To generate this documentation, the [OpenAPI document](./register-agent.json) is used.

## Instalation
Since the agent comunicates with [RegisterChaincode](../RegisterChaincode/), is it necesary to instal that agent first. You will also need to initialize your IPFS node.

Copy the connection file from your fabric network to src/config.

Update connection file t o include the gateway address from your network instead of localhost.
  
Copy the direction of the IPFS node to src/config/config.json.

The application is contained in a Docker image. To create this image, is posible to use docker build with the [Dockerfile](./Dockerfile). It is based on the Alpine docker image. 
To further faccilitate the process, a [script](./src/scripts/build.sh) can be used to remove previous containers, run docker compose and run tests. Using this script is recommedable as it connects the agent to the fabric test network.

## Testing

The application contains several test suites to test the endpoints of the application. As the full flow is executed, the register chaincode and ipfs network need to be up in order for tests to suceed.

The [tests](./src/__tests__/test-endpoints.js) include correct and incorrect inputs for both endpoints, and case where the input is correct but the public key is not yet registered.

You can easily run them by using npm test or the build.sh script.

