# Author App

This app is a simple React application intended to simplify the interaction with the Author Agent API.

It allows to select keys from local files, and petitions the author agent to sign manifest and payloads.

(Sometimes buttons need to be clicked twice for manifests to be created correctly due to unhandled async)

## Use
Use the build.sh script from ./src/scripts to build the docker container for the app and connect it to the test_network. Then access it from your web browser at http://127.0.0.1:2999