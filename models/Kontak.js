var mongoose = require('mongoose');

var KontakSchema = new mongoose.Schema({
  info :[{ 
  telponrumah : String,
    telpongsm   : String,
    email       : String,
    bbm         : String,
    wa          : String
  }],
  about : [{
    judul :String,
    isi : String,
    gambar : String,
    tanggal : Date
    
  }],
  order : [{
  judul : String,
  alamat : String,
  tanggal : Date

  }]

});

module.exports = mongoose.model('Kontak', KontakSchema);
