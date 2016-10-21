var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// import the router
var routes = require('./routes');

var app = express();

// add this domain for req and res to catch uncaught exception.
app.use(function(req, res, next) {
	var domain = require('domain').create();
	domain.on('error', function(err) {
		console.log('DOMAIN ERROR caught\n', err.stack);
		try{
			setTimeout(function(){
				console.log('Failsafe shutdown.');
				process.exit(1);
			}, 5000);

			var worker = require('cluster').worker;

			if (worker) {
				worker.disconnect();
			}

			server.close();
			
			try{
				next(err);
			} catch (err) {
				console.error('Express error mechanism failed.\n', err.stack);
				res.statusCode = 500;
				res.setHeader('content-type', 'application/json');
				res.end({
					"err_code": 100,
					"err_message": "sms server error."
				});
			}
		} catch (err) {
			console.log('Unable to send 500 response.\n', err.stack);
		}
	});

	domain.add(req);
	domain.add(res);
	domain.run(next);
	
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.disable('x-powered-by');

// add the sms router
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500).json({
			message: err.message,
			error: err
		})
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500).json({
		"err_code": 100,
		"err_message": "sms server error."
	})
});


module.exports = app;