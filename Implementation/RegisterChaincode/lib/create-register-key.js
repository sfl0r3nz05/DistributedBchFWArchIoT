const crypto = require('crypto');

//this function creates the registerKey from the public Key.
//currently this is a very very simple example, production may need a stronger way of generating them.
const createRegisterKey = (publicKey) => {
    const registerKey = crypto.createHash('sha256').update(publicKey).digest('hex');
    return registerKey;
}

module.exports = createRegisterKey;