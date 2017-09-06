var express = require('express')
, router = express.Router()
, passport = require('passport')
, auth = require('../../libs/auth');

/**
 * GET login
  */
router.get('/',auth.IsAuthenticated, function(req, res, next) {
    res.render('admin/admin.ejs');
});

/**
 * POST login
 */

console.log('admin loaded');

module.exports = router;
