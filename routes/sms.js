var express = require('express');
var sms_auth = require('../lib/sms/sms_auth');
var agentlist = require('../agents').smslist;
var appConfig = require('../config');
var router = express.Router();

// add cors suport
router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	next();
});

router.post('/send', function(req, res, next) {
	var sms_params = req.body;

	sms_auth(sms_params, function(auth_err, application) {
		if (auth_err) {

			res.status(200).json(auth_err);

		} else {
			// choose agent
			var agent = agentlist[appConfig[application]["sms"]["agent"]];
			if (!agent) {
				var agent_error = {"err_code": 100, "err_message": "agent " + agent + " not supported, please contact sms_manager to check the agent item of " + 
					application + " in config.js."};

				 return res.status(200).json(agent_error);

			} else {
				agent.sendsms(sms_params, application,
					function(err) {	
						if (err) {

							res.status(200).json(err);
							
						} else {

							res.status(200).json({"err_code": 0, "err_message": "Successfully sent."});
							
						}
				});
			} 
		}
	});
});

module.exports = router;