# Client Application

The client application acts as an intermediary between the blockchain and the final users. It is composed by different APIs.

The [Author Agent](./AuthorAgent) allows authors to send register petitions. Each instance must serve only one author, and must be private.

The [Register Agent](./RegisterAgent) receives petitions from author agents and sends them to the blockchain. One register agent instance may serve multiple
author agents, and can be publicly accesible.

The [Retrieval Agent](./RetrievalAgent) receives petitions from devices and distributes the updates of the network. One instance may serve
multiple devices, and can be publicly accesible.