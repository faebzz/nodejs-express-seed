// on routes that end in /bears
// ----------------------------------------------------
const logger = require('../helper/log.js');
const Session     = require('../middleware/session');
const express = require('express');
module.exports = (function() {
    'use strict';
    var sessions = express.Router();
    sessions
        .post('/auth/login', function(req, res) {
            Session.registerSession(req.body, function(ret){
                res.json(ret);
            })
        })
        .get('/auth/logout', function(req, res) {
            Session.dropSession(req.query.sid, function(ret){
                res.json(ret);
            })
        })
    ;

    return sessions;
})();
