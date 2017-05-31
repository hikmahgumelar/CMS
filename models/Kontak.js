var mongoose = require('mongoose');

var kontakSchema = new mongoose.model({
    telponrumah : String,
    telpongsm   : String,
    email       : String,
    bbm         : String,
    wa          : String


});

module.exports = mongoose.model('Kontak', kontakSchema);
