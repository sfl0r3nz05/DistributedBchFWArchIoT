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

    async createUpdate(ctx, updateRegister) {
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
                throw new Error(`${updateObject.authorKey} does not exist`);
            }
            console.info ('Author: ' + authorAsBytes)
            console.info('============== Verifying Update ================')
            const verifiable = verifyUpdate(updateObject, JSON.parse(authorAsBytes).publicKey)
            console.info('================ Storing update ================');
            //create compositeKey
            const compoKey = await ctx.stub.createCompositeKey('key~manifestid',[JSON.parse(authorAsBytes).publicKey,updateObject.manifest.manifestID]);
            //create update in chain
            const updateInChain = {
                authorPublicKey : JSON.parse(authorAsBytes).publicKey,
                CID : "YetToStore",
                manifest : updateObject.manifest,
                authorSign : updateObject.authorSign,
                authorManifestSign : updateObject.authorManifestSign
            };
            await ctx.stub.putState(compoKey, Buffer.from(JSON.stringify(updateInChain)));
            console.info('================== Store Update Ended ===============');
            console.info({compoKey,updateInChain});
            return ('Succesfull registration');
            
        } catch (err) {
            throw err;
        }
    }

    
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }
}

module.exports = RegisterUpdate;
