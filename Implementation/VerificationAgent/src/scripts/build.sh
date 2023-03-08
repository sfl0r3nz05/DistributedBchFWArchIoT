docker stop verificationagent
docker rm verificationagent
docker build -t verificationagent .
docker run --network fabric_test --name verificationagent -it -d -p 3003:3003 verificationagent