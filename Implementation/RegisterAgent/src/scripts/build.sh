docker stop registeragent
docker rm registeragent
docker build -t registeragent .
docker run --net=bridge --name registeragent -it -d -p 3001:3001 registeragent 
docker logs registeragent