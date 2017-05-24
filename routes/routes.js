var express = require('express')
, router = express.Router()
, passport = require('passport')
, auth = require('../libs/auth');

router.get('/',function (req, res){
    res.render('template/index.ejs');
/*    {
        user: req.user
    });
*/
});

/**
 * GET login
  */
router.get('/admin', function(req, res, next) {
    res.render('admin/admin.ejs');
});
/**
 * GET login
  */
router.get('/login', function(req, res, next) {
    res.render('admin/login.ejs');
});

/**
 * POST login
 */
router.post('/login', function(req, res, next) {
    passport.authenticate('local-login', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash : true
    })(req, res, next)
});

/*
logout
*/
router.get('/logout',
    function(req, res, next){
        req.logout();
        res.redirect('/');
});


console.log('semua module terload');

module.exports = router;
