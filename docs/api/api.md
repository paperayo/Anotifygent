# API
## About
- API follows the RESTful convension.
- API use the data format of json.

## API list
- send sms  
  
req method | req url
-----------|----------
post       | /sms/send 

**req json**
```javascript
{
    // type: string
    "notify_key": "your notify_key",
    // send to this phone number, type: string
    "rec_num": "13000000000",
    // scenario defined in config.example.json, type: string
    "scenario": "scenario",
    // the param you comfirm in the template
    "params": {
            "key1": "value1",
            "key2": "value2"
            // ...
        },
    // to prevent malicious modification, every api need to carry a sign, see details in 'terms', type: string
    "sign": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```
**res json**
```javascript
{
    // error code, 0 means sending successfully
    // see "err_code explanation" to learn err_code more
    "err_code": 0,
    // error tips
    "err_message": "error message"
}
```
**err_code explanation**

err_code           | explanation
-------------------|----------------------------------------------------------
0                  | sent sms Successfully
1                  | Wrong number of parameters
2                  | No sign found or matched
3                  | No sms_key found or matched or it's not a string
4                  | No phone used to receive sms found or legal or it's not a string
5                  | No scenario found or matched or it's not a string.
6                  | params don't match the relating scenario
100                | Sms server error
101                | sending sms verification_code too frequently, allowed 1 sms/m 7 sms/h, or sending sms notification too frequently, allowed 50 sms/d