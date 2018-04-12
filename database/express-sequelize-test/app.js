var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
var index = require('./routes/index');
var users = require('./routes/users');
var comments = require('./routes/comments');
const convertsRouter  = require('./routes/convert');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
const bp=bodyParser.json();
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/comments', comments);
app.post('/convert', bp,(req, res) => {

    /*const browser = await puppeteer.launch({
        headless:false
    });
    const page = await browser.newPage();
    await page.goto(req.body.url,{waitUntil : "networkidle2"});
    await page.screenshot({path: 'public/'+req.body.name, fullPage:true});
    await browser.close();*/
    console.log(req);
puppeteer.launch({
    headless: false
}).then((browser) => {
    //console.log(browser);
    browser.newPage()
        .then(page => page.goto(req.body.url, {waitUntil: "networkidle2"})
            .then(resp => page.screenshot({path: 'public/' + req.body.name, fullPage: true})
                .then(buffer => {
                    browser.close();
                    //convert.use(express.static('public'));
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    //res.send('http://localhost:3000/' + req.body.name)
                    res.status(200).send("xdxd");
                })))
}, (err) => {
    console.error(err);
    res.status(500);
});




});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err);
});

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
});

module.exports = app;
