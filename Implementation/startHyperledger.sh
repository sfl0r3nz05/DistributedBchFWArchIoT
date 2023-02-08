#$1 chaincode path
#$2 chaincode name

docker stop registeragent
./network.sh down
./network.sh up -ca
./network.sh createChannel
chmod -R a+rwx ./organizations/
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/
# Compress chaincode
peer lifecycle chaincode package $2.tar.gz --path $1 --lang node --label $2_1.0
echo 'COMPLETED CREATION OF'
echo $2