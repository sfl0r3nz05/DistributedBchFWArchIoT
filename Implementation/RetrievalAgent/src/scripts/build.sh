#rm ./src/wallet/admin.id
#rm ./src/wallet/RegisterAgentUser.id
node ./src/services/enrollAdmin.js
node ./src/services/registerUser.js
docker stop retrievalagent
docker rm retrievalagent
docker build -t retrievalagent .
docker run --network fabric_test --name retrievalagent -it -d -p 3002:3002 retrievalagent
docker exec retrievalagent npm test
#docker-compose up -d --build --remove-orphans 
#docker-compose -p authoragent run authoragent npm run test