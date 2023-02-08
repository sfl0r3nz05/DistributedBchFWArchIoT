const http = require('http');
const options = require("../config/config.json");


function requestUpdateRegister(pdata) {
     return new Promise((resolve, reject) => {
        const serverOptions = {
            host: options.requestHost,
            path: options.registerUpdatePath,
            port: options.requestPort,
            method: 'POST',
            body: JSON.stringify(pdata),
            headers: {
                'Content-Type': 'application/json'
            }
          };
        const req = http.request(serverOptions, (res) => {
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    var rejection = {
                        stat : 500,
                        message : e
                    }
                    reject(rejection);
                }
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
                message : 'INTERNAL SERVER ERROR'
            }
          reject(rejection);
        });
        // send the request
       req.write(JSON.stringify(pdata));
       req.end();
    });
}



module.exports = requestUpdateRegister;