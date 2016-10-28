var appConfig = require('../../config');

var extractConfig = function(vender, template, callback) {
	var agent = vender["agent"];
	var agent_auth = {
		"appkey": vender["appkey"],
		"appsecret": vender["appsecret"],
		"url": vender["url"]
	}
	var agent_params = {
		"sms_type": template["sms_type"],
		"sms_free_sign_name": template["sms_free_sign_name"],
		"sms_template_code": template["sms_template_code"],
		"sms_param": template["sms_param"],
		"extend": template["extend"],
	}
	return callback(agent, agent_auth, agent_params);
}

var validateReqParamsFormat = function(template_id, params, mobile, callback) {
	if (!template_id || !params || !mobile) {

		return callback(new Error("template_id, params, mobile needed!"));
	}
	if (!typeof template_id === "number" || !mobile instanceof Array || mobile.length === 0 || !params instanceof Object) {

		return callback(new Error("template_id must be a number, mobile must be an array, params must be a JSON object or string."));

	}
	for (var pkey_index in Object.keys(params)) {
		if (typeof params[Object.keys(params)[pkey_index]] !== "string") {

			return callback(new Error("value of params must be only string"))
		}
	}
	for (var m_index in mobile) {
		if (!(/^1[3|4|5|7|8]\d{9}$/).test(mobile[m_index])) {

			return callback(new Error("invalid format of the phone number."));
		}
	}
	callback(null);
}

var getSmsConfig = function(template_id, callback) {
	appConfig.getSmsTemplate(template_id, function(err, template) {
		if (err) {
			return callback(err);
		} else {
			var vender_id = template["vender_id"];
			appConfig.getSmsVender(vender_id, function(err, vender) {
				if (err) {
					return callback(err);
				} else {
					extractConfig(vender, template, function(agent, agent_auth, agent_params) {
						return callback(null, agent, agent_auth, agent_params);
					});
				}
			});
		}
	});
};

module.exports.extractConfig = extractConfig;
module.exports.validateReqParamsFormat = validateReqParamsFormat;
module.exports.getSmsConfig = getSmsConfig;