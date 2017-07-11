var express = require('express')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var cors = require('cors')


var app = express();

// CORS settings
app.use(cors({
  origin: 'http://localhost:1841',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
// app.options('*', cors()); // include before other routes

// session timeout
app.use(cookieParser());
app.use(session({
  secret: '02474394-78e2-493b-9861-491e178f2e32',
  resave: false,
  saveUninitialized: true,
  httpOnly: false,
  name: 'sid',
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}))


// app.get('/', function (req, res) { res.send('Hello World!') });


// serve all asset files from necessary directories
app.use("/archive", express.static(__dirname + "/Lemon/archive"));
app.use("/classic", express.static(__dirname + "/Lemon/classic"));
app.use("/resources", express.static(__dirname + "/Lemon/resources"));

app.get('/cache.appcache', function(req, res) { res.sendFile("cache.appcache", { root: __dirname + "/Lemon" }); });
app.get('/classic.json', function(req, res) { res.sendFile("classic.json", { root: __dirname + "/Lemon" }); });
app.get('/classic.jsonp', function(req, res) { res.sendFile("classic.jsonp", { root: __dirname + "/Lemon" }); });
app.get('/favicon.ico', function(req, res) { res.sendFile("favicon.ico", { root: __dirname + "/Lemon/resources" }); });



// TODO: for test session...
app.get('/test', function(req, res) {
  if (req.session.cnt === undefined) {
    req.session.cnt = 0;
  }
  req.session.cnt = req.session.cnt + 1;
  res.json({ status: -1, message: req.session.cnt });   
});


// signin function
app.post('/api/signin', function (req, res) { 
  (async () => {
    try {
      var params = req.query;
      // TODO: finish it
      if (params.user == 'wxy') {
        req.session.user = 'wxy';
      }
      res.json({ status: -1, message: "signin okay!" });   
    } catch(err) {
      console.log(err);
      res.status(500).send('{ message: "Something Error!" }');
    }
  })();  
});

// isSignin Page
app.get("/api/isSignin", function(req, res) { 
  if (req.session.user === undefined) {
    res.json({ status: 0, message: "i am not signined!", result: 'no' });   
  } else {
    res.json({ status: 1, message: "i am signined!", result: 'yes' });   
  }
});


// TODO: catch erroe status code
app.all('/*', function(req, res, next) {
  if (req.session.user === undefined) {
    res.status(401).send('{ message: "Unauthorized" }');
    return;
  }
  next();
});



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
