const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');


//this function creates the registerKey from the public Key.
//currently jwt is implemented
const verifyRegisterKey = (publicKey, registerKey) => {
    try {
        const public_key = fs.readFileSync(path.resolve(__dirname,'public_key'));
        const content = jwt.verify(registerKey,public_key,{ algorithms: ['RS256'] });
        if (publicKey.valueOf() !== content.publicKey.valueOf()){
            throw new Error('ERR_KEY_NOT_VALID')
        }
        return true;
    } catch (err){
        console.info(err);
        return err;
    }
    
}

module.exports = verifyRegisterKey;