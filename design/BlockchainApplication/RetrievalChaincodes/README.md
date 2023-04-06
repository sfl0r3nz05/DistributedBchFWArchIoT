# Retrieval Chaincodes

## Version Query

This chaincode is used to obtain the VersionID from the last available update for a given device.

![Version Query](VersionQueryChaincode.drawio.png?raw=true "Version Query")

1- Chaincode is called. Call contains a DeviceID. See [DeviceID](../../DataStructures/DeviceID).

2- PublicKey and ClassID are used to obtain all the available UpdateInChains for the device. See [UpdateInChain](../../DataStructures/UpdateInChain).

3- VersionID and MonotonicSequenceNumber are used to determine the last available update.

4- Response is sent. If successful contains VersionID from last available update (200). If not, contains error code message (403).

## Update Retrieval

This chaincode is used to obtain the UpdateInChain from the last available update for a given device.

![Update Retrieval](UpdateRetrievalChaincode.drawio.png?raw=true "Update Retrieval")

1- Chaincode is called. Call contains a DeviceID. See [DeviceID](../../DataStructures/DeviceID).

2- PublicKey and ClassID are used to obtain all the available UpdateInChains for the device. See [UpdateInChain](../../DataStructures/UpdateInChain).

3- VersionID and MonotonicSequenceNumber are used to determine the last available update.

4- Response is sent. If successful contains the UpdateInChain from last available update (200). If not, contains error code message (403).


