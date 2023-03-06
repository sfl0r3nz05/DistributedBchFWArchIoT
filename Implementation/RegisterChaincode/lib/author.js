'use strict';

const verifySign = require('./services/verify-author-sign');
const stringify  = require('json-stringify-deterministic');
const { Contract } = require('fabric-contract-api');
const createRegisterKey = require('./services/create-register-key');

//creates example author assets. Intended for testing only.
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
            await ctx.stub.putState('Author'+i, Buffer.from(stringify(authors[i])));
            console.info('Added <--> ', authors[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    //Searches the world state for an asset with the given registerKey.
    async queryAuthor(ctx, registerKey) {
        const authorAsBytes = await ctx.stub.getState(registerKey); // get the author from chaincode state
        if (!authorAsBytes || authorAsBytes.length === 0) {
            throw new Error(`${registerKey} does not exist`);
        }
        console.log(authorAsBytes.toString());
        return authorAsBytes.toString();
    }

    async queryAuthorByRegisterKey(ctx, registerKey) {
        try {
        const startKey = 'Author00000000';
        const endKey = 'Author99999999';
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.info(err);
                record = strValue;
            }
            if (record.docType.toString().valueOf() == 'author' &&
                record.registerKey.toString().valueOf() == registerKey.toString().valueOf()){
                return {key,record};
            }
            
        }
        return null;
        }catch (err){
            console.info(err);
        }
    }

    //Register an author. If the author already exists, overwrites the registerKey.
    async createAuthor(ctx, message, signedMessage, publicKey, date) {
        try {
            console.info('============= START : Create Author ===========');
            //Verify public key;
            console.info('============= Verifiying public Key =============');
            const verifiable = verifySign(message,signedMessage,publicKey);
            if (!verifiable){
                throw new Error('ERR_KEY_NOT_VERIFIABLE');
            }
            //create author register key
            console.info('============= Creating Register Key ===========');
            const registerKey = createRegisterKey(publicKey); 
            
            //Store keyPair.
            const author = {
                docType : 'author',
                publicKey : publicKey,
                registerKey: registerKey
            }
            console.info('============= Storying keypair ===========');
            await ctx.stub.putState('Author'+date.toString(), Buffer.from(JSON.stringify(author)));
            console.info('============= END : Create Author ===========');
            return registerKey;
        } catch (err) {
            throw err;
        }
    }

    async queryAllAuthors(ctx) {
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
            if (record.docType.toString().valueOf() == 'author'){
                allResults.push({ Key: key, Record: record });
            }
            console.info("record: " + record)
        }
        console.info(allResults);
        return JSON.stringify(allResults);
        }catch (err){
            console.info(err);
        }
    }

    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }
}

module.exports = RegisterAuthor;
