var nodemailer = require('nodemailer');

var appConfig = require('../../config');

var sendAlarm = function(application, mail_data, callback){
	var app = appConfig[application];
	var data = {
		"from": app["sms"]["mailer"]["from"],
		"to": app["sms"]["alarm"]["emails"],
		"subject": mail_data["subject"],
		"text": JSON.stringify(mail_data["text"])
	}

	nodemailer.createTransport({
		"service": app["sms"]["mailer"]["service"],
		"auth": {
			"user": app["sms"]["mailer"]["user"],
			"pass": app["sms"]["mailer"]["password"]
		}
	}).sendMail(data, callback);
};

module.exports.sendAlarm = sendAlarm;