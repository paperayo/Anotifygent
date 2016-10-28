var express = require('express');
var notify_auth = require('../lib/notify/notify_auth');
var sms_auth = require('../lib/sms/sms_auth');
var agentlist = require('../agents').smslist;
var appConfig = require('../config');
var router = express.Router();

router.post('/send', function(req, res, next) {
	notify_auth.validateSign(req, function(validate_err, template_id, params, mobile) {
		if (validate_err) {

			return res.status(200).json({
				"err_code": 1,
				"err_message": validate_err["message"]
			});
		} else {
			sms_auth.validateReqParamsFormat(template_id, params, mobile, function(format_err) {
				if (format_err) {
					return res.status(200).json({
						"err_code": 2,
						"err_message": format_err["message"]
					});
				} else {
					sms_auth.getSmsConfig(template_id, function(config_err, agent, agent_auth, agent_params) {
						if (config_err) {
		
							return res.status(200).json({
								"err_code": 3,
								"err_message": config_err["message"]
							});
						} else {
							var agent_client = agentlist[agent];
							if (!agent_client) {
		
								return res.status(200).json({
									"err_code": 100,
									"err_message": "agent not supported."
								});
							}
							// screen out the template param from req params which will be sent to agent server
							var tobeuesed_template_params = {};
							var required_template_paramlist = agent_params["sms_param"].split(',');
							for (var r_index in required_template_paramlist) {
								var tag = 0;
								for (var p_key in params) {
									if (p_key === required_template_paramlist[r_index]) {
										tobeuesed_template_params[p_key] = params[p_key];
										tag = 1;
										break;
									}
								}
								if (!tag) {
		
									return res.status(200).json({
										"err_code": 3,
										"err_message": "params doesn't match, needs:" + agent_params["sms_param"] + "."
									});
								}
							}
		
							agent_params["sms_param"] = tobeuesed_template_params;
							agent_params["rec_num"] = mobile[0];
		
							agent_client.sendSms(agent_auth, agent_params, function(send_err, response) {
								if (send_err) {
									// see error hander in method 'sendSms'
		
									return res.status(200).json(send_err);
		
								} else {
		
									res.status(200).json({
										"err_code": 0,
										"err_message": "Successfully sent.",
										"data": {
											"template_id": template_id,
											"params": params,
											"mobile": mobile
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

module.exports = router;