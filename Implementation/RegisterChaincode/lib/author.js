'use strict';

const verifySign = require('./verify-author-sign');
// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
//const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class RegisterAuthor extends Contract {
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const authors = [
            {
                registerKey : 'Example Register Key',
                publicKey : 'Example Public Key'
            },
            {
                registerKey : 'Example',
                publicKey : '-----BEGIN PUBLIC KEY-----\
                MF0wDQYJKoZIhvcNAQEBBQADTAAwSQJCAMHthV1uM617J/yms07iMcsa4CvSnvyJ\
                Y3YP+67AIJ6kx3UAD6nrkM9lRW/sp3/quaxmc7V+jLtJho3Q98yi+osDAgMBAAE=\
                -----END PUBLIC KEY-----'
            },
            
        ];

        for (let i = 0; i < authors.length; i++) {
            authors[i].docType = 'author';
            await ctx.stub.putState(authors[i].registerKey, Buffer.from(stringify({ publicKey: authors[i].publicKey})));
            console.info('Added <--> ', authors[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryAuthor(ctx, registerKey) {
        const authorAsBytes = await ctx.stub.getState(registerKey); // get the author from chaincode state
        if (!authorAsBytes || authorAsBytes.length === 0) {
            throw new Error(`${registerKey} does not exist`);
        }
        console.log(authorAsBytes.toString());
        return authorAsBytes.toString();
    }

    async createAuthor(ctx, message, signedMessage, publicKey) {
        try {
            console.info('============= START : Create Author ===========');
            //Verify public key;
            console.info('============= Verifiying public Key =============');
            const verifiable = verifySign(message,signedMessage,publicKey);
            if (verifiable){
                //create author register key
                console.info('============= Creating Register Key ===========');
                const registerKey = 'REGISTERKEY FOR '+publicKey; //Temp, must search for a better method.
                //verify if registerKey already exists
                console.info('============= verifying register key ===========');
                const exists = await this.AssetExists(ctx, registerKey);
                if (exists) {
                    throw new Error('ERR_KEY_NOT_REGISTABLE');
                }
                //Store keyPair.
                console.info('============= Storying keypair ===========');
                await ctx.stub.putState(registerKey.toString(), Buffer.from(JSON.stringify({publicKey : publicKey})));
                console.info('============= END : Create Author ===========');
                return registerKey;
            } else {
                throw new Error('ERR_KEY_NOT_VERIFIABLE');
            }
        } catch (err) {
            //should handle error
            throw err;
        }
        
    }

    async GetAllAuthors(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }
}

module.exports = RegisterAuthor;
