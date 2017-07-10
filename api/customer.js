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
router.route("/customer")
    .get(function(req, res) {
        (async () => {
            try {
                var params = req.query;
                // { _dc: '1499604759397', page: '1', start: '0', limit: '25' },
                var rows = await Customer.findAll({
                    order: [['uid', 'DESC']],
                    limit: params.limit,
                    offset: params.start
                });    
                var result = [];
                for (var i = 0; i < rows.length; i++) {
                    result.push(rows[i].get({plain: true}))
                }            
                res.json({ status: -1, message: 'Success', result: result });                       
            } catch(err) {
                console.log(err);
            }
        })();
    })
    .post(function(req, res) {
        (async () => {
            try {
                var params = req.body;
                console.log(req);
                /*
                var json = JSON.parse(params.data);
                console.log(params);
                console.log(params.data);
                console.log(json);
                */
                res.json({ status: -1, message: "i use post" });   
            } catch(err) {
                console.log(err);
            }
        })();

    }); 


var exports = module.exports = {};
exports.table = Customer;