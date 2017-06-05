var express = require('express')
    , app = express()
    , session = require('express-session')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , path = require('path')
    , favicon = require('serve-favicon')
    , logger = require('morgan')
    , passport = require('./config/passport.js')
    , mongo = require('./config/mongo.js')
    , multer = require('multer');

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'rahasia',
    cookie: { maxAge: 60000000, secure: false },
    resave: true,
    saveUninitialized: false
}));
// setup untuk gambar

// Mongo setup
mongo.init();

// Passport setup
passport.init(app);
//setup passport ejs if login
app.use(function (req, res, next){
res.locals.login = req.isAuthenticated();
next();
});
//kontak.init(app);
// Set up routing
var routes = require('./routes/routes')
, register = require('./routes/admin/register');
  /*  , product = require('./routes/product')
    , admin = require('./routes/admin/admin')

    , login = require('./routes/admin/login')
    , logout = require('./routes/admin/logout');
*/
// Routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


app.use('/', routes);


//app.use('/admin', admin);
//app.use('/register', register);
//app.use('/login', login);
//app.use('/logout', logout);

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
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
};
