![Register Flow Chart](RegisterFlowChart.drawio.png?raw=true "Register Author")

The register process begins with the request made from the author agent, 
in which the author provides the public key that the register node is going to
use to verify the manifests. 

Then the register agent tries to store the key in the blockchain via a chaincode,
which will also generate the key that the author is going to need to register
future firmware updates. This new key is send back to the author agent, which
will store it in a keyStore/wallet.

If the key already exists in the blockchain, a message with that information if
sent back to the author.