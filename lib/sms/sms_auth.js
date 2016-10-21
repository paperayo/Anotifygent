var appConfig = require('../../config');

var auth = function(sms_params, callback) {

	/* initial validation */

	var auth_err = {};

	// validate the type and format of parameters
	if(!sms_params["notify_key"] || typeof sms_params["notify_key"] !== "string") {
		auth_err.err_code = 3; 
		auth_err.err_message = "No notify_key found or it's not a string.";

		return callback(auth_err, null);
	}
	if(!sms_params["rec_num"] || typeof sms_params["rec_num"] !== "string"){
		auth_err.err_code = 4;
		auth_err.err_message = "No phone used to receive sms found or it's not a string.";

		return callback(auth_err, null);
		
	} else if(!(/^1[3|4|5|7|8]\d{9}$/.test(sms_params["rec_num"]))){
		auth_err.err_code = 4;
		auth_err.err_message = "invalid format of the phone number";

		return callback(auth_err, null);
	}
	if(!sms_params["scenario"] || typeof sms_params["scenario"] !== "string"){
		auth_err.err_code = 5;
		auth_err.err_message = "No scenario found or it's not a string.";

		return callback(auth_err, null);
	}
	if(!sms_params["sign"]) {
		auth_err.err_code = 2;
		auth_err.err_message = "No sign found.";

		return callback(auth_err, null);
	}

	for (var application in appConfig) {
		// validate the sms_key
		if(sms_params["notify_key"] === appConfig[application]["notify_auth"]["notify_key"]){

			return callback(null, application);
		};
	}

	// application not found
	auth_err.err_code = 3;
	auth_err.err_message = "sms_key doesn't match.";

	return callback(auth_err, null);
}

module.exports = auth;