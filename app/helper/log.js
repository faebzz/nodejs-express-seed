var winston = require('winston');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./app/config/config.json', 'utf8'));
var dateFormat = require('dateformat');
var now = new Date();
var logfile = "log/wlog_" + dateFormat(now, "yyyymmdd") + ".log";
var wlog = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: logfile})
    ]
});
module.exports = {
    info : function (strLog) {
        if(config.logLevel > 2){
            wlog.info(strLog);
        }
    },
    warn : function (strLog) {
        if(config.logLevel > 1){
            wlog.warn(strLog);
        }
    },
    error : function (strLog) {
        if(config.logLevel > 0){
            wlog.error(strLog);
        }
    }
};