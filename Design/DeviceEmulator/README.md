# Device Emulator

The device emulator is a piece software that will emulate devices asking for updates. In the current version of this project, it will not execute firmware
images. It will make resquests to the Retrieval Agent providing a DeviceID and will store the responses to perform a verification equal to that
which a real device would do. However, it will not boot the image once the verification is complete, as it lacks the capacity to do so.

Therefore, this is a component used to test the retrieval process. To check is dataStructure, see [DeviceEmulator](../DataStructures/DeviceEmulator).

It will count with two main methods:

## Version Query

This method (checkLastVersion()) checks the last available version in the network and evaluates if an update is required.
![Version Query](VersionQuery.drawio.png?raw=true "Version Query")

1- DeviceID is created from AuthorKey and ClassID.

2- Retrieval agent is called using the stored address. Device ID is sent.

3- Retrieval agent sends response. If successful, contains a VersionID.

4- VersionID is compared to the stored manifest's one. If superior, Update Retrieval Petition is called.


## Update Retrieval Petitition
This method (requestUpdate()) makes a petition to get the last update, verifies it and stores it. A real device would perform the update by rebooting
the obtained image.

![Update Retrieval Petition](UpdateRetrievalPetition.drawio.png?raw=true "Update Retrival Petition")

1- DeviceID is created from AuthorKey and ClassID.

2- Retrieval agent is called using the stored address. Device ID is sent.

3- Retrieval agent sends response. If successful, contains a VersionID.

4- The manifest is verified comparing the contents of the ManifestSign (using RSA), the digest generated for the manifest (after removing ManifestDigest field, using MD5)
and the content of ManifestDigest field. If identical, the manifest is verified not to have been modified. The AuthorKey is used in the process.

5- The payload is verified repeating the same process for AuthorSign and PayloadDigest field (this field is not removed from manifest). If identical, the payload is
verified not to have been modified.

6- The device emulator stores the manifest.


At this point, a real device would reboot the obtained image.