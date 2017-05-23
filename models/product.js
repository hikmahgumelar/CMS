var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: String,
    harga: String,
    deskripsi: String,
    detail: String
});

module.exports = mongoose.model('Product', ProductSchema);
