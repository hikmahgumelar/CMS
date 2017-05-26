var express = require('express')
, router = express.Router()
, passport = require('passport')
, auth = require('../libs/auth')
, fs = require('fs')
, multer = require('multer')
//, upload = multer({dest : './uploads/' + 'file.fieldname'+'.png'})
, Product = require('../models/Product');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage }).single('gambar');

router.get('/',function (req, res){
  Product.find(function(err, products) {
   if (err)
     console.log('ada error');
    res.render('template/index.ejs',{data : products});
/*    {
        user: req.user
*/
    });

});
router.get('/register',function (req, res){
    res.render('admin/register.ejs');
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

router.post('/register',
    function(req, res, next) {
        passport.authenticate('local-register', {
            successRedirect: '/',
            failureRedirect: '/register',
            failureFlash : true,
            badRequestMessage: 'All fields are required.'
        })(req, res, next);
    });

//ambil halaman product
router.get('/tambahdata',auth.IsAuthenticated,function(req,res,next){
  Product.find(function(err, products) {
   if (err)
     console.log('ada error');
res.render('admin/tambahproduct.ejs',{ data: products });
 });

});


//tambah product
router.post('/tambah', function(req,res,next){
//upload file
  upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }

  var newProduct = new Product({
      name: req.body.name,
      harga: req.body.harga,
      deskripsi: req.body.deskripsi,
      detail: req.body.detail,
      tanggal: Date.now(),
      gambar: req.file.originalname

  });

newProduct.save(function (err){
  if (err) {
    console.log("tidak dapat di simpan");
  }else{
   console.log('product berhasil di tambah');
   res.redirect('/tambahdata');
}
});
});
});
/*
//hapus product
router.get('/hapus/:id',auth.IsAuthenticated, function(req,res,next){
Product.remove(function(err){
  if (err) throw err;
  console.log("data berhasil di hapus");
  res.redirect('/tambahdata');
});
});

router.delete('/tambah/:id', function(req, res) {
  Product.removeById({_id :req.params.id}, function (err, result) {
    if (!err) {
              return res.json(result);
          } else {
              console.log(err);
              return res.send(err); // 500 error
          }});
});

*/

//remove data by id
router.get('/:id', function(req, res){
Product.findByIdAndRemove(req.params.id,function(err, posts){
	res.redirect('/tambahdata');
	});
});

console.log('semua module terload');

module.exports = router;
