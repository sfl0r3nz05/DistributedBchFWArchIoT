const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

//this function creates the registerKey from the public Key.
//currently jwt is implemented
const createRegisterKey = (publicKey) => {
    const private_key = fs.readFileSync(path.resolve(__dirname,'private_key'));
    const registerKey = jwt.sign({publicKey : publicKey.toString()},
    private_key, {algorithm: 'RS384', expiresIn: '0.4h'}); //Token expires after 20min
    return registerKey;
}

module.exports = createRegisterKey;