var appConfig = require('../../config');
var notifyUtils = require('./utils');

var validateSign = function(req, callback) {
	var unverified_sign;
	var content = {};
	
	for (var query_key in req.query) {
		if (query_key.toLowerCase() === "signature") {
			unverified_sign = req.query[query_key];
		} else {
			content[query_key] = req.query[query_key];
		}
	}

	if (!unverified_sign || !content["access_key"] || !content["ts"]) {

		return callback(new Error("access_key, signature, ts needed in query params!"));
	}
	var access_secret = appConfig.getAccessSecret(content["access_key"], function(err) {
		if (err) {

			return callback(err);
		}
	});
	if (+content["ts"] >= Date.now() / 1000 || +content["ts"] <= Date.now() / 1000 - 900) {

		return callback(new Error("ts must be before current time and the interval can't be more than 15 minutes."));
	}
	for (var body_key in req.body) {
			content[body_key] = req.body[body_key];
	}

	var template_id = content["template_id"];
	var params;
	if (content["params"]) {
		params = Object.assign({}, content["params"]);
	}
	var mobile = content["mobile"];

	for (var c_key in content) {
		if (typeof content[c_key] === "object") {
			delete content[c_key];
		}
	}

	if (notifyUtils.notifySign(content, access_secret).toUpperCase() !== unverified_sign.toUpperCase()) {

		return callback(new Error("the signature doesn't match."));
	}

	callback(null, template_id, params, mobile);
}

module.exports.validateSign = validateSign;