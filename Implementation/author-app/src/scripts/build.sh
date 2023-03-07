docker stop authorapp
docker rm authorapp
docker build -t authorapp .
docker run --network fabric_test --name authorapp -it -d -p 2999:2999 authorapp