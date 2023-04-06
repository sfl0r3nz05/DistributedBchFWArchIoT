# $1 ip address of bootstrap node
# $2 ID of the bootstrap node

docker exec -it ipfs0 ipfs bootstrap rm --all
docker exec -it ipfs0 ipfs bootstrap add /ip4/$1/tcp/4001/ipfs/$2
docker exec -it ipfs0 ipfs shutdown
#docker exec -it ipfs0 ipfs daemon


docker exec -it ipfs1 ipfs bootstrap rm --all
docker exec -it ipfs1 ipfs bootstrap add /ip4/$1/tcp/4001/ipfs/$2
docker exec -it ipfs1 ipfs shutdown
#docker exec -it ipfs1 ipfs daemon

docker exec -it ipfs2 ipfs bootstrap rm --all
docker exec -it ipfs2 ipfs bootstrap add /ip4/$1/tcp/4001/ipfs/$2
docker exec -it ipfs2 ipfs shutdown
#docker exec -it ipfs2 ipfs daemon

sh ./build.sh
