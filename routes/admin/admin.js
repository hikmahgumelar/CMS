var express = require('express')
, router = express.Router()
, passport = require('passport');

/**
 * GET login
  */
router.get('/admin', function(req, res, next) {
    res.render('admin.ejs');
});

/**
 * POST login
 */

console.log('admin loaded');

module.exports = router;
