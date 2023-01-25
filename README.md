# Distributed blockchain-based firmware update architecture for IoT devices

The objective of this project is to design and implement a distributed firmware update architecture based on blockchain, for which we intend to use the foundations defined by the [SUIT working group](https://datatracker.ietf.org/wg/suit/about/) in the [RFC9019](https://www.rfc-editor.org/rfc/rfc9019.pdf), adapting them to a distributed environment based on Hyperledger Fabric Blockchain.

![General Net](GeneralNet.drawio.png?raw=true "General Net")

The solution proposes the adoption of a distributed network. The network nodes can be 
divided into 3 categories:
1- Register Nodes communicate with authors. They verify the firmware images and their
manifests, and store them.
2- General Nodes maintain the network, but are not able to store or retrive updates.

3- Retrieval Nodes retrive manifest and images and send them to the devices.

For a more in-depth view of the design, see [Design](./Design)

## Security Objectives

The project aims to create a secure update environment where the following types of threads and risk are avoided or mittigated:

- Old image instalation: An attacker sends an older but valid update to a device,
which may contain a vulnerability exploitable by the attacker. The device identifies
the update as valid and instals it, allowing the attacker to make further exploits.

	To avoid it, the MonotonicSequenceNumber and VersionID fields are introduced to the 
manifest, allowing the devices to more accurately decide wether an update is more 
recent than the currently instaled one.

- Device not connected: An atacker sends an update which is more recent that the one
currently instaled on a device, but older than the last available one. Since the device
is not connected to any network in which it can obtain information about the last available
update, it determines that the update should be installed. This update may contain vulnerabilities
exploitable by the attacker, which may be already patched in more recent updates.

	To avoid it, the devices should only install updates they asked for themselves. The proposed
blockchain network will be the one to distribute the updates, and will always distribute the
las available one.

- Incorrect device class: An attacker sends a valid and recent update to a device, which is installed.
The update, however, is designed for a different class of device. Therefore the device may no longer 
work as intended or may stop working completly.

	To avoid it, both devices and manifest should include information about the class of the target device.
This class will be neccesary to ask the blockchain application for update retrivals. Devices will only
install updates targeted at their own device class.

- Incorrect payload class: The payload is processed incorrectly by the device, potentially making it
not work as intended or making it no longer functional.

	To avoid it, the manifest should contain information about the encryption of the payload and specific
update steps when neccesary, so that devices can process the payload as intended.

- Incorrect update directory: The update is installed to an incorrect directory, potentially making the
device not work as intended.

	To avoid it, the manifest should contain a field to specify the directory for the payload when neccesary.

- Malicious redirection: An attacker could modify the manifest to indicate a malicious direction for the 
payload, making the device download a malicious payload, or could attack the payload storage to substitute
it with a payload of their own making.

	To avoid it, the manifest will contain a field with the digest for itself, and the envelope will contain
a sign from the author, so that devices can verify that manifests have not been modified. The payload distribution
will be handled by the application, ensuring devices do not need to download from unkown storages. The manifest will
also contain a digest for the payload and a sign for it in the envelop, so that devices can verify the payloads.

- Payload / Manifest modifications: An attacker may modify the payload or manifest (or both) of an update to
introduce malicious elements. They could add aditional code to an image and modify the digest for it in the manifest,
giving it the appearance of a valid update.

	To avoid it, the manifest will contain the digests for both the payload and itself(must be removed for digesting) and
the envelop will contain signs for both the manifest and the payload. This way both the blockchain application and
the devices can verify that the updates have not been modifies since the author signed them. The devices will contain
the public key of their author, so the signs will be only verifiable if they are signed with the asocciated 
private key from the author.

- Author dissappearance: When a vendor gets out the market, all the updates for their devices often get taken down or become
otherwise unaccesible for devices that have not already obtained them.

	With the use of a distributed network, we ensure that the updates already made available continue being so, while at least
one vendor or copy of the ledger remains active withing the blockchain. Other authors may become able to provided updates for
the device classes previously updated by that author, via a final update which contains the public key of the new author or by
privately sharing the private key to the new author. This resposability inheritance may need to be more concretely
detailed.

- Denial of service: centralized architectures are more vulnerable to denial of service attacks. For a decentralizen network
to be denied of providing its services, all the endpoints need to be simultaneosly attacked. While not imposible, it
makes the attackers work more difficult. In the same way, a decentralized network may have an easier time attending multiple
honest petitions, since it can distribute the workload between different nodes.


## Future Work

This project focuses on a limitted ammount of threats. Further investigation is needed in the following areas:

- Protection of the HTTP comunications: Communication between devices is assumed to be secure in this project. In a real environment,
however, HTTP traffic can be intercepted and data may be stolen or modified. The verification step ensures that modified data won't make it
into the network and devices wont install it, but unsecure commnucations make attacker able to obtain updates for reverse engineering processes.
Should all traffic be intercepted and modified( like a man in the middle attack), in practical uses an attacker could deny services for a given
author, agent or device.

- Encryption of data: data flows without being encrypted, making it more accesible for malicious parties.

- Author identification: The method used for author autentication is rough. The use of distributed IDs or
similar methods is advisable.

- Device identification: The method for identifying devices allows malicious parties to obtain updates from the network.
A secure identification metodology is needed to allow access only for known devices, so that attackers with access to 
device can not obtain the updates (Or not as easily). Similarly, the current method only allows for authors to upload
updates for devices that already contain their public key. Should an author dissapear and another one subsitute it, device 
operator may have to manually add the key from the new author to their devices. The blockchain application could also
track the state of the devices to identify actively devices that are vulnerable or not yet updated, similar to the state server
proposed by thr RFC9019. It may be interesting to use the Physically Unclonable Function approach. 

- Delta updates: Delta updates may allow updates to become lighter and faster to distribute, but add significant complexity.

- Low end device verifications: Type I low end devices may need to rely on gateways to perform verification. Once the gateway
verifies an update, it must be send to the device. This last step is susceptible of being intercepted, feeding the device a 
malicious update. Therefore communications between gateways and device needs to be protected.

- Concrete methods for responsability inheritance: A clear protocol for retiring authors to legate their responsability
may need to be specified.

- device emulator should be updated to perform firmware emulation. A server for update verification may be useful for low end devices.

- IPFS content could be verified on-chain, it may be interesting to add a check.


> **Note:** This repo is under development ⛏.
> > It is maintained by [Jesús Rugarcía Sandia](https://github.com/jesusrugarcia), [Íñigo Juarros](https://github.com/inijuarros) and [Santiago Figueroa](https://github.com/sfl0r3nz05) as part of the project: *Distributed blockchain-based firmware update architecture for IoT devices*.

> **Note:** Check the meeting minutes ✏.
> > [Meeting minutes](./minutes)
