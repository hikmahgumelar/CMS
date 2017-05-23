var express = require('express')
, router = express.Router()
, passport = require('passport');

/**
 * GET login
  */
router.get('/', function(req, res, next) {
    res.render('admin/login.ejs');
});

/**
 * POST login
 */
router.post('/', function(req, res, next) {
    passport.authenticate('local-login', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash : true
    })(req, res, next)
});


console.log('login loaded');

module.exports = router;
