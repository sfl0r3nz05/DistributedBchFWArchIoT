![Register Flow Chart](RegisterFlowChart.drawio.png?raw=true "Title")
The register process begins with the request made from the author agent, 
in which the author provides the public key that the register agent is going to
use to verify the manifests. This key will be verified by the author agent before 
being send so that unncesary traffic is avoided if the input does not correspond
to a valid hash.

Then the register agent tries to store the key in the blockchain via a chaincode,
which will also generate the key that the author is going to need to register
future firmware updates. This new key is send back to the author agent, which
will store it in a keyStore/wallet.

If the key already exists in the blockchain, a message with that information if
sent back to the author.