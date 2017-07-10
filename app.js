var express = require('express')
var app = express()

// app.get('/', function (req, res) { res.send('Hello World!') });

// CROS setting
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

// serve all asset files from necessary directories
app.use("/archive", express.static(__dirname + "/Lemon/archive"));
app.use("/classic", express.static(__dirname + "/Lemon/classic"));
app.use("/resources", express.static(__dirname + "/Lemon/resources"));

app.get('/cache.appcache', function(req, res) { res.sendFile("cache.appcache", { root: __dirname + "/Lemon" }); });
app.get('/classic.json', function(req, res) { res.sendFile("classic.json", { root: __dirname + "/Lemon" }); });
app.get('/classic.jsonp', function(req, res) { res.sendFile("classic.jsonp", { root: __dirname + "/Lemon" }); });



// API endpoints
// app.all('/api/customer', function(req, res) {
//   console.log('custom');
//   res.send('Hello World!')
// });


// add by 0_o =======================================================================
// 這個要寫在前面, 才能掛上 router, 加上這個才能取得, post 的參數
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '16mb'})); // for parsing application/json
app.use(bodyParser.urlencoded({ limit: '16mb', extended: false })); // for parsing application/x-www-form-urlencoded

var api = require('./api/api');
app.use('/api', api.router);
// ===================================================================================


// 所有的訪問, 跑到 index.html 那邊去
app.all("/*", function(req, res, next) { res.sendFile("index.html", { root: __dirname + "/Lemon" }); });


// dev mode port 5000
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
