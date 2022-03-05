'use strict';

// Getting both the contract to export
const UserContract =  require('./contract.js').UserContract;
const RegistrarContract = require('./contract.js').RegistrarContract;

module.export.contrats = [UserContract,RegistrarContract];