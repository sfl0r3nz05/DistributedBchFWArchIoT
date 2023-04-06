docker stop deviceapp
docker rm deviceapp
docker build -t deviceapp .
docker run --network fabric_test --name deviceapp -it -d -p 3004:3004 deviceapp