# Register Chaincode
The register chaincode is a collection of smart contracts that can be used to register both authors and updates to the blockchain.

For a more detailed explanation of the data flow and structures, please see [RegisterChaincode Design](../../Design/BlockchainApplication/RegisterChaincodes/),

They are written using the NodeJS version of the Hyperledger Fabric SDK.

## Author Contract
The author contract contais the functions needed to register authors in the blockchain.

The most relevant function is createAuthor(message,signedMessage,publicKey). All the arguments should be given as strings. This function creates a [KeyPair](../../Design/DataStructures/RegisterAuthorStructures/) aaset.
The publicKey is verified using it to check that message and the content of signedMessage are equal. For the comparation to be verified the signedMessage needs to be signed using RSA with the author's privateKey.
As a result the registerKey for the author is returned. This key is generated using JWT.

This is the function called by the registerAgent.

## Update Contract
The update Contract contains the functions needed to register updates in the blockchain.

createUpdate(updateRegister,dat) is used to create [UpdateInChain](../../Design/DataStructures/UpdateInChain) assets. updateRegister should be passed as a stringified json object and dat as a string.
dat is the Unix time of the request made by the registerAgent and is used to create the primary key for the UpdateInChain asset.
[updateRegister](../../Design/DataStructures/Update/) is used to create the new asset after veriying the contents of the payload and manifest. The response is a message containing 'Success' or the throwed error.

updateCID(authorKey,versionID,classID,CID) is used to modify the stored UpdateInChain asset related to the author's publicKey and the manifests version and class IDs in order to add the CID given to the payload by IPFS. authorKey, versionID and classID should be passed as strings. CID should be passed as a stringified JSON object.