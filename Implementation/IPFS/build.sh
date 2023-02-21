docker stop ipfs_host
docker rm ipfs_host

docker stop ipfs0
docker rm ipfs0

docker stop cluster0
docker rm cluster0

docker stop ipfs1
docker rm ipfs1

docker stop cluster1
docker rm cluster1

docker stop ipfs2
docker rm ipfs2

docker stop cluster0
docker rm cluster0

docker-compose up -d
#docker run -d --name ipfs_host --network fabric_test -e IPFS_PROFILE=server -v $ipfs_staging:/export -v $ipfs_data:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/kubo:latest