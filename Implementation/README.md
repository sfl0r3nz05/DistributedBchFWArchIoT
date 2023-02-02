# Implementation

This section contains the details about the implementation of the project.

The project has two main components:

- The blockchain application contains the smart contracts to be deployed on the blockchain network.

- The client application contains the agents that let users interact with the application.

## Blockchain Application

The technology used for implementing the blockchain network is Hyperledger Fabric. Hyperledger Fabric allows to create private permisioned networks
that do not require heavy consensus algorithms like PoW. In the current version of the project the test network is used.

The smart contracts in Hyperledger Fabric are called chaincodes. We implement them using the node.js version of development tools.

## Client Application

The client applications is composed by three agents: [Author](./AuthorAgent), [Register](./RegisterAgent) and Retrieval. Each one of these agents is composed by a few Docker images that contain a 
node.js application and a data base. 

The node applications serve a RESTful API that let users (authors and devices) interact with the blockchain network application. For more details about the data flow
and structure of the project, see [Design](../Design).

The technologies used for the agents are the following:

- Node.js

- Express framework for route handling

- Jest library for unit testing

- Supertest library for testing API endpoints

- MongoDB for storage/databases

- Mongoose for connection to databases and data structure handling

- Swagger/OpenAPI for functional testing and documentation

- Docker for image contention