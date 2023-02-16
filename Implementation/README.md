# Implementation
> **Note:** This repo is under development ⛏. Expect more features to be added and changes to be made.

This section contains the details about the implementation of the project.

The project has two main components:

- The blockchain application contains the smart contracts to be deployed on the blockchain network.

- The client application contains the agents that let users interact with the application.

## Blockchain Application

The technology used for implementing the blockchain network is Hyperledger Fabric. Hyperledger Fabric allows to create private permisioned networks
that do not require heavy consensus algorithms like PoW. 

In the current version of the project the test network is used. Check the instalation section down bellow for details.

The smart contracts in Hyperledger Fabric are called chaincodes. We implement them using the node.js version of Hyperledger Fabric SDK.

The chaincodes are implemented in [RegisterChaincode](./RegisterChaincode) and RetrievalChaincode (pending...).

## Client Application

The client applications is composed by three agents: [Author](./AuthorAgent), [Register](./RegisterAgent) and Retrieval. Each one of these agents is composed by a few Docker images that contain a 
node.js application and a data base. 

The node applications serve a RESTful API that let users (authors and devices) interact with the blockchain network application. For more details about the data flow
and structure of the project, see [Design](../Design).

The technologies and libraries used for the agents are the following:

- Node.js

- Express framework for route handling

- Jest library for unit testing

- Supertest library for testing API endpoints

- MongoDB for storage/databases

- Mongoose for connection to databases and data structure handling

- Swagger/OpenAPI for functional testing and documentation

- Docker for image contention

- Fabric SDK

- IPFS HTTP Client


## Instalation and prerequesites

- This repository needs a previous instalation of docker and docker compose. 
- Node and npm also need to be installed for development purposes. 
- The repository is currently tested against the hyperledger fabric test network, which has to be installed in case you have not any other network installed. 
- Finally you need access to an IPFS (private) network. A single Docker contained node is being used in development.

The contents of [FabricScripts](./fabricScripts/) can be placed in (your hyperledger installation path)/fabric-samples/test-network to help to reduce time when setting up the test network, installing and updating the chaincode.

To get the repository working in a local environment, please follow the instructions:

1. Initialize the test network and install [RegisterChaincode](./RegisterChaincode/). This can be done with 
    ```
    sudo sh <test-network-folder>/startHyperledger.sh <path to chaincode> <name for chaincode instalation ,ex: register>
    sudo sh <test-network-folder>/installCCOne.sh <name>
    sudo sh <test-network-folder>/installCCTwo.sh <ID given in terminal> <name>
    ```
    If you make any changes to the chaincode and want to test it, you can use
    ```
    sudo sh <test-network-folder>/updateOne.sh <path to chaincode> <name> <version> 
    sudo sh <test-network-folder>/updateTwo.sh <ID given in terminal> <name> <version> 
    ```
    It is important that version increases by one everytime you update the chaincode.
2. Copy the connection-org1.json file from test-network/organizations/peerOrganizations/org1.example.com into /RegisterAgent/src/config.
3. Delete contents of RegisterAgent/src/wallet
3. Update connection-org1.json to include the gateway address from your network instead of localhost.
4. Initialize your IPFS node. If you dont have one, you can test using the public Docker image. It will also add it to the test network. Copy the direction of the node to src/config/config.json.
    ```
    docker run -d --name ipfs_host --network fabric_test -e IPFS_PROFILE=server -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:latest
    ```
    Update /RegisterAgent/src/config/config.json to add the connection url, for example "http//localhost:5001".
5. Use the script build.sh to initialize the RegisterAgent. It will run the scripts to intialize the node app and register it to the blockchain network.
6. Use the build.sh script from AuthorAgent to initialize it.
7. Go to your browser and go to 127.0.0.1:3000 to get access to the Swagger documentation, which allows you to test the application.
