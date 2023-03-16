#rm ./src/wallet/admin.id
#rm ./src/wallet/RegisterAgentUser.id
node ./src/services/enrollAdmin.js
node ./src/services/registerUser.js
docker stop registeragent
docker rm registeragent
#docker build -t registeragent .
#docker run --network fabric_test --name registeragent -it -d -p 3001:3001 registeragent
#docker exec registeragent npm test
docker-compose up -d --build --remove-orphans 
docker-compose -p registeragent run registeragent npm run test