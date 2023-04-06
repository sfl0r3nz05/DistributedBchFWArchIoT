const app = require("./app");
const options = require("./config/config.json");

//starts the main app.
app.listen(options.port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${options.port}!`);
  });
  //Start the application