![UpdatePetition](UpdatePetition.drawio.png?raw=true "UpdatePetition")

This structure is used when the register agent sends a petition to add the CID to an update. The authorKey is the one used in the register proccess
and not the author's public key. VersionID and ClassID come from the manifest and are used to let the chaincode identify the update.