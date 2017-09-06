var express = require('express')
, router = express.Router()
, passport = require('passport');

/**
 *  GET: register
 * */
router.get('/',
    function(req, res, next) {
        res.render('admin/register.ejs');
    });

/**
 * POST: register
 */



console.log('register loaded');

module.exports = router;
