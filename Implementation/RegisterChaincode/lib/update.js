'use strict';
//All of this may need refactoring. Is it possible to get ctx calls in services?

const verifyUpdate = require('./services/verify-update');
// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
//const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class RegisterUpdate extends Contract {
    async initLedgerUpdate(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const updates = [
            {
                authorPublicKey : 'Example Public Key',
                CID : 'string',
                authorSign : 'Example Author Sign',
                authorManifestSign : 'Example author manifest sign'
            },
            {
                authorPublicKey : '-----BEGIN PUBLIC KEY-----\
                MF0wDQYJKoZIhvcNAQEBBQADTAAwSQJCAMHthV1uM617J/yms07iMcsa4CvSnvyJ\
                Y3YP+67AIJ6kx3UAD6nrkM9lRW/sp3/quaxmc7V+jLtJho3Q98yi+osDAgMBAAE=\
                -----END PUBLIC KEY-----',
                CID : 'string 2',
                authorSign : 'Example Author Sign 2',
                authorManifestSign : 'Example author manifest sign 2'
            },
            
        ];

        for (let i = 0; i < updates.length; i++) {
            updates[i].docType = 'update';
            await ctx.stub.putState(updates[i].authorPublicKey, Buffer.from(stringify(updates[i])));
            console.info('Added <--> ', updates[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    //needs to use comoposite key or somehow fasten queries, but after around 10h trying i 
    //can not seem to make them work. When composite key is used, the record is not stored.
    async createUpdate(ctx, updateRegister, dat) {
        try {
            console.info('============= START : Create Update ===========');
            const updateObject = JSON.parse(updateRegister)
            //Verify public key;
            console.info('============= Verifiying register Key =============');
            const authorAsBytes = await ctx.stub.getState(updateObject.authorKey); // get the author from chaincode state
            if (!authorAsBytes || authorAsBytes.length === 0) {
                throw new Error('ERR_KEY_NOT_VALID');
            }
            console.info ('Author: ' + authorAsBytes)
            console.info('============== Verifying Update ================')
            const verifiable = verifyUpdate(updateObject, JSON.parse(authorAsBytes).publicKey)
            console.info('================ Storing update ================');
            //create update in chain
            const updateInChain = {
                authorPublicKey : JSON.parse(authorAsBytes).publicKey,
                CID : "YetToStore",
                manifest : updateObject.manifest,
                authorSign : updateObject.authorSign,
                authorManifestSign : updateObject.authorManifestSign,
                docType : 'update'
            };
            console.info("dat: " + dat.toString())
            //Verify update does not exist already, whether by creation date(may be different) 
            //or by update data.
            const exists = await this.AssetExists(ctx, 'update'+dat.toString());
            const up = await this.queryUpdateByPublicKeyVersionIDClassID(ctx, 
                JSON.parse(authorAsBytes).publicKey.toString(), updateInChain.manifest.versionID, 
                updateInChain.manifest.classID);
            if (exists) {
                throw new Error('Please Try Again after a few seconds'); 
                //Two updates somehow got asked to be registered at the exact same moment. 
                //Update key composition/ improvement will solve this.
            }if (up) {
                throw new Error('ERR_UPDATE_ALREADY_EXISTS');
            }

            const compoKey = await ctx.stub.createCompositeKey('versionid~classid',
            [updateInChain.manifest.versionID.toString(),updateInChain.manifest.classID.toString()]); //JSON.parse(authorAsBytes).publicKey.toString(),
            await ctx.stub.putState('update'+dat.toString(), Buffer.from(stringify(updateInChain)));
            console.info(compoKey.toString() + stringify(updateInChain));
            console.info('================== Store Update Ended ===============');
            return ('Succesfull registration');
            
        } catch (err) {
            throw err;
        }
    }

    
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    async updateCID(ctx, authorKey, versionID, classID, CID){
        console.info('============= Verifiying register Key =============');
        const authorAsBytes = await ctx.stub.getState(authorKey); // get the author from chaincode state
        if (!authorAsBytes || authorAsBytes.length === 0) {
            throw new Error('ERR_KEY_NOT_VALID');
        }
        //get the updateInChain to add CID to.
        console.info('=============== searching for updateInChain =================');
        const update = await this.queryUpdateByPublicKeyVersionIDClassID(ctx, JSON.parse(authorAsBytes).publicKey.toString(),versionID, classID);
        if (!update){
            throw new Error('ERR_UPDATE_NON_EXISTENT');
        }
        console.info(stringify(update));
        console.info('==================== Storing CID ==========================');
        update.Record.CID = CID;
        const keyer = update.Key.toString();
        const recorder = stringify(update.Record);
        await ctx.stub.putState(keyer, Buffer.from(recorder));
        return 'Success';
        }catch (err){
            console.info(err);
        }
    
    async queryUpdateByPublicKeyVersionIDClassID (ctx, publicKey, versionID, classID){
        const startKey = 'update000000000';
        const endKey = 'update999999999';
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.info(err);
                record = strValue;
            }
            //console.info("record: " + record)
            if (record.authorPublicKey.toString().valueOf() == publicKey && 
                record.manifest.versionID.toString().valueOf() == versionID &&
                record.manifest.classID.toString().valueOf() == classID){
                
                return { Key: key, Record: record };
            }
        }
        return false;
    } catch (err){
        console.info(err);
        return
    }

    async queryAllUpdates(ctx) {
        try {
            const startKey = 'update000000000';
            const endKey = 'update999999999';
            const allResults = [];
            for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
                const strValue = Buffer.from(value).toString('utf8');
                let record;
                try {
                    record = JSON.parse(strValue);
                } catch (err) {
                    console.info(err);
                    record = strValue;
                }
                //console.info("record: " + record)
                allResults.push({ Key: key, Record: record });
            }
        console.info(allResults);
        return JSON.stringify(allResults);
        }catch (err){
            console.info(err);
            return
        }
    }
}

module.exports = RegisterUpdate;
