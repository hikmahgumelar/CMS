var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: String,
    harga: Number,
    deskripsi: String,
    detail: String,
    tanggal: Date
});

module.exports = mongoose.model('Product', ProductSchema);
