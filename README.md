# Distributed blockchain-based firmware update architecture for IoT devices

The objective of this project is to design and implement a distributed firmware update architecture based on blockchain, for which we intend to use the foundations defined by the [SUIT working group](https://datatracker.ietf.org/wg/suit/about/) in the [RFC9019](https://www.rfc-editor.org/rfc/rfc9019.pdf), adapting them to a distributed environment based on Hyperledger Fabric Blockchain.

![General Net](GeneralNet.drawio.png?raw=true "General Net")

The solution proposes the adoption of a distributed network. The network nodes can be 
divided into 3 categories:
1- Register Nodes communicate with authors. They verify the firmware images and their
manifests, and store them.
2- General Nodes maintain the network, but are not able to store or retrive updates.
3- Retrieval Nodes retrive manifest and images and send them to the devices.

For a more in-depth view, see [Project Architecture](./Architecture).
For a description of the information flow, see [Data Flow](./FlowDiagrams).

> **Note:** This repo is under development ⛏.
> > It is maintained by [Jesús Rugarcía Sandía](https://github.com/jesusrugarcia), [Íñigo Juarros](https://github.com/inijuarros) and [Santiago Figueroa](https://github.com/sfl0r3nz05) as part of the project: *Distributed blockchain-based firmware update architecture for IoT devices*.

> **Note:** Check the meeting minutes ✏.
> > [Meeting minutes](./minutes)
