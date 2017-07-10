var Sequelize = require('sequelize')
var api = require('./api');

var sequelize = api.sequelize;
var router = api.router;
var POST_FUNC = api.POST_FUNC;
var GET_FUNC = api.GET_FUNC;
var PUT_FUNC = api.PUT_FUNC;
var DELETE_FUNC = api.DELETE_FUNC;

var table = sequelize.define('partner', {
    uid: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true}, 
    location: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    name: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    telephone: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    weixin: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    company: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    address: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    remark: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
});

table.sync({force: true}).then(function() {
    // if (isCreateTestData) {
    //     // nothing
    // }
});

// API
router.route(["/partner", '/partner/*'])
    .post(function(req, res) { POST_FUNC(req, res, table); })
    .get(function(req, res) { GET_FUNC(req, res, table); })
    .put(function(req, res) { PUT_FUNC(req, res, table); })
    .delete(function(req, res) { DELETE_FUNC(req, res, table); }); 


var exports = module.exports = {};
exports.table = table;