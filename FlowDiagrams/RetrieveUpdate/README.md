![Retrieval Flow](RetrieveUpdate.drawio.png?raw=true "Retrieval Flow")

1- The retrieval process begins when a device asks a Retrieval Node for the latest version
of the available firmware. In order to do this request, the device sends either it's identifier,
which is composed of it's author's public key and the devices ClassID.

2- The retrieval node verifies the key or the model to check if the device is selectable
for updates from the blockchain. If it is not, it will send an error. (ERR_DEVICE_NOT_SELECTABLE)
If the device is selectable, it sends the last available version number. If this operation
is not posible, it will send an error (ERR_BLOCKCHAIN_NOT_AVAILABLE).

3- If the device has an inferior version to the last available in the blockchain, it will
ask to recive the update. It sends it's identifier again.

4- The Retrieval Node verifies once again the key, as in 2, and will send an error if necesary.
If selectable, the node retrieves the manifest from the ledger. If this operation if not posible,
it will send an error.

5- Using the Content ID present in the manifest, the retrieval node retrieves the image
from IPFS net. It uses the sign in the manifest to verify the image. If the image is not
verifiable, it sends an error. (ERR_IMAGE_NOT_VERIFIABLE)

6- The Retrieval Node sends the image and the manifest to the device.

7- The device verifies both the manifest and the image before performing the update.

8- The device perfoms the update.