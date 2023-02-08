'use strict';

const RegisterAuthor = require('./lib/author');
const RegisterUpdate = require('./lib/update');

module.exports.RegisterAuthor = RegisterAuthor,RegisterUpdate;
module.exports.contracts = [ RegisterAuthor,RegisterUpdate ];