var Sequelize = require('sequelize')
var api = require('./api');

var sequelize = api.sequelize;
var router = api.router;


var Customer = sequelize.define('customer', {
    uid: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true, unique: true}, 
    name: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    telephone: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
    location: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
});

// Customer.sync({force: false}).then(function() {
//     // if (isCreateTestData) {
//     //     // nothing
//     // }
// });

// API
router.route(["/customer", '/customer/*'])
    .post(function(req, res) {
        (async () => {
            try {
                var params = req.body;
                row = await Customer.create(params);
                res.json({ status: -1, message: "create okay!", result: row.get({plain: true}) });   
            } catch(err) {
                console.log(err);
            }
        })();
    })
    .get(function(req, res) {
        (async () => {
            try {
                var params = req.query;
                var rows = await Customer.findAll({
                    order: [['uid', 'DESC']],
                    limit: params.limit,
                    offset: params.start
                });    
                var result = [];
                for (var i = 0; i < rows.length; i++) {
                    result.push(rows[i].get({plain: true}))
                }            
                res.json({ status: -1, message: 'read okay!', result: result });                       
            } catch(err) {
                console.log(err);
            }
        })();
    })
    .put(function(req, res) {
        (async () => {
            try {
                var params = req.body;
                var row = await Customer.findOne({where: {uid: params.uid}});
                row = await row.update(params);
                res.json({ status: -1, message: "update okay!", result: row.get({plain: true}) });   
            } catch(err) {
                console.log(err);
            }
        })();
    })
    .delete(function(req, res) {
        (async () => {
            try {
                var params = req.body;
                var row = await Customer.findOne({where: {uid: params.uid}});
                row.destroy({ force: true })
                res.json({ status: -1, message: "delete okay!" });   
            } catch(err) {
                console.log(err);
            }
        })();
    }); 


var exports = module.exports = {};
exports.table = Customer;