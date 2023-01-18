# Register Agent

![Register Author](RegisterAgentAuthorRegister.drawio.png?raw=true "Register author")

The register agent has a call used as an intermediary between the author agent and the blockchain application to register an author.

1- The call is received. Contais a RegisterPetition. See [RegisterPetiton](../../DataStructures/RegisterAuthorStructures).

2- The RegisterPetition is sent through a call to the register chaincode.

3- The register chaincode sends a response. It contains whether the author has been registered or not, and the register code.

4- If the response is succesful, a code 201 is send, with a message containing the register key sent by the chaincode.
If it is not succesful, a code 403 is send, with a message containing the error code sent by the chaincode.

![Register Update](RegisterAgentUpdateRegister.drawio.png?raw=true "Register Update")

This call acts as an intermediary between author agent and the blockchain to register an update, but also has the responsability of uploading the
image/payload to the IPFS net and asking for the transaction to be updated.

1- The call is received. Contais a RegisterPetition.

2- The RegisterPetition is sent through a call to the register chaincode. chaincode sends response, which contains a message that indicates if
the update has been registered or not.

3- If the response is successful, the register agent upload the image to IPFS network. Then it uses the CID to create an UpdatePetition. See [UpdatePetition](../../DataStructures/UpdatePetition).
This structure is used to indicate the blockchain which update to add the CID to. The chaincode is called once again.

4- The chaincode sends a response, containing whether the transaction has been updated or not.

5- The register agent sends a response. If successful, sends a 201 code. If not, sends a 403 code containing the error message sent by the chaincode.
