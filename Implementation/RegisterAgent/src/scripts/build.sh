docker stop registeragent
docker rm registeragent
docker build -t registeragent .
docker run --network fabric_test --name registeragent -it -d -p 3001:3001 registeragent
docker exec registeragent node ./src/services/enrollAdmin.js
docker exec registeragent node ./src/services/registerUser.js
docker exec registeragent npm test
#docker-compose up -d --build --remove-orphans 
#docker-compose -p authoragent run authoragent npm run test