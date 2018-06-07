const express = require('express');
const path = require('path');
const cors= require('cors');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const users = require('./routes/users');
const comments = require('./routes/comments');
const screenshots = require('./routes/screenshots');
const responses = require ('./routes/responses');
const convertsRouter  = require('./routes/convert');

const app = express();
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/component', express.static('../../webcomponent'));
app.use('/download', express.static('public'));
app.use('/', index);
app.use('/users', users);
app.use('/comments', comments);
app.use('/convert', convertsRouter);
app.use('/screenshots', screenshots);
app.use('/responses', responses);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res) {
// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
