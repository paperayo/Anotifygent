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

var sign = function (params, sms_secret) {
    var sorted = Object.keys(params).sort();
    var basestring = sms_secret;
    for (var i = 0, l = sorted.length; i < l; i++) {
        var k = sorted[i];
        basestring += k + params[k];
    }
    basestring += sms_secret;
    return md5(basestring).toUpperCase();
}

var get6randcode = function(){
    var Num=""; 
    for(var i=0;i<6;i++) { 
        Num+=Math.floor(Math.random()*10); 
    }
    return Num; 
}

module.exports.sign = sign;
module.exports.get6randcode = get6randcode;