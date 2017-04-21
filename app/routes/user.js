// on routes that end in /bears
// ----------------------------------------------------
const logger = require('../helper/log.js');
const User     = require('../middleware/user');
const express = require('express');
module.exports = (function() {
    'use strict';
    var users = express.Router();
    users
        .post('/user', function(req, res) {
            User.add(req.body, function(ret){
                res.json(ret);
            });
        })
        .get('/user', function(req, res) {
            User.findAll(function(ret){
                res.json(ret);
            });
        })
    ;
    
    return users;
})();