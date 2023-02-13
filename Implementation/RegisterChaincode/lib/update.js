'use strict';

const verifyUpdate = require('./verify-update');
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

    async createUpdate(ctx, updateRegister, dat) {
        try {
            console.info('============= START : Create Update ===========');
            const updateObject = JSON.parse(updateRegister)
            //Verify public key;
            console.info('============= Verifiying register Key =============');
            //console.info('updateRegister: ' + updateRegister)
            //console.info('updateRegister parse: ' + JSON.parse(updateRegister))
            //console.info('updateRegister stringify: ' + JSON.stringify(updateRegister))
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
            console.info("versionID : " + updateInChain.manifest.versionID.toString())
            const compoKey = await ctx.stub.createCompositeKey('date~key~manifestid',[dat.toString(),JSON.parse(authorAsBytes).publicKey.toString(),updateInChain.manifest.versionID.toString()]);
            //const exists = await this.AssetExists(ctx, compoKey);
            //if (exists) {
            //    throw new Error('ERR_KEY_NOT_REGISTABLE');
            //}
            await ctx.stub.putState('UPDATE_'+dat.toString(), Buffer.from(stringify(updateInChain)));
            console.info('================ Storing Composite Key =============')
            await ctx.stub.putState(compoKey, Buffer.from('\u0000'));
            console.info('================== Store Update Ended ===============');
            console.info(compoKey.toString() + "  " + updateInChain);
            return ('Succesfull registration');
            
        } catch (err) {
            throw err;
        }
    }

    
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    async AssetExistsPartialCompositeKey(ctx, indexName, authorKey, versionID) {
        const keys = [authorKey.toString()]//, versionID.toString()];
        console.info('queried: ' + keys.toString())
        const assetJSON = await ctx.stub.getStateByPartialCompositeKey(indexName, keys);
        return assetJSON && assetJSON.length > 0;
    }

    async queryAllUpdates(ctx) {
        try {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.info(err);
                //record = strValue;
            }
            console.info("record: " + record)
            if (record.docType.toString().valueOf() == 'update'){
                allResults.push({ Key: key, Record: record });
            }
            
        }
        console.info(allResults);
        return JSON.stringify(allResults);
        }catch (err){
            console.info(err);
        }
    }
}

module.exports = RegisterUpdate;
