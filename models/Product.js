var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var ProductSchema = new mongoose.Schema({
    name: String,
    gambar : String,
    harga: Number,
    status: String,
    detail: String,
    tanggal: Date

});
ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Product', ProductSchema);
