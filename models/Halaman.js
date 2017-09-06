var mongoose = require(mongoose);

var HalamanSchema = new mongoose.Schema({
  namahalaman  : String,
  titlehalaman : String,
  isi          : String,
  keyword      : String

});

module.exports = mongoose.model('Halaman', HalamanSchema );
