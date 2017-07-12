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





// common functions ===============
var POST_FUNC = function(REQ, RES, INSTANCE) {
    (async () => {
        try {
            var params = REQ.body;
            if (params instanceof Array) {
                var result = [];
                for (var i in params) {
                    var param = params[i];
                    delete param['uid']
                    row = await INSTANCE.create(param);
                    result.push(row.get({plain: true}));
                }
                RES.json({ status: -1, message: "create okay!", result: result });   
            } else {
                delete params['uid']
                row = await INSTANCE.create(params);
                RES.json({ status: -1, message: "create okay!", result: row.get({plain: true}) });   
            }
        } catch(err) {
            console.log(err);
            RES.status(500).send('Something Error: ' + err);
        }
    })();
};

var GET_FUNC = function(REQ, RES, INSTANCE) {
    (async () => {
        try {
            var params = REQ.query;
            var rows = await INSTANCE.findAll({
                order: [['uid', 'DESC']],
                limit: params.limit,
                offset: params.start
            });    
            var result = [];
            for (var i = 0; i < rows.length; i++) {
                result.push(rows[i].get({plain: true}))
            }            
            RES.json({ status: -1, message: 'read okay!', result: result });                       
        } catch(err) {
            console.log(err);
            RES.status(500).send("{ message: \"" + err + "\"}");
        }
    })();
};

var PUT_FUNC = function(REQ, RES, INSTANCE) {
    (async () => {
        try {
            var params = REQ.body;
            var row = await INSTANCE.findOne({where: {uid: params.uid}});
            row = await row.update(params);
            RES.json({ status: -1, message: "update okay!", result: row.get({plain: true}) });   
        } catch(err) {
            console.log(err);
            RES.status(500).send('Something Error: ' + err);
        }
    })();
};

var DELETE_FUNC = function(REQ, RES, INSTANCE) {
    (async () => {
        try {
            var params = REQ.body;
            var row = await INSTANCE.findOne({where: {uid: params.uid}});
            row.destroy({ force: true })
            RES.json({ status: -1, message: "delete okay!" });   
        } catch(err) {
            console.log(err);
            RES.status(500).send('Something Error: ' + err);
        }
    })();
};
// ================================




// exports variables
var exports = module.exports = {};
exports.router = router;
exports.sequelize = sequelize;
exports.POST_FUNC = POST_FUNC;
exports.GET_FUNC = GET_FUNC;
exports.PUT_FUNC = PUT_FUNC;
exports.DELETE_FUNC = DELETE_FUNC;

// table and api
require("./index");