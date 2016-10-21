// import the ApiClient of alidayu server
var ApiClient = require('../../lib/vendors/alidayu').ApiClient;

// smsToAlidayu is used to (validate)convert the received
// parameters to the parameters of alidayu.
var smsToAlidayu = require('../../lib/sms/smsToAlidayu');

var appConfig = require('../../config');

// add mailer for informing admin when alidayu requests goes wrong
var mailer = require('../../lib/sms/sms_mailer');

var sendsms = function(sms_params, application, callback) {
	var send_err = {};

	smsToAlidayu.validateAndConvert_params(sms_params, application, function(validate_err, alidayu_params) {

		if (validate_err) {

			return callback(validate_err, null);

		} else {

			// alidayu need a sms_param of string
			alidayu_params["sms_param"] = JSON.stringify(alidayu_params["sms_param"]);

			var client = new ApiClient(appConfig[application]["sms"]["agent_auth"]);
			
			client.execute('alibaba.aliqin.fc.sms.num.send', alidayu_params, function(error, response) {
				// normal response
				if (!error) {
					if (response["result"]["success"]) {
						console.log(response);

						return callback(null);

					} else {
						console.log(response);
						send_err.err_code = 100;
						send_err.err_message = "sms server error.";

						return callback(send_err);
					}
				// abnormal response
				} else {
					if (error["sub_code"] === "isv.BUSINESS_LIMIT_CONTROL") {
						console.log(error);
						send_err.err_code = 101;
						send_err.err_message = "sending sms too frequently, verification type allowed 1 sms/m , 7 sms/h, notification type allowed 50 sms/d";

						return callback(send_err);

					} else {
						console.log(error);
						// inform admin the error message
						if (!appConfig[application]["sms"]["alarm"]["emails"].length) {
							var mail_data = {
								"subject": "!!! SMS Server Error",
								"text": JSON.stringify(error)
							};
							mailer.sendAlarm(application, mail_data, function(mail_err, info){
								if (mail_err) {
									console.log(mail_err);
								} else {
									console.log("Message sent: " + info.response);
								}
							});
						}
						send_err.err_code = 100;
						send_err.err_message = "sms server error.";

						return callback(send_err);
					}	
				}
			});
		}
	});
};

module.exports.sendsms =sendsms;