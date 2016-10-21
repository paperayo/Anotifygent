#Agents
`agent` is a communication platform with its configuration `agent_auth`, see supporting agent list as follows, click **agent** to jump to related platform, click **agent_configuration** to goto related configuration and check params for your own scenarios.

### Agent list
agent                              |  agent_configuration
-----------------------------------|-------------------------------------------
[alidayu](https://www.alidayu.com) | <a href="#alidayu">alidayu configuration</a>

### Agent configuration

<h4 id = "alidayu">alidayu</h4>

- auth  
```json
{
    "appkey": "xxxxxxxx",
    "appsecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "url": "https://eco.taobao.com/router/rest"
}
```

<h4 id = "scenario">scenario</h4>

- no-omitted params

key                | value
-------------------|---------------------
sms_type           | "normal"
sms_free_sign_name | "sms_free_sign_name"
sms_param          | {}
sms_template_code  | "sms_template_code"

> if you want to send a verification code, please apply for a sms template in alidayu which includes $(verification_code) and put it in sms_param, we will assign it a six random digits and pass to you, or we will treat it as a notification type.

- optional params



