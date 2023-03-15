# Device App
This is a simple react aplication that allows users to mimic a device for the retrieval process. Given a public key (from a local storage file) and a classID, the app can petition the retrieval agent and get the latest available update.

It can also perform verifications thorugh the verification agent. If you want to test an invalid verification case, you can modify the manifest after retrieving it.

## Use
Use the build.sh script from ./src/scripts to build the docker container for the app and connect it to the test_network. Then access it from your web browser at http://127.0.0.1:3004