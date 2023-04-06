# IPFS PRIVATE NETWORK
This folder contains the necesary files for deploying a private IPFS network.

## Instalation
In order to use the content, you need to install Docker and Docker Compose. you also need to install the ipfs-cluster-ctl. Check credits for a more in depth view.

1. Run build.sh. If you are using a different network than that created by the Hyperledger Fabric test network, first modify the network in docker-compose.yaml.
2. Copy swarm.key into each one of the folders inside data. The data folder will be created
3. Run create-private-network.sh
4. Copy the address from one peer into the config file of Register and Retrieval Agents.
Example: 'http:172.12.0.18:5001'


## Credits
The contents of this folder were made following these articles:

1. [Deploy a private IPFS network on Ubuntu.](https://medium.com/@s_van_laar/deploy-a-private-ipfs-network-on-ubuntu-in-5-steps-5aad95f7261b)

2. [IPFS cluster with Docker](https://medium.com/rahasak/ipfs-cluster-with-docker-db2ec20a6cc1) 