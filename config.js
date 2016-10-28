var jsonfile = require('jsonfile');
var path = require('path');

var config = process.env.CONFIG;

if (!config) {
  console.error('please set CONFIG environment.')
  process.exit(1);
}

var appConfig = jsonfile.readFileSync(path.join(__dirname, config));

var getAccessSecret = function(access_key, callback) {
	if (appConfig["notify_auth"]["access_key"] === access_key) {
		return appConfig["notify_auth"]["access_secret"];
	} else {
		return callback(new Error("invalid access_key."));
	}
};

var getSmsVender = function(vender_id, callback) {
	for (var v_index in appConfig["sms"]["venders"]) {
		if (vender_id === appConfig["sms"]["venders"][v_index]["id"]) {
			return callback(null, Object.assign({}, appConfig["sms"]["venders"][v_index]));
		}
	}
	callback(new Error("no vender found"));
};

var getSmsTemplate = function(template_id, callback) {
	for (var t_index in appConfig["sms"]["templates"]) {
		if (template_id === appConfig["sms"]["templates"][t_index]["id"]) {
			return callback(null, Object.assign({}, appConfig["sms"]["templates"][t_index]));
		}
	}
	callback(new Error("no template found"));
};

var getSmsMailInfo = function(callback) {
	return callback(null, Object.assign({}, appConfig["sms"]["mailer"]),
		Object.assign({}, appConfig["sms"]["alarm"]));
}

module.exports.getAccessSecret = getAccessSecret;
module.exports.getSmsVender = getSmsVender;
module.exports.getSmsMailInfo = getSmsMailInfo;
module.exports.getSmsTemplate = getSmsTemplate;