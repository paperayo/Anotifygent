var crypto = require('crypto');
var stream = require('stream');

var hash = function (method, s, format) {
    var sum = crypto.createHash(method);
    var isBuffer = Buffer.isBuffer(s);
    if (!isBuffer && typeof s === 'object') {
        s = JSON.stringify(sortObject(s));
    }
    sum.update(s, isBuffer ? 'binary' : 'utf8');

    return sum.digest(format || 'hex');
};


var md5 = function (s, format) {

    return hash('md5', s, format);
};

var notifySign = function (content, access_secret) {
    var sorted = Object.keys(content).sort();
    var basestring = "";
    for (var i = 0, l = sorted.length; i < l; i++) {
        var k = sorted[i];
        basestring += k + content[k];
    }
    basestring += access_secret;

    return md5(basestring);
}

module.exports.notifySign = notifySign;