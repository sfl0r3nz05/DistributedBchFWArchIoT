'use strict';

const verifySign = require('./verify-author-sign');
// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
//const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class RegisterUpdate extends Contract {
    async initLedger(ctx) {
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

    
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }
}

module.exports = RegisterUpdate;
