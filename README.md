# Anotifygent
Anotifygent , a Restful notifying(sms/email/more) agent server using communication-platforms/SMTP/more as backend(such as [alidayu](https://www.alidayu.com)), aims to integrate 'notifying' services, and reduce the degree of coupling between apps/webUI and those platforms by providing a **simple** and **app-careless** [API](./docs/api/api.md), so that you just need to suit the layer we defined even if the intefaces of those platforms changed, see below and edit <a href="#config.example.json">config.example.json</a> to get started ...

<h2>API</h2>
see [here](./docs/api/api.md) to check APIs.

## First of all
see the [agents](./docs/config/agents.md) we support and launch your communication platform, such as [alidayu](https://www.alidayu.com).

## Config
edit <a href="#config.example.json">config.example.json</a> and copy as config.json to take effect.  

### Terms

<h3 id = "config.example.json">config.example.json</h3>
```javascript
{
    "notify_auth": {
        // see sign details
        "access_key": "xxxx",
        "access_secret": "xxxx"
    },
    "sms": {
        "venders": [{
            "id": 1,
            "belongTo": "",
            "agent": "alidayu",
            "appkey": "",
            "appsecret": "",
            "url": "",
            "options":""
        }],
        "templates": [{
            "id": 1,
            "vender_id": 1,
            "sms_type": "",
            "sms_free_sign_name": "",
            "sms_template_code": "",
            "sms_param": "",
            "extend": "",
            "options":""
        }],
        // will be obsolate soon
        "mailer":{
            "service": "QQ",
            "from":"AIHome Sms Server <xxxx@qq.com>",
            "user": "xxxx@qq.com",
            "password": "your password"
        },
        "alarm": {
            "emails": [
                "xxxx@qq.com"
            ]
        }
    },
    "email": {

    }
}

```

## Run
- **install dependencies**  
`npm install`  
- **start server**  
`sudo npm start`

## Docker
- **daocloud repository**  
[click here](https://hub.daocloud.io/repos/da8d743c-ff63-4be2-b60d-22cdc18d510c)
- **docker-compose.yml**
```yaml
anotifygent:
  image: daocloud.io/patientayo/anotifygent:v1.0.2
  environment:
    - 'CONFIG=./conf/config.json'  #internal environment
  volumes:
    - './conf:/usr/src/app/conf'  #put your config.json into [current directory]/conf/
  ports:
    - '127.0.0.1:<your host port>:80'
  restart: always
```
- **start container**  
`docker-compose up`

## License
MIT
