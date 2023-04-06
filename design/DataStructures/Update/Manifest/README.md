![Manifest](Manifest.drawio.png?raw=true "Manifest")

This manifest format is heavily inspired by (and compliant to) that proposed by the RFC 9124.

-VersionID: Indicates the version of the manifest. Devices should only install updates with a superior VersionID.

-MonotonicSequenceNumber: An increasing number sequence used to verify that the manifest has been created in a time posterior
of that of previous updates. We will use am UTC timestamp.

-VendorID: Optional. ID of the vendor of the device. Used to differentiate devices with identical names but different vendors.
It is recommended that if uses UUID format along with ClassID.

-ClassID: Used to identify the class of devices that the update applies to. It is recommended that is uses UUID format along with VendorID.

-PayloadFormat: Describes the format of the payload.

-PayloadProccessing: Optional. Describes the steps and/or algorithms neccesary to decrypt the payload.

-StorageLocation: Describes where the payload should be stored inside a given component or device.

-PayloadIndicator: Optional. Describes where the payload can be obtained from. Note that in the arquitecture proposed by this project
the payload must be uploaded to the register agent alongside the manifest, making it only an option if it is available on aditional storages.

-PayloadDigest: Digest of the payload used to verify it's intregrity when coupled with the autor's key.

-ManifestDigest: Digest of the manifest used to verify that it's contents have not been modified. This field is added by us and is not present in the RFC 9124
format proposition.

-Size: Size in bytes of the payload.

-AditionalInstructions: Optional. Describes aditional steps to install the update.

-Dependecies: Lists all the other manifest required in order to install the update.

-EncryptionWrapper: Describes the steps needed to obtain the key needed to decrypt the payload.

-Payload: Optional. Used when the payload is small enough to be shared within the manifest, like keys or configuration data.

The envelope of the manifest MUST contain the authors sign, which will be comprise of the PayloadDigest encrypted with their
private key. Using the autors public key, a verifying agent should be able to obtain the payload digest both by decrypting the sign
and by digesting the payload. Both digests should be identical.
Aditionally, we add the need for a sign wich contains the digest of the manifest before the ManifestDigest field was added. The field must be removed when digesting
the manifest for verification.