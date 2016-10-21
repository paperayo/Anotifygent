var express = require('express');
var router = express.Router();

router.use('/sms', require('./sms'));

module.exports = router;