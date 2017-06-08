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
    tanggal : Date
    
  }],
  order : [{
  alamat : String

  }]

});

module.exports = mongoose.model('Kontak', KontakSchema);
