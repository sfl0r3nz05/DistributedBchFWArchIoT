# Design

For a description of the architecture, see [Project Architecture](./Architecture).

For a description of the information flow, see [Data Flow](./FlowDiagrams).

For a description of the data structures, see [Data Structures](./DataStructures).

For a description of the blockchain application, see [Blockchain Application](./BlockchainApplication).

For a description of the client application, see [Client Application](./ClientApplication).

## Error Messages

During the execution of the processes of the application, the following error may arise, each one identyfied with a code:

General Error Codes:

- ERR_IPFS_NOT_AVAILABLE: The IPFS network or it's services are not available.

- ERR_BC_NOT_AVAILABLE: The Blockchain network or it's services are not available.

- ERR_UPDATE_NOT_EXISTENT: A non existent update is tried to be retrieved or updated.

Register Process Error Codes:

- ERR_KEY_NOT_VERIFIABLE: An author's public key can not be verified during the author register process.

- ERR_KEY_NOT_REGISTRABLE: The provided author public key is already registered on the network.

- ERR_KEY_NOT_VALID: The register key provided is not registered on the network.

- ERR_MANIFEST_NOT_VERIFIABLE: The provided manifest can not be verified using the author's public key associated to the providen register key with the given ManifestDigest and ManifestSign.

- ERR_PAYLOAD_NOT_VERIFIABLE: The provided payload/image can not be verified using the author's public key associated to the providen register key with the given PayloadDigest and AuthorSign.
