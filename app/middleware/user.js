const logger = require('../helper/log.js');
const response = require('../helper/response');
const User     = require('../models/user');
const md5     = require('md5');

module.exports = {
    add : function(data, callback) {
        var user = new User();
        user.pwd = md5(data.pwd);
        user.email = data.email;
        user.save(data, function(err){
            if(err){
                callback(response.error(err));
            }else{
                callback(response.success("User added!"));
            }
        })
    },
    findAll : function(callback) {
        User.find({}, function(err, dat){
            if(err){
                callback(response.error(err));
            }else{
                callback(response.data(dat));
            }          
        });
    }
}