var express = require('express')
var app = express()

// app.get('/', function (req, res) { res.send('Hello World!') });

// serve all asset files from necessary directories
app.use("/archive", express.static(__dirname + "/Lemon/archive"));
app.use("/classic", express.static(__dirname + "/Lemon/classic"));
app.use("/resources", express.static(__dirname + "/Lemon/resources"));

app.get('/cache.appcache', function(req, res) { res.sendFile("cache.appcache", { root: __dirname + "/Lemon" }); });
app.get('/classic.json', function(req, res) { res.sendFile("classic.json", { root: __dirname + "/Lemon" }); });
app.get('/classic.jsonp', function(req, res) { res.sendFile("classic.jsonp", { root: __dirname + "/Lemon" }); });


// any API endpoints
// app.post('/api/v1/auth/login', routes.auth.login);


// serve index.html for all remaining routes, in order to leave routing up to angular
app.all("/*", function(req, res, next) { res.sendFile("index.html", { root: __dirname + "/Lemon" }); });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})