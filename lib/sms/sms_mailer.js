var nodemailer = require('nodemailer');

var appConfig = require('../../config');

var sendAlarm = function(application, mail_data, callback){
	var data = {
		"from": appConfig[application]["mailer"]["from"],
		"to": appConfig[application]["alarm"]["emails"],
		"subject": mail_data["subject"],
		"text": JSON.stringify(mail_data["text"])
	}

	nodemailer.createTransport({
		"service": appConfig[application]["mailer"]["service"],
		"auth": {
			"user": appConfig[application]["mailer"]["user"],
			"pass": appConfig[application]["mailer"]["password"]
		}
	}).sendMail(data, callback);
};

module.exports.sendAlarm = sendAlarm;