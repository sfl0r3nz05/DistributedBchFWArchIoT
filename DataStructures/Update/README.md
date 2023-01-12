![Update](Update.drawio.png?raw=true "Update Diagram")

The data structure for registering and retrieves updates varies slightly. In both cases, they contain a payload,
which is composed by the image of the update, be it ready to use or processed/encrypted, and a manifest. To see the
details about the manifest's data structure, please see [Manifest](./Manifest).

When registering updates the structure needs the AuthorKey, which is the key given to the author by the blockchain. It also
needs the authors sign. This sign is composed by the PayloadDigest present in the manifest encrypted using the author's 
private key. They AuthorManifestSign is composed by the manifest digest encrypted with the author's private key. Using both
signs and the public key stored in the blockchain, the register agent can verify both the image and the manifest.

When retrieving updates, the ChainKey field contains the public key the device can use to digest the manifest. The ChainSign
is composed by the digest of the manifest encrypted using the blockchain's private key. Using both, the device can verify the manifest
integrity. Using the AuthorSign, which the one presented when registering the update, and the author's public key stored in the device,
the device can verify the payload.