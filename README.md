# Anotifygent
Anotifygent , a Restful notifying(sms/email/more) agent server using communication-platforms/SMTP/more as backend(such as [alidayu](https://www.alidayu.com)), aims to integrate 'notifying' services, and reduce the degree of coupling between apps/webUI and those platforms by providing a **simple** and **app-careless** [API](./docs/api/api.md), so that you just need to suit the layer we defined even if the intefaces of those platforms changed, see below and edit <a href="#config.example.json">config.example.json</a> to get started ...

<h2>API</h2>
see [here](./docs/api/api.md) to check APIs.

## First of all
see the [agents](./docs/config/agents.md) we support and launch your communication platform, such as [alidayu](https://www.alidayu.com).

## Config
edit <a href="#config.example.json">config.example.json</a> and copy as config.json to take effect.  

### Terms
- **notify_auth**  
`notify_auth` includes a `notify_key` which identifies your application and the other `notify_secret` whick 'md5ify' the content you post, `notify_secret` need to be saved both server and your apps.
- **agent agent_auth**  
`agent` is a communication platform with its configuration `agent_auth`, click [agents](./docs/config/agents.md) to check more integrated platforms.
- **scenarios**  
we provide the no-omitted and optional items according to the agent you choose, you can define you own scenarios such as 'register' by editing them, click [agents](./docs/config/agents.md) to learn more.
- **mailer**  
`mailer` use [nodemailer](https://github.com/nodemailer/nodemailer) to send email notifications to `emails` in `alarm`, see config.example.json below.
- **alarm**  
emails in `emails` list will be notified when agents go wrong.
- **sign**  
`sign` must be added into the params in every request, see [sign details](./docs/api/sign.md).

<h3 id = "config.example.json">config.example.json</h3>
```javascript
{
    "your app name": {
        // see sign details
        "notify_auth": {
            "notify_key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "notify_secret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        },
        "sms": {
            "agent": "alidayu",
            "agent_auth": {
                "appkey": "xxxxxxxx",
                "appsecret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "url": "https://eco.taobao.com/router/rest"
            },
            "scenarios": {
                "register": {
                    "sms_type": "normal",
                    "sms_free_sign_name": "xxxx",
                    "sms_param": {"verification_code": ""},
                    "sms_template_code": "xxxxxxxx"
                },
                "retrievepwd": {
                    "sms_type": "normal",
                    "sms_free_sign_name": "",
                    "sms_param": {},
                    "sms_template_code": ""
                }
            },
            "mailer":{
                "service": "QQ",
                "from":"Anotifygent Server <xxxxxxxxx@qq.com>",
                "user": "xxxxxxxxx@qq.com",
                "password": "your password"
            },
            "alarm": {
                "emails": [
                    "xxxxxxxxx@qq.com"
                ]
            }
        },
        "email": {

        }
    },
    "another app": {
        
    }
}
```

## Run
- **install dependencies**  
`npm install`  
- **start server**  
`sudo npm start`

## Docker


## License
MIT
