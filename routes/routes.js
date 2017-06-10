var express = require('express')
, router = express.Router()
, passport = require('passport')
, auth = require('../libs/auth')
, fs = require('fs')
, multer = require('multer')
, Product = require('../models/Product')
, Kontak = require('../models/Kontak')
, User = require('../models/User')
, paginate = require('express-paginate');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage }).single('gambar');
//index page
router.get('/',function (req, res){
Kontak.find(function(err, kontaks){
//Product.find({}).sort('-tanggal').limit(8).exec(function(err, products){

var number = req.param('page');
Product.paginate({}, { page: number, limit:8 }, function(err, results, pageCount, itemCount){
    if (err)
     console.log('ada error');
 
    console.log(results.pages);
    //console.log(results);
    res.render('template/index.ejs',{data : results, nomor : kontaks, pageCount : pageCount, itemCount : itemCount });
});
});
});
//about page
router.get('/about', function(req, res){
Kontak.find(function(err, kontaks) {
if (err)
  console.log('ada errot');
res.render('template/about.ejs', { data: kontaks, nomor: kontaks});

});
});

//daftar user
router.get('/register',function (req, res){
    res.render('admin/daftaruser.ejs');
});

router.get('/test', function (req, res){
Product.paginate({}, { page:1, limit:2}, function(err, result, pageCount, itemCount){
  if (err){
    console.log(err);
  } else {

  }
});
});

/**
 * GET login
  */
router.get('/admin',auth.IsAuthenticated,function(req, res, next) {
Product.find({}).sort('-tanggal').limit(8).exec(function(err, products){
Kontak.find(function(err, kontaks) {
  if (err)
console.log('ada error');
  res.render('admin/admin.ejs',{ nomor : kontaks, user : req.user, data : products});
});
});
});

/**
 * GET login
  */
router.get('/login',function(req, res, next) {
Kontak.find(function(err, kontaks) {
   if (err)
     console.log('ada error');
res.render('admin/login.ejs',{ nomor : kontaks });
});
});

//ambil halaman user
//router.get('/user',auth.IsAuthenticated,function(req,res,next){
//Kontak.find(function(err, kontaks) {
//   if (err)
//     console.log('ada error');
//res.render('admin/tambahhalaman.ejs',{ data: 'products', nomor : kontaks , user : req.user});
//});
//});
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
            successRedirect: '/daftaruser',
            failureRedirect: '/daftaruser',
            failureFlash : true,
            badRequestMessage: 'All fields are required.'
        })(req, res, next);
    });
//Daftar User
router.get('/daftaruser',auth.IsAuthenticated, function(req,res){
Kontak.find(function(err, kontaks) {
User.find(function(err, users) {
   if (err)
     console.log('ada error');
res.render('admin/daftarusers.ejs',{ data: users, nomor : kontaks , user : req.user});
});
});
});

//ambil halaman product
router.get('/tambahdata',auth.IsAuthenticated,function(req,res,next){
Product.find(function(err, products){
Kontak.find(function(err, kontaks) {
  if (err)
 console.log('ada error');
res.render('admin/tambahproduct.ejs',{ data: products, nomor : kontaks , user : req.user});
});
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
      status: req.body.status,
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
//edit product
router.get('/:id',auth.IsAuthenticated,function(req, res, next){
Product.findById(req.params.id,function(err, products){
  if(err)
    console.log("error di cari edit ");
  res.render('admin/edit-product.ejs',{ data: products, user: req.user});
});
});
//simpann editan product
router.post('/update/:id',auth.IsAuthenticated,function(req, res){
  upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }

  var newProduct = ({
      name: req.body.name,
      harga: req.body.harga,
      status: req.body.status,
      detail: req.body.detail,
      tanggal: Date.now(),
      gambar: req.file.originalname

  });
Product.findByIdAndUpdate(req.params.id, newProduct, function (err, products){
   res.redirect('/tambahdata');
});
});
});
//tampilkan halaman kontak
router.get('/tambahhalaman',auth.IsAuthenticated,function(req,res,next){
  Kontak.find(function(err, kontak) {
   if (err)
     console.log('ada error');
res.render('admin/tambahhalaman.ejs',{ data: kontak, nomor : kontak , user : req.user});
});
});

//add kontak
router.get('/kontak', function(req,res,next){
  var newKontak = new Kontak();
       newKontak.info  = {
      telponrumah: req.body.tlprmh,
      telpongsm: req.body.tlpgsm,
      email: req.body.email,
      bbm: req.body.bbm,
      wa: req.body.wa,

       };

newKontak.save(function (err){
  if (err) {
    console.log("tidak dapat di simpan");
  }else{
   console.log('product berhasil di tambah');
   res.redirect('/tambahhalaman');
}
});
});

//remove product by id
router.get('/hapus/:id', auth.IsAuthenticated,function(req, res){
Product.findByIdAndRemove(req.params.id,function(err, posts){
	res.redirect('/tambahdata');
	});
});

//remove user by id
router.get('/daftaruser/:id', auth.IsAuthenticated,function(req, res){
User.findByIdAndRemove(req.params.id,function(err, kontaks){
	res.redirect('/daftaruser');
	});
});


console.log('semua module terload');

module.exports = router;
