// import the ApiClient of alidayu server
var ApiClient = require('../../lib/vendors/alidayu').ApiClient;

var appConfig = require('../../config');

// add mailer for informing admin when alidayu requests goes wrong
var mailer = require('../../lib/sms/sms_mailer');


var getClient = function(agent_auth) {
	return new ApiClient(agent_auth);
};

var sendSms = function(agent_auth, agent_params, callback) {
	agent_params["sms_param"] = JSON.stringify(agent_params["sms_param"]);

	var client = new ApiClient(agent_auth);

	client.execute('alibaba.aliqin.fc.sms.num.send', agent_params, function(error, response) {
		var send_err = {};

		// normal response
		if (!error) {
			if (response["result"]["success"]) {
				console.log(response);

				return callback(null, response["result"]);

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

			} else if (/^(isp)\..*/.test(error["sub_code"]) || error["name"] === "NetWork-Error") {
				console.log(response);
				send_err.err_code = 102;
				if (error["sub_code"] === "isp.null-pointer-exception" ||
					error["sub_code"] === "isp.top-parse-error" ||
					error["sub_code"] === "isp.top-mapping-parse-error") {
					send_err.err_code = 100;
				}
				send_err.err_message = "sms server error.";

				return callback(send_err);
				
			} else {
				console.log(error);
				// inform admin the error message
				// will be obsolate soon
				var mail_data = {
					"subject": "!!! SMS Server Error",
					"text": JSON.stringify(error)
				};
				mailer.sendAlarm(mail_data, function(mail_err, info){
					if (mail_err) {
						console.log(mail_err);
					} else {
						console.log("Message sent: " + info.response);
					}
				});
				send_err.err_code = 100;
				send_err.err_message = "sms server error.";

				return callback(send_err);
			}	
		}
	});
};

module.exports.sendSms = sendSms;