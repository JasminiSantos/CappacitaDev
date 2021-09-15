const knex = require('knex');

const databaseConfig = require('./knexFile');

const databaseConnection = knex(databaseConfig);

module.exports = {databaseConnection}