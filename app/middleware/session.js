const logger = require('../helper/log.js');
const response = require('../helper/response');
const Site     = require('../models/site');
const Session = require('../models/session');
const md5 = require('md5');

function dropExistingSessions(uid, callback){
    Session.remove({"user" : uid}, function(err){
        if(err){
            callback(response.error(err));
        }else{
            callback(response.success("Sessions removed"));
        }
    });
}

module.exports = {
    registerSession : function(data, callback) {
        Site.find({ "email" : data.email, "pwd" : md5(data.pwd), "url" : data.url }, function(err, docs){
            if(err){
                callback(response.error(err))
            }else{
                var dat = docs[0];
                if(docs.length){
                    dropExistingSessions(dat._id, function(ret){
                        if(ret.code == 200){
                            var curdat = Date.now();
                            var sid = md5(curdat + dat._id);
                            var session = new Session();
                            session.sid = sid;
                            session.user = dat._id;
                            session.url = data.url;
                            var retval = {
                                "email" : dat.email,
                                "_id" : dat._id,
                                "url" : dat.url,
                                "sid" : sid
                            }
                            session.save(function(err){
                                if(err){
                                    callback(response.error(err));
                                }else{

                                    callback(response.data(retval));
                                }
                            });
                        }else{
                            callback(ret);
                        }
                    });
                }else{
                    callback(response.error("login failed!"));
                }
            }
        })
    },
    findAll : function(callback) {
        Site.find({}, function(err, dat){
            if(err){
                callback(response.error(err));
            }else{
                callback(response.data(dat));
            }
        });
    },
    dropSession : function(sid, callback){
        Session.remove({ "sid" : sid}, function(err){
            if(err){
                callback(response.error(err));
            }else{
                callback(response.success("Logout successful"));
            }
        });
    },
    validateSession : function(sid, callback) {
        Session.find({"sid" : sid}, function(err, docs){
            if(docs.length){
                callback(docs[0]);
            }else {
                callback(false);
            }
        });
    }
};
