![Register Flow Chart](RegisterFlowChart.drawio.png?raw=true "Register Author")

The register process begins with the request made from the author agent, 
in which the author provides the public key that the register node is going to
use to verify the manifests and the same key signed using his private key. 

Then the register agent tries to store the key in the blockchain via a chaincode that verifies the key using the sign, and checks that 
it is not already present in the net. If there are no problems, it generates a new key for the author to use in the update register process.
This new key is send back to the author agent, which
will store it in a keyStore/wallet.

If the key already exists in the blockchain, a message with that information if
sent back to the author.

This method makes sure that only the real author can use their public key to register. Once the key is registered,
the new key avoids that any other actor who knows the public key is able to upload updates.

Future Work: Change the process so that DIDs are used. See [DIDs](https://www.w3.org/TR/did-core/)