const jwt = require('jsonwebtoken');

//this function creates the registerKey from the public Key.
//currently jwt is implemented
const verifyRegisterKey = (publicKey, registerKey) => {
    const public_key = 'EXAMPLE';
    const register_Key = jwt.verify(registerKey,public_key,);
    if (publicKey.valueOf() !== register_Key.valueOf()){
        throw new Error('ERR_KEY_NOT_VALID')
    }
    return true;
}

module.exports = verifyRegisterKey;