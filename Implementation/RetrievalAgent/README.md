# Retrieval Agent
The Retrieval Agent acts as intermediary between the end devices that are going to consume the firmware updates and the blockchain and IPFS networks. It listens for update petitions from devices and retrieves them.  

For more information about the data flow and case uses, see [Retrieval Agent Design](../../Design/ClientApplication/RetrievalAgent)

The agent serves a REST API accesible through the port 3002 (localhost). It is composed by a node.js application contained in an Docker image.

## Endpoints

The API serves the following [endpoints](./src/routes/router.js):

- /retrieve/version (POST): Receives a [DeviceID](../../Design/DataStructures/DeviceID). It calls the retrieval ChainCode to obtain the latest available update's versionID, which is returned.

- /retrieve (POST): Receives a [DeviceID](../../Design/DataStructures/DeviceID). It calls the retrieval ChainCode to obtain the latest available updateInChain. It uses the CID to get the Payload from IPFS, and then builds the update object, which is returned as a JSON.

- /api-docs: Also accesible with / and /about. It shows the documentation generated with Swagger, which also offer the posibility to use and test the API. To generate this documentation, the [OpenAPI document](./retrieval-agent.json) is used.

## Instalation
Since the agent comunicates with [RetrievalChaincode](../RetrievalChaincode/), is it necesary to instal that agent first. You will also need to initialize your IPFS node.

Copy the connection file from your fabric network to src/config.

Update connection file t o include the gateway address from your network instead of localhost.
  
Copy the direction of the IPFS node to src/config/config.json.

The application is contained in a Docker image. To create this image, is posible to use docker build with the [Dockerfile](./Dockerfile). It is based on the Alpine docker image. 
To further faccilitate the process, a [script](./src/scripts/build.sh) can be used to remove previous containers, run docker compose and run tests. Using this script is recommedable as it connects the agent to the fabric test network.

## Testing

The application contains several test suites to test the endpoints of the application. As the full flow is executed, the register chaincode and ipfs network need to be up in order for tests to suceed.

The [tests](./src/__tests__/test-endpoints.js) include correct and incorrect inputs for both endpoints, and case where the input is correct but the public key is not yet registered.

You can easily run them by using npm test or the build.sh script.

