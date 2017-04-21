module.exports = {
    message : function (message, code) {
        var ret = {
            message: message,
            data: null,
            code: code
        };
        return ret;
    },
    data : function (data) {
        var ret = { 
            message: null,
            data: data,
            code: 200
        };
        return ret;
    },
    error : function (message) {
        var ret = { 
            message: message,
            data: null,
            code: 400
        };
        return ret;
    },
    success : function (message) {
        var ret = { 
            message: message,
            data: null,
            code: 200
        };
        return ret;
    }
};
