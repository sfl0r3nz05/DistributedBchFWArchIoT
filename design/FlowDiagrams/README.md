![Update Flow](FlowDiagramGeneral.drawio.png?raw=true "Update Flow")

The update process begins when an author request to register an update. The author sends
their key, which was previously given to them by the register agent (see [Register Author](./RegisterAuthor)).
The author also sends the manifest, image and signs for the update.

Then the register node verifies that the author is registered, and both manifest and image. It then 
stores the image in IPFS net, and stores the CID generated. (see [Register Update](./RegisterUpdate))

Devices periodacally search for updates. They ask the retrieval node for the last available update
given their model or public key. The retrieval node sends this information back. If the device
has a lower version, it asks for the update. Retrieval node then retrieves the image and sends image
and manifest to the device. (see [Retrieve Update](./RetrieveUpdate))