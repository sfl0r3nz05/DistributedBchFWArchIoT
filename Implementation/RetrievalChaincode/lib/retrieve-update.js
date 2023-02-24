'use strict';

const { Contract } = require('fabric-contract-api');

class RetrieveUpdate extends Contract {
    
    async queryUpdateByPublicKeyClassID (ctx, publicKey, classID){
        const startKey = 'update000000000';
        const endKey = 'update999999999';
        console.info("publickey: " + publicKey + " classID: " + classID)
        var result;
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.info(err);
                record = strValue;
            }
            console.info("record: " + JSON.stringify(record));
            if (record.authorPublicKey.toString().valueOf() == publicKey.toString().valueOf() && 
                record.manifest.classID.toString().valueOf() == classID.toString().valueOf() &&
                (!result || record.manifest.versionID.toString().valueOf() >  result.Record.manifest.versionID)){
                console.log(record)
                result = { Key: key, Record: record };
            }
        }
        console.info('done');
        if (!result){
            throw new Error ('ERR_UPDATE_NON_EXISTENT');
        }
        return result;
    } catch (err){
        console.info(err);
        return
    }
}

module.exports = RetrieveUpdate;