# Register Agent

![Register Author](AuthorAgentAuthorRegister.drawio.png?raw=true "Register author")

The register agent has a call to register an author into the blockchain through the register agent.

1- The call is received. It contains a RegisterPetition instance. See [RegisterPetiton](../../DataStructures/RegisterAuthorStructures).

2- The author agent sends a call to the register agent, containing the RegisterPetition.

3- The register agent sends the response.

4- If the response is successful, it contains the register key for the author. Using it and the author's public key, a KeyPair (see [KeyPair](../../DataStructures/RegisterAuthorStructures))
is created in the author agent's storage/KeyStore.

5- The response is sent by the author agent. It can be succesful (201) or can contain an error message(403, contains the error sent by register agent).

![Register Update](AuthorAgentUpdateRegister.drawio.png?raw=true "Register Update")

The register agent also has a call to register an update through the register agent.

1- The call is received. It contains an Update and the author's public key.

2- The author agent used the public key to obtain register key from KeyPair storage, and uses Update to create an instance of UpdateRegister.
See [RegisterPetiton](../../DataStructures/Update).

3- The author agent sends call to register agent, containing the UpdateRegister.

4- Register agent sends response.

5- The author agent sends response. If successful, sends a 201 code. If not succesful, sends a 403 code and a message containing the error code
given by register author.