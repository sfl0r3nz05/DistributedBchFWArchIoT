'use strict';

const RegisterAuthor = require('./lib/author');
const RegisterUpdate = require('./lib/update');
const RetrieveUpdate = require('./lib/retrieve-update');

module.exports.RegisterAuthor = RegisterAuthor;
module.exports.RegisterUpdate = RegisterUpdate;
module.exports.RetrieveUpdate = RetrieveUpdate;
module.exports.contracts = [ RegisterAuthor,RegisterUpdate, RetrieveUpdate ];