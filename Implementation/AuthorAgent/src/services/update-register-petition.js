const http = require('http');
const options = require("../config/config.json");
const stringify = require('json-stringify-deterministic');

//Creates a POST petition to the register agent and returns the answer.
function requestUpdateRegister(pdata) {
     const serverOptions = {
        host: options.requestHost,
        path: options.registerUpdatePath,
        port: options.requestPort,
        method: 'POST',
        body: stringify(pdata),
        headers: {
            'Content-Type': 'application/json'
        }
      };
     return new Promise((resolve, reject) => {
        const req = http.request(serverOptions, (res) => {
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            res.on('end', function() {
                body = JSON.parse(Buffer.concat(body).toString());
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    var rejection = {
                        stat : res.statusCode,
                        message : body
                    }
                    return reject(rejection);
                }
                var resolution = {
                    stat : res.statusCode,
                    message : body
                }
                resolve(resolution);
            });
        });
        req.on('error', (e) => {
            var rejection = {
                stat : 500,
                message : 'INTERNAL SERVER ERROR ' + e
            }
          reject(rejection);
        });
        // send the request
       req.write(stringify(pdata));
       req.end();
    });
}

module.exports = requestUpdateRegister;