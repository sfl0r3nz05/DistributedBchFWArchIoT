const jwt = require('jsonwebtoken');
const fs = require('fs');

//this function creates the registerKey from the public Key.
//currently jwt is implemented
const createRegisterKey = (publicKey) => {
    const private_key = 'EXAMPLE';
    const registerKey = jwt.sign(publicKey.toString(),private_key,);
    return registerKey;
}

module.exports = createRegisterKey;