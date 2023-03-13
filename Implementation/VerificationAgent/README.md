# Verification Agent
The Verification agent lets low end devices perform verification if they are not connected to a gateway that can handle the process for them.

## Endpoints

The API serves the following [endpoints](./src/routes/router.js):

- /verify (POST): Receives a [DeviceID](../../Design/DataStructures/DeviceID) and an [Update](../../Design/DataStructures/Update). It verifies the manifest and the payload from the Update using the DeviceIDs public Key. If the verification is succesful, it returns true. Else, it returns an error.

- /api-docs: Also accesible with / and /about. It shows the documentation generated with Swagger, which also offer the posibility to use and test the API. To generate this documentation, the [OpenAPI document](./retrieval-agent.json) is used.

## Instalation
The application is contained in a Docker image. To create this image, is posible to use docker build with the [Dockerfile](./Dockerfile). It is based on the Alpine docker image. 
To further faccilitate the process, a [script](./src/scripts/build.sh) can be used to remove previous containers, run docker compose and run tests. Using this script is recommedable as it connects the agent to the fabric test network.


