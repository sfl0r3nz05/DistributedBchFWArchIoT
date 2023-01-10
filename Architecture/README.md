# Architecture

Hyperledger Fabric is used as the blockchain technology supporting the implementation. The network is a private/consortium network.
The network is also permissioned. There are 3 types of nodes, with different permissions:

1- Register nodes handle the uploading of the firmware manifests.

2- General nodes maintain the network and hold a copy of the ledger. Endorser nodes and Orderer Services are contained in this category. 

3- Retrieval nodes handle the retrieval of manifests.

InterPlanetary File System is used for permanent storage of images. Images are chosen to be stored off-chain due to the increasing time of transactions
as the network grows and more updates are stored. A private network is used, disconnected to the public IPFS network/swarm.

![Architecture](Architecture.drawio.png?raw=true "Architecture")

1- The Author Agent is an API that allows the author to upload the updates to the network. It is connected to a key storage which stores the
authors public key and the key given by the application used to verify the authors identity in the update registration proccess.

2- The Register Agent is part of the blockchain's client application. It is connected to a database that will store the images and manifests
recieved from the author until the registration process is completed. This agent verifies the manifest and the image of an update. It also stores
the image in IPFS network and updates the manifest.

3- The Register chaincode is part of the blockchain application. It recieves the update manifest from the register agent and request a transaction
on the blockchain to store. It is run by a Register Node.

4- The Retrieval Agent is part of the client application. It recieves request from the device and retrieves information from the blockchain through
the retrieval chain code and from IPFS. It is connected to a database that temporarily stores the retrieved updates until sent to the requesting
devices.

5- The Retrieval chaincode is part of the application. It requests information and manifests from the ledger when asked by the retrieval agent.
It is run by a Retrieval node.