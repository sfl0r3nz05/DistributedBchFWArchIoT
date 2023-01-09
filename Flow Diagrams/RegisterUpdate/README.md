![Register Update Flow Chart](RegisterFlow.drawio.png?raw=true "Register Update")

The update process begins with the uploading of the update to the network.

1- The author request the registration of an update. To do that, they provide their key, which was
given by the blockchain application previous to the update process. The request also contains both
the firmware image and it's manifest. Note that the manifest does not contain the URI for the image,
as it will be updated later with a Content IDentifier given by the distributed storege.

2- The Register Agent/Node will fist verify the authors identity. If the given key does not correspond
to any registered author it will return an error message. (ERR_AUTHOR_NOT_REGISTERED)

3- The Register Node will verify the manifest. To verify that it is correct, it will check that it
has all the mandatory fields (see [Manifest Structure](./manifest), and that is has been signed
by the author, using the public key linked to the register key the author provided. If the manifest
has an incorrect format, it will return an error. (ERR_INCORRECT_MANIFEST_FORMAT). If the sign is not
correct, it will also return and error. (ERR_MANIFEST_SIGN_NOT_VALID).

4- The Register Node will verify the image using the hash present in the manifest using the author's
public key, to check the integrity of it's contents. If the hash does not match, it will return an
error. (ERR_IMAGE_NOT_VALID)
