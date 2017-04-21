var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SessionSchema   = new Schema({
    sid: String,
    user: String,
    url: String,
    valid: { type: Boolean, default: true},
    ts: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Session', SessionSchema);
