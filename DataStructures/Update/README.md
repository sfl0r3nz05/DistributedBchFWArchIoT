![Update](Update.drawio.png?raw=true "Update Diagram")

The data structure for registering and retrieves updates varies slightly. In both cases, they contain a payload,
which is composed by the image of the update, be it ready to use or processed/encrypted, the author's sign and a manifest. To see the
details about the manifest's data structure, please see [Manifest](./Manifest).

The AuthorSign is composed by the PayloadDigest present in the manifest encrypted using the author's 
private key. They AuthorManifestSign is composed by the manifest digest encrypted with the author's private key. Using both
signs and the public key stored in the blockchain, the register agent can verify both the image and the manifest.

When registering updates the structure needs the AuthorKey, which is the key given to the author by the blockchain. It also
needs the authors sign. This authorKey is not necessary when retrieving, as the device must already have the author's key to
perform verification.

