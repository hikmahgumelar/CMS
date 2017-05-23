var express = require('express')
, router = express.Router()
, passport = require('passport')
, auth = require('../libs/auth');

router.get('/',function (req, res){
    res.render('index.ejs');
/*    {
        user: req.user
    });
*/
});

/**
 * GET login
  */
router.get('/admin',auth.IsAuthenticated, function(req, res, next) {
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



console.log('index loaded');

module.exports = router;
