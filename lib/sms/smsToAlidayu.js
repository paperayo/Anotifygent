var path = require('path');
var jsonfile = require('jsonfile');

var appConfig = require('../../config');
var util = require('./sms_util');

// convert params to alidayu_params
var validateAndConvert_params =  function(sms_params, application, callback) {
	var validate_err = {};
	app = appConfig[application];

	var tobesigned = {};
	for (var smsparam_arg in sms_params) {
		tobesigned[smsparam_arg] = sms_params[smsparam_arg];
	}
	delete tobesigned["sign"];

	// validate the sign
	var digest_sms = util.sign(tobesigned, app["notify_auth"]["notify_secret"]);
	if (digest_sms !== sms_params["sign"]) {
		validate_err.err_code = 2;
		validate_err.err_message = digest_sms + "The digest doesn't match.";

		return callback(validate_err, null);
	}

	// validate the scenario
	if (!app["sms"]["scenarios"][sms_params["scenario"]]) {
		var scenarios = Object.keys(app["sms"]["scenarios"]).toString();
		validate_err.err_code = 5;
		validate_err.err_message = "No scenario match, please use the following scenarios: " + scenarios;

		return callback(validate_err, null);
	}

	// validate the params relating to scenario
	if (Object.keys(app["sms"]["scenarios"][sms_params["scenario"]]["sms_param"]).length && !sms_params["params"]) {
		validate_err.err_code = 6;
		validate_err.err_message = "no params found, scenario '" + sms_params["scenario"] +
			"' needs the params including: " + Object.keys(app["sms"]["scenarios"][sms_params["scenario"]]["sms_param"]).toString();

		return callback(validate_err, null);
	}
	for (var param in app["sms"]["scenarios"][sms_params["scenario"]]["sms_param"]) {
		if (!sms_params["params"][param] || typeof sms_params["params"][param] !== "string") {
			validate_err.err_code = 6;
			validate_err.err_message = "params don'match, scenario '" + smsparams["scenario"] +
				"' needs the params including: " + Object.keys(app["sms"]["scenarios"][sms_params["scenario"]]["sms_param"]).toString();

			return callback(validate_err, null);
		}
	}
	
	// convert sms_params to alidayu_params
	var alidayu_params = {};

	for (var scenario_arg in app["sms"]["scenarios"][sms_params["scenario"]]) {
		alidayu_params[scenario_arg] = app["sms"]["scenarios"][sms_params["scenario"]][scenario_arg];
	}
	alidayu_params["rec_num"] = sms_params["rec_num"];
	for (var param_arg in sms_params["params"]) {
		alidayu_params["sms_param"][param_arg] = sms_params["params"][param_arg];
	}

	return callback(null, alidayu_params);
}

exports.validateAndConvert_params = validateAndConvert_params;