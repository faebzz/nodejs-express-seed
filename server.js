// call the packages we need
const express    = require('express');        // call express
const app        = express();                 // define our app using express
const bodyParser = require('body-parser');
const md5 = require('md5');
const multer  =   require('multer');
const logger = require('./app/helper/log.js')
const mongoose   = require('mongoose');
const fs = require('fs');
const configMain = JSON.parse(fs.readFileSync('./app/config/config.json', 'utf8'));
const config = JSON.parse(fs.readFileSync('./app/config/' + configMain.environment + '.json', 'utf8'));


// DB Connect
logger.info('User: ' + config.db.user + ' Password: ' + config.db.pass);
mongoose.connect(config.db.url, {user: config.db.user, pass: config.db.pass});
//routes
var auth = require('./app/routes/auth');



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
var port = config.api.port || process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(router);
app.use(config.api.base, auth);

// START THE SERVER
// =============================================================================
app.listen(port);
logger.info('Magic happens on port ' + port);
