var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize')
var opts = {
    define: {
        freezeTableName: true // prevent sequelize from pluralizing table names
    }
}
var DATABASE_URL = process.env.DATABASE_URL ? process.env.DATABASE_URL : 'postgres://postgres:s863421@127.0.0.1:5432/lemon';
var sequelize = new Sequelize(DATABASE_URL, opts);

// exports variables
var exports = module.exports = {};
exports.router = router;
exports.sequelize = sequelize;

// table and api
require("./index");