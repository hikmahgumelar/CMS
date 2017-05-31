var express = require('express')
, router = express.Router()
, passport = require('passport')
, auth = require('../libs/auth')
, fs = require('fs')
, multer = require('multer')
//, upload = multer({dest : './uploads/' + 'file.fieldname'+'.png'})
, Product = require('../models/Product')
, Kontak = require('../models/Kontak');


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
  Product.find(function(err, products){

    if (err)
     console.log('ada error');
    res.render('template/index.ejs',{data : products});

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

//ambil halaman user
router.get('/user',auth.IsAuthenticated,function(req,res,next){
res.render('admin/tambahkontak.ejs',{ data: 'products' });
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


//tampilkan halaman kontak
router.get('/tambahkontak',auth.IsAuthenticated,function(req,res,next){
  Kontak.find(function(err, kontak) {
   if (err)
     console.log('ada error');
res.render('admin/tambahkontak.ejs',{ data: kontak });
});
});

//add kontak
router.post('/kontak', function(req,res,next){
  var newKontak = new Kontak({
      telponrumah: req.body.tlprmh,
      telpongsm: req.body.tlpgsm,
      email: req.body.email,
      bbm: req.body.bbm,
      wa: req.body.wa,

  });

newKontak.save(function (err){
  if (err) {
    console.log("tidak dapat di simpan");
  }else{
   console.log('product berhasil di tambah');
   res.redirect('/tambahkontak');
}
});
});
//remove data by id
router.get('/:id', auth.IsAuthenticated,function(req, res){
Product.findByIdAndRemove(req.params.id,function(err, posts){
	res.redirect('/tambahdata');
	});
});

console.log('semua module terload');

module.exports = router;
