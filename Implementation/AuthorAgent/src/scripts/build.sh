docker stop authoragent
docker rm authoragent
docker build -t authoragent .
docker run --net=bridge --name authoragent -it -d -p 3000:3000 authoragent 
docker logs authoragent