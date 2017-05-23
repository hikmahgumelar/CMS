var express = require('express')
, router = express.Router();



/**
 * GET: Redirect Homepage to login page.
 * */
router.get('/',function (req, res, next){
    res.render('index.ejs',
    {
        user: req.user
    });
});

console.log('index loaded');

module.exports = router;
