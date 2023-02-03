'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
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
                registerKey : '',
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

    async createAuthor(ctx, registerKey, publickey) {
        console.info('============= START : Create Author ===========');

        await ctx.stub.putState(registerKey, Buffer.from(JSON.stringify({publicKey : publickey})));
        console.info('============= END : Create Author ===========');
    }
}

module.exports = RegisterAuthor;
