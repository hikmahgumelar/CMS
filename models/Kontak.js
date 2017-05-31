var mongoose = require('mongoose');

var KontakSchema = new mongoose.Schema({
    telponrumah : String,
    telpongsm   : String,
    email       : String,
    bbm         : String,
    wa          : String


});

module.exports = mongoose.model('Kontak', KontakSchema);
