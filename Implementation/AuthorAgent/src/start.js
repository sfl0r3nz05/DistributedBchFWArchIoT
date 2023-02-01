const app = require("./app");
const options = require("./config/config.json");



app.listen(options.port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${options.port}!`);
  });