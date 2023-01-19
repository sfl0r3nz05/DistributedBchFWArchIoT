![Register Update Flow Chart](RegisterFlow.drawio.png?raw=true "Register Update")

The update process begins with the uploading of the update to the network.

1- The author request the registration of an update. To do that, they provide their key, which was
given by the blockchain application previous to the update process. The request also contains both
the author's signs, firmware image and it's manifest. Note that the manifest does not contain the URI for the image,
as it will be retrieved later with a Content IDentifier (CID) given by the distributed storege.

2- The Register agent recieves the update and stores it in the temporal storage. It sends the update to the register
chaincode.

3- The Register chaincode will fist verify the authors identity. If the given key does not correspond
to any registered author it will return an error message.

4- The Register chaincode will verify the manifest. It will check that it has all the mandatory fields (
see [Manifest Structure](../../DataStructures/Update/Manifest). It verifies the manifest using the public key 
linked to the register key the author provided and the author's sign to obtain the digest, it also obtains the digest
by digesting the manifest. If thedigest present in the manifest and the obtained ones are identical, the manifest is 
known not to have been modified since the author signed it.
If the manifest has an incorrect format, it will return an error. If the sign is not
correct, it will also return and error.
5- The Register chaincode will verify the image using the same proccess as in the manifest. If the digest does not 
match, it will return an error.

6- The Register chaincode stores the update in the blockchain.

7- The register Node stores the image in the IPFS net. The IPFS net returns a Content ID. This CID is sent to the 
register chaincode. If the node is unavailable to upload the image, it will send and error.

8- The Register chaincode updates the transaction with the CID. If this operation could not be done, the
node will send an error. If succesful, it will send a message back
to the author. When succesful, the update is deleted from temporal storage.
