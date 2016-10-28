// will be obsolated soon
var nodemailer = require('nodemailer');

var appConfig = require('../../config');

var sendAlarm = function(mail_data, callback){
	appConfig.getSmsMailInfo(function(err, mailer, alarm) {
		var data = {
			"from": mailer["from"],
			"to": alarm["emails"],
			"subject": mail_data["subject"],
			"text": JSON.stringify(mail_data["text"])
		}
	
		nodemailer.createTransport({
			"service": mailer["service"],
			"auth": {
				"user": mailer["user"],
				"pass": mailer["password"]
			}
		}).sendMail(data, callback);
	});
};

module.exports.sendAlarm = sendAlarm;