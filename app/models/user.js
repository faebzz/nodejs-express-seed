var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    pwd: String,
    email: {type: String, unique : true, required : true },
    ts: {type: Date, default: Date.now()},
    active: { type: Boolean, default: true},
    account_type: { type: String, default: "free"}
});
module.exports = mongoose.model('User', UserSchema);
