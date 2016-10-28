# API
## About
- API follows the RESTful convension.
- API use the data format of json.

## API list
- send sms  
  
req method | req url
-----------|----------
post       | /sms/send 

**req query parameters**
```javascript
{
    "access_key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "ts": "1477641008",
    // to prevent malicious modification, every api need to carry a signature, type: string
    "signature": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```
**req body json**
```javascript
{
    // type: number
    "template_id": your template_id,

    // the params suit the template, value type: string
    "params": {
        "key1": "value1",
        "key2": "value2"
        // ...
    },
    // send to this mobile, type: array of string or number
    // for alidayu vender, wo now only support one mobile at every time
    "mobile": [
        "13000000000"
    ]
}
```
**res json**
```javascript
{
    // error code, 0 means sending successfully
    // see "err_code explanation" to learn err_code more
    "err_code": 0,
    // error tips
    "err_message": "error message",
    "data":{
        "template_id": your template_id,
        "params": {
            "key1": "value1",
            "key2": "value2"
            // ...
        },
        "mobile": [
            "13000000000"
        ]
    }
}
```
**err_code explanation**

err_code           | explanation
-------------------|----------------------------------------------------------
0                  | sent sms Successfully
1                  | signature, ts, accesskey not found or signature doesn't match
2                  | invalid format of req body intems
3                  | get template error
100                | Sms server error
101                | sending sms verification_code too frequently, allowed 1 sms/m 7 sms/h, or sending sms notification too frequently, allowed 50 sms/d