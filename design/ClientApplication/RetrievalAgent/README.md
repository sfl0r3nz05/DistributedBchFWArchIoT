# Retrieval Agent

![Version Query](RetrievalAgentVersionQuery.drawio.png?raw=true "Version Query")

The VersionID of the last available update for a given device is retrieved from the blockchain.

1- Device sends a petition. It contains a DeviceID. See [DeviceID](../../DataStructures/DeviceID).

2- The retrieval agent sends a petition to the retrieval chaincode.

3- The retrieval chaincode sends a response. It contains the last available VersionID if successful.

4- The retrieval agent sends a message. If successful sends a 200 code with the VersionID. If not, sends a 403 code with the error message sent by 
the chaincode.

![Retrieve Update](RetrievalAgentUpdateRetrieval.drawio.png?raw=true "Update Retrieval")

The last available update for a given device is retrieve from the blockchain and IPFS net.

1- Device sends a petition. It contains a DeviceID. See [DeviceID](../../DataStructures/DeviceID).

2- The retrieval agent sends a petition to the retrieval chaincode.

3- The retrieval chaincode sends a response. It contains the last available UpdateInChain if successful. See [UpdateInChain](../../DataStructures/UpdateInChain).

4- If successful, the retrieval agent uses the CID to retrieve the image from IPFS net.

5- Using the UpdateInChain and the image, the retrieval agent creates an Update. See [Update](../../DataStructures/Update).

6- The retrieval agent sends a message containing a code 200 and the Update if successful. If not, sends a 403 code with the error message.